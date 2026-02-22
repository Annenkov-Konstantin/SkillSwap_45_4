import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { TUser } from '@/entities/user';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import type { TFavoriteData } from '@/api/types';

import {
  fetchLoginApi,
  fetchRegisterApi,
  fetchUserApi,
  fetchUpdateUserApi,
  fetchToggleFavoriteApi,
} from '@thunks';



export interface IUserState {
  user: TUser | null;
  requestStatus: TRequestStatus;
  error: string | null;
}

export const initialState: IUserState = {
  user: null,
  requestStatus: requestStatus.IDLE,
  error: null
};

export const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Синхронный выход (без thunk)
    logout: (state) => {
      state.user = null;
      state.requestStatus = requestStatus.IDLE;
      state.error = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserStatus: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
        // Toggle избранного
      .addCase(fetchToggleFavoriteApi.fulfilled,
        (state, action: PayloadAction<TFavoriteData>) => {
          state.requestStatus = requestStatus.SUCCESS;
          if (state.user) {
            // Обновляем весь массив избранного (сервер вернул актуальный)
            state.user.favoriteSkills = action.payload.favoriteSkills;
          }
        }
      )
        // Общий pending для всех асинхронных операций с пользователем
      .addMatcher(
        isAnyOf(
          fetchLoginApi.pending,
          fetchRegisterApi.pending,
          fetchUserApi.pending,
          fetchUpdateUserApi.pending
        ),
        (state) => {
          state.requestStatus = requestStatus.LOADING;
          state.error = null;
        }
      )
      /*       // Успешный вход (login)
      .addMatcher(
        fetchLoginApi.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: TUser;
            tokens: { access_token: string; refresh_token: string };
          }>
        ) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload.user;
        }
      )
      // Успешная регистрация
      .addMatcher(
        fetchRegisterApi.fulfilled,
        (
          state,
          action: PayloadAction<TUser>
        ) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload;
        }
      )
      // Успешное получение профиля
      .addMatcher(
        fetchUserApi.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload;
        }
      )
      // Успешное обновление профиля
      .addMatcher(
        fetchUpdateUserApi.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: TUser;
            message: string;
            success: boolean;
          }>
        ) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload.data;
        }
      ) */
      // Обработка ошибок для всех thunks
      .addMatcher(
        isAnyOf(
          fetchLoginApi.rejected,
          fetchRegisterApi.rejected,
          fetchUserApi.rejected,
          fetchUpdateUserApi.rejected
        ),
        (state, action) => {
          state.requestStatus = requestStatus.ERROR;
          state.error = action.error.message || 'Произошла ошибка';
        }
      );
  }
});

// Экспорт редьюсера
export default userSlice;
