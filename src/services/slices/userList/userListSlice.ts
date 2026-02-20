import type { PayloadAction } from '@reduxjs/toolkit';
import type{ TUser } from '@/entities/user';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import {
  fetchGetAllUsers,
} from '@thunks';

export interface IUserListState {
  userList: TUser[] | null;
  requestStatus: TRequestStatus;
  error: string | null;
}

export const initialState: IUserListState = {
  userList: null,
  requestStatus: requestStatus.IDLE,
  error: null
};

export const userListSlice = createSlice({
  name: SLICE_NAMES.USER_LIST,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    selectUserList: (state) => state.userList,
    selectUserListStatus:(state)=> state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchGetAllUsers.pending,
        ),
        (state) => {
          state.requestStatus = requestStatus.LOADING;
          state.error = null;
        }
      )
      // Общая обработка для fulfilled
      .addMatcher(
        isAnyOf(fetchGetAllUsers.fulfilled),
        (state, action: PayloadAction<TUser[]>) => {
          state.requestStatus = requestStatus.SUCCESS;
          const users = action.payload;
          if (Array.isArray(users)){
            state.userList = users
            state.error = null;
          } else {
            state.error = 'Неверный тип данных';
          }
        }
      )
      // Общая обработка для всех остальных rejected
      .addMatcher(
        isAnyOf(fetchGetAllUsers.rejected),
        (state, action) => {
          state.requestStatus = requestStatus.ERROR;
          if (action.error.message) {
            state.error = action.error?.message;
          }
        }
      );
  }

});

export default userListSlice;
