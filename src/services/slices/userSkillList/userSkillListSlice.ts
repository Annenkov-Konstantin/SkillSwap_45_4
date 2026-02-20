import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUserSkill } from '@/entities/userSkill';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import {
  fetchUserListSkills,
} from '@thunks';

export interface IUserSkillList {
  userSkillList: TUserSkill[] | null;
  requestStatus: TRequestStatus;
  error: string | null;
}

export const initialState: IUserSkillList = {
  userSkillList: null,
  requestStatus: requestStatus.IDLE,
  error: null
};

export const userSkillListSlice = createSlice({
  name: SLICE_NAMES.USER_SKILL_LIST,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    selectSkillUserList: (state) => state.userSkillList,
    selectUserSkillListStatus:(state)=> state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchUserListSkills.pending,
        ),
        (state) => {
          state.requestStatus = requestStatus.LOADING;
          state.error = null;
        }
      )
      // Общая обработка для fulfilled
      .addMatcher(
        isAnyOf(fetchUserListSkills.fulfilled),
        (state, action: PayloadAction<TUserSkill[]>) => {
          state.requestStatus = requestStatus.SUCCESS;
          const userSkillList = action.payload;
          if (Array.isArray(userSkillList)){
            state.userSkillList = userSkillList
            state.error = null;
          }else{
            state.error = 'Неверный тип данных';
          }
        }
      )
      // Общая обработка для всех остальных rejected
      .addMatcher(
        isAnyOf(fetchUserListSkills.rejected),
        (state, action) => {
          state.requestStatus = requestStatus.ERROR;
          if (action.error.message) {
            state.error = action.error?.message;
          }
        }
      );
  }

});

export default userSkillListSlice;
