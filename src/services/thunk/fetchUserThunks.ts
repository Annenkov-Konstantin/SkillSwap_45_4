import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TFavoriteData, TLoginCredentials, TRegisterData, TToggleFavoriteParams } from '@api/types';
import type { TUser } from '@/entities/user';
import { setCookie } from '@/shared/lib/utils/cookie';

/**
 * Логин пользователя
 */
export const fetchLoginApi = createAppAsyncThunk<
  TUser,
  TLoginCredentials
>(
  `${SLICE_NAMES.USER}/fetchLoginApi`,
  async (credentials, { extra: api }) => {
    const result = await api.loginApi(credentials);
    localStorage.setItem('refresh_token', result.tokens.refresh_token);
    setCookie('access_token', result.tokens.access_token, {
      expires: 7 * 24 * 60 * 60 // на неделю
    });
    return result.user;
  }
);

/**
 * Регистрация пользователя
 */
export const fetchRegisterApi = createAppAsyncThunk<
  TUser ,
  TRegisterData
>(
  `${SLICE_NAMES.USER}/fetchRegisterApi`,
  async (data, { extra: api }) => {
    const result = await api.registerUserApi(data);
    if (!result.success) {
      throw new Error(result.message || 'Registration failed');
    }
    localStorage.setItem('refresh_token', result.refresh_token);
    setCookie('access_token', result.access_token, {
      expires: 7 * 24 * 60 * 60 // на неделю
    });
    return result.profile; // успешный ответ с profile и токенами
  }
);


/**
 * Получение профиля текущего пользователя
 */
export const fetchUserApi = createAppAsyncThunk<TUser>(
  `${SLICE_NAMES.USER}/fetchUserApi`,
  async (_, { extra: api }) => {
    const result = await api.getUserApi();
    if (!result) {
      throw Error('Сессия истекла');
    }
    const { success, ...userData } = result;
    return userData;
  }
);

/**
 * Обновление профиля пользователя
 */
export const fetchUpdateUserApi = createAppAsyncThunk<
  TUser,
  Partial<TUser>
>(
  `${SLICE_NAMES.USER}/fetchUpdateUserApi`,
  async (profileData, { extra: api }) => {
    const result = await api.updateUserProfileApi(profileData);
    if (!result.success) {
      throw new Error(result.message || 'Ошибка обновления профиля');
    }
    return result.data; // TUser
  }
);

/**
 * Ставим лайк или убираем
 */
export const fetchToggleFavoriteApi = createAppAsyncThunk<
  TFavoriteData,
  TToggleFavoriteParams
>(
  `${SLICE_NAMES.USER}/fetchToggleFavoriteApi`,
  async (params, { extra: api }) => {
    const result = await api.toggleFavoriteApi(params.skillId);

    if (!result.success) {
      throw new Error(result.message || 'Ошибка переключения избранного');
    }
    return result.data;
  }
);
