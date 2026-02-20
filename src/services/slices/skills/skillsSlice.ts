import type { PayloadAction } from '@reduxjs/toolkit';
import type { TSkills} from '@/entities/skills';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import {
  fetchSkills,
} from '@thunks';

export interface IUserListState {
  skills: TSkills | null;
  requestStatus: TRequestStatus;
  error: string | null;
}

export const initialState: IUserListState = {
  skills: null,
  requestStatus: requestStatus.IDLE,
  error: null
};

export const skillsSlice = createSlice({
  name: SLICE_NAMES.SKILLS,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  selectors: {
    selectskills: (state) => state.skills,
    selectskillsStatus:(state)=> state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchSkills.pending,
        ),
        (state) => {
          state.requestStatus = requestStatus.LOADING;
          state.error = null;
        }
      )
      // Общая обработка для fulfilled
      .addMatcher(
        isAnyOf(fetchSkills.fulfilled),
        (state, action: PayloadAction<TSkills>) => {
          state.requestStatus = requestStatus.SUCCESS;
          const skills = action.payload;
          if (Array.isArray(skills)){
            state.skills = skills
            state.error = null;
          } else {
            state.error = 'Неверный тип данных';
          }
        }
      )
      // Общая обработка для всех остальных rejected
      .addMatcher(
        isAnyOf(fetchSkills.rejected),
        (state, action) => {
          state.requestStatus = requestStatus.ERROR;
          if (action.error.message) {
            state.error = action.error?.message;
          }
        }
      );
  }

});

export default skillsSlice;
