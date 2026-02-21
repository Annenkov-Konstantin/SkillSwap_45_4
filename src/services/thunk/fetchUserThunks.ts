import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TLoginCredentials, TRegisterData, TTokens } from '@api/types';
import type { TUser } from '@/entities/user';
import { setCookie } from '@/shared/lib/utils/cookie';

/**
 * Логин пользователя
 */
export const fetchLoginApi = createAppAsyncThunk<
  { user: TUser; tokens: TTokens },
  TLoginCredentials
>(
  `${SLICE_NAMES.USER}/fetchLoginApi`,
  async (credentials, { extra: api }) => {
    const result = await api.loginApi(credentials);
    return result; // { user, tokens }
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
    setCookie(
      'access_token',
      result.access_token
    )
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
      throw new Error('Сессия истекла');
    }
    return result; // TUser
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
