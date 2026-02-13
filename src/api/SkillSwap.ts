// import { ErrorMessages } from '@utils-types';
import { setCookie, getCookie } from '@/shared/lib/utils/cookie';
import { QUERY_ENDPOINTS } from '@/shared/lib/constants/apiQueryEndpoints';
import type {
  TAuthUser,
  TCityResponse,
  TGetAllUsers,
  TRegisterData,
  TRegisterResponse,
  TServerResponse,
  TTokens,
  TUpdateUserResponse,
  TUserResponse } from './types';
import type { TUser } from '@/entities/user';
import { transformKeysToLowercase } from '@/shared/lib/utils/transformApiKeysToLowercase';


const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export class Api {
  constructor(baseUrl: string, apiKey:string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }
  private baseUrl: string;
  private apiKey: string;

  private checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

 // Функция авторизации через refresh токен
  private refreshToken = (): Promise<TAuthUser> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token available'));
    }

    return fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getUserRefresh}`, {
      method: 'POST',
      headers: {
        'apikey': this.apiKey,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
      refresh_token: refreshToken
      })
    })
    .then((res) => {
    return this.checkResponse<TAuthUser>(res);
    })
    .then((refreshData) => {
      // Сохраняем токены!
      localStorage.setItem('refresh_token', refreshData.refresh_token);
      setCookie('access_token', refreshData.access_token);
      return refreshData;  // ВОЗВРАЩАЕМ данные
    })
    .catch((error) => Promise.reject(new Error('Failed to refresh token')));
}

// Отдельный метод для auth/v1/user
  private fetchAuthUser = async (): Promise<TUserResponse> => {

    let accessToken = getCookie('access_token');
    try {
      const res = await fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.authUser}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken || ''}`,
          'apikey': this.apiKey
        }
      });

      if (res.status === 401 || res.status === 403) {
        const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        return Promise.reject(new Error('Ваша сессия истекла'));
      }

    try {
      await this.refreshToken();
      const newAccessToken = getCookie('access_token');

      const retryRes = await fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.authUser}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${newAccessToken}`,
          'apikey': this.apiKey
        }
      });
        return  await this.checkResponse<TUserResponse>(retryRes);
      } catch (error) {
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
    }

    if (res.ok) {
      return await this.checkResponse<TUserResponse>(res);
    } else {
      return Promise.reject(new Error(`HTTP error! status: ${res.status}`));
    }

    } catch (error) {
      return Promise.reject(error);
    }
  }

  private createUserProfile = (data: Omit<TRegisterData, 'password'>, accessToken: string): Promise<{ profile: TUser; message: string }> => {
      const { email, ...dataWithoutEmail } = data;
    const toLowerCase = transformKeysToLowercase(dataWithoutEmail);

    return fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.registerUser}`, {
      method: 'POST',
      headers: {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(toLowerCase)
    })
    .then(res => res.json())
    .then(response => {
      if (response.success && response.data) {
        return {
          profile: response.data,
          message: response.message
        };
      }
      throw new Error(response.message || 'Failed to create profile');
    });
  }

  // Запрос на получение пользователя из auth
  getUserApi = async (): Promise<TServerResponse<TUser>|null> => {

  try {
    const authData = await this.fetchAuthUser();
    const userId = authData.id;
    const response = await fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getUserByAuthId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('access_token')}`,
        'apikey': this.apiKey,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
        auth_id: userId
        })
    });

    const result = await response.json();

    //  Проверяем структуру ответа
    if (!result.success) {
      throw new Error(result.message || 'Пользователь не найден');
    }
      return result.data;
    } catch (error) {
      console.error( error);

      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('сессия истекла') || errorMessage.includes('Session expired')) {
        return null;  // 👈 ТИХО ВОЗВРАЩАЕМ null!
      }

      return Promise.reject(error);
    }
  }

  // Запрос на регистрацию
  registerUserApi = (data: TRegisterData): Promise<TRegisterResponse> => {
    const { email, password, ...profileData } = data;

    return fetch(`${this.baseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': this.apiKey,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(authData => {
      if (!authData.access_token) {
        return {
          success: false,
          error_code: 'user_already_exists',
          message: 'Пользователь с таким email уже зарегистрирован отсюда'
        };
      }

      const tokens: TTokens = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };

      // Автоматически создаём профиль после регистрации
      return this.createUserProfile(
        { email, ...profileData },
        authData.access_token
      )
      .then(({ profile, message }) => ({
        success: true,
        profile,
        message,
        ...tokens
      }))
      .catch(error => ({
        success: false,
        message: error.message
      }));
    });
  }


  // Обновление профиля
  public updateUserProfile = async (profileData: Partial<TUser>): Promise<TUpdateUserResponse> => {
  try {
    // 1️⃣ Получаем актуальные токены и auth данные
    const authData = await this.fetchAuthUser(); // 👈 Твоя функция, обновляет токены при необходимости
    const userId = authData.id; // UUID из auth
    // 2️⃣ Получаем _id пользователя из твоей таблицы
    const userResponse = await fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getUserByAuthId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('access_token')}`,
        'apikey': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ auth_id: userId })
    });

    const userResult = await userResponse.json();

    if (!userResult.success) {
      throw new Error(userResult.message || 'Пользователь не найден');
    }

    // Обновляем профиль
    const response = await fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.updateUserProfile}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('access_token')}`,
        'apikey': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: userResult.data._id, // 👈 _id из твоей таблицы
        ...profileData
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;

  } catch (error) {
    console.error('Ошибка обновления профиля:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('Session expired') || errorMessage.includes('сессия истекла')) {
      return Promise.reject(new Error('Сессия истекла. Пожалуйста, войдите снова'));
    }

    return Promise.reject(error);
  }
};








  // Запрос всех городов
  getCitiesApi = () =>
    fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getAllCities}`,{
      headers: {
        'apikey': this.apiKey,
      }
    })
      .then((res) => this.checkResponse<TCityResponse>(res))
      .then((data) => {
        if (data?.success) return data.data;
        return Promise.reject(data);
      });


  // Запрос всех пользователей
  getAllUsersApi = () =>
    fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getAllUsers}`,{
      headers: {
        'apikey': this.apiKey,
      }
    })
      .then((res) => this.checkResponse<TGetAllUsers>(res))
      .then((data) => {
        if (data?.success) return data.data;
        return Promise.reject(data);
      });


  // Запрос на пользователя по id
  getUserById = (data:TUser) =>
    fetch(`${this.baseUrl}/${QUERY_ENDPOINTS.getUserById}`,{
      method: 'POST',
      headers: {
        'apikey': this.apiKey,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id: data._id })
    })
      .then((res) => this.checkResponse<TGetAllUsers>(res))
      .then((data) => {
        if (data?.success) return data.data;
        return Promise.reject(data);
      });



}




