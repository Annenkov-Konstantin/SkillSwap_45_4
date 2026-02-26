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
  isAuth:boolean;
}

export const initialState: IUserState = {
  user: null,
  requestStatus: requestStatus.IDLE,
  error: null,
  isAuth:false
};

export const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    authUser:(state)=> {
      state.isAuth=true;
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
    selectUserStatus: (state) => state.requestStatus,
    selectUserError:(state)=>state.error,
    selectUserAuth:(state)=>state.isAuth,
    selectUserGender:(state)=>state.user?.gender
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
      .addCase( fetchUpdateUserApi.fulfilled,
        (state, action: PayloadAction<Partial<TUser>>) => {
          state.requestStatus = requestStatus.SUCCESS;
          const newData = action.payload;
          if (state.user) {
            // Обновляем весь массив избранного (сервер вернул актуальный)
            state.user= {...state.user, ...newData};
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
      // Успешное получение профиля (getuser?, login)
      .addMatcher(
        isAnyOf(
          fetchUserApi.fulfilled,
          fetchLoginApi.fulfilled,
          fetchRegisterApi.fulfilled
        ),
        (state, action: PayloadAction<TUser>) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload;
          state.error = null;
          state.isAuth=true;
        }
      )
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
