import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUserSkill } from '@/entities/userSkill';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import {
  fetchUpdateSkillLikeApi,
  fetchUserListSkills,
  fetchAddNewUserSkill
} from '@thunks';
import type { TlikeData } from '@/api/types';

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
      .addCase(
        fetchUpdateSkillLikeApi.fulfilled,
        (state, action: PayloadAction<TlikeData>) => {
          const { skillId, likes } = action.payload;
          // Находим навык в массиве и обновляем его лайки
          if (state.userSkillList){
            const skillIndex = state.userSkillList.findIndex(s => s._id === skillId);
            if (skillIndex !== -1) {
              state.userSkillList[skillIndex].likes = likes;
            }
          }
        }
      )
      .addCase(
        fetchAddNewUserSkill.fulfilled,
        (state, action: PayloadAction<TUserSkill>) => {
          const newSkill = action.payload;
          state.userSkillList?.push(newSkill)
        }
      )
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchUserListSkills.pending,fetchAddNewUserSkill.pending
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
        isAnyOf(fetchUserListSkills.rejected, fetchAddNewUserSkill.rejected),
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