export const api = new Api(URL,APIKEY);










//   getIngredientsApi = () =>
//     fetch(`${this.baseUrl}/ingredients`)
//       .then((res) => this.checkResponse<TIngredientsResponse>(res))
//       .then((data) => {
//         if (data?.success) return data.data;
//         return Promise.reject(data);
//       });

//   getFeedsApi = () =>
//     fetch(`${this.baseUrl}/orders/all`)
//       .then((res) => this.checkResponse<TFeedsResponse>(res))
//       .then((data) => {
//         if (data?.success) return data;
//         return Promise.reject(data);
//       });

//   getOrdersApi = () =>
//     this.fetchWithRefresh<TFeedsResponse>(`${this.baseUrl}/orders`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         authorization: getCookie('accessToken')
//       } as HeadersInit
//     }).then((data) => {
//       if (data?.success) return data.orders;
//       return Promise.reject(data);
//     });

//   orderBurgerApi = (data: string[]) =>
//     this.fetchWithRefresh<TNewOrderResponse>(`${this.baseUrl}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         authorization: getCookie('accessToken')
//       } as HeadersInit,
//       body: JSON.stringify({
//         ingredients: data
//       })
//     }).then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });

//   getOrderByNumberApi = (number: number) =>
//     fetch(`${this.baseUrl}/orders/${number}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then((res) => this.checkResponse<TOrderResponse>(res));

//   registerUserApi = (data: TRegisterData) =>
//     fetch(`${this.baseUrl}/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(data)
//     })
//       .then((res) => this.checkResponse<TAuthResponse>(res))
//       .then((data) => {
//         if (data?.success) return data;
//         return Promise.reject(data);
//       });

//   loginUserApi = (data: TLoginData) =>
//     fetch(`${this.baseUrl}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(data)
//     })
//       .then((res) => this.checkResponse<TAuthResponse>(res))
//       .then((data) => {
//         if (data?.success) return data;
//         return Promise.reject(data);
//       });

//   forgotPasswordApi = (data: { email: string }) =>
//     fetch(`${this.baseUrl}/password-reset`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(data)
//     })
//       .then((res) => this.checkResponse<TServerResponse<{}>>(res))
//       .then((data) => {
//         if (data?.success) return data;
//         return Promise.reject(data);
//       });

//   resetPasswordApi = (data: { password: string; token: string }) =>
//     fetch(`${this.baseUrl}/password-reset/reset`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(data)
//     })
//       .then((res) => this.checkResponse<TServerResponse<{}>>(res))
//       .then((data) => {
//         if (data?.success) return data;
//         return Promise.reject(data);
//       });

//   getUserApi = () =>
//     this.fetchWithRefresh<TUserResponse>(`${this.baseUrl}/auth/user`, {
//       headers: {
//         authorization: getCookie('accessToken')
//       } as HeadersInit
//     });

//   updateUserApi = (user: Partial<TRegisterData>) =>
//     this.fetchWithRefresh<TUserResponse>(`${this.baseUrl}/auth/user`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         authorization: getCookie('accessToken')
//       } as HeadersInit,
//       body: JSON.stringify(user)
//     });

//   logoutApi = () =>
//     fetch(`${this.baseUrl}/auth/logout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify({
//         token: localStorage.getItem('refreshToken')
//       })
//     }).then((res) => this.checkResponse<TServerResponse<{}>>(res));
