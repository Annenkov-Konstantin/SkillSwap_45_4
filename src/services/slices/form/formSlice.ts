import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TRegisterData } from '@api/types';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import { fetchRegisterApi } from '@thunks';
import type { TUser } from '@/entities/user';

export interface IFormState {
  registerData: TRegisterData;
  requestStatus: TRequestStatus;
  user: TUser | null;
  error: string | null;
}

export const initialState: IFormState = {
  registerData: {
    name: '',
    location: '',
    dateOfBirth: '',
    gender: '',
    avatarPic: '',
    email: '',
    password: '',
    aboutMe: '',
    favoriteSkills: [],
    toLearn: [],
    canTeach: []
  },
  requestStatus: requestStatus.IDLE,
  user: null,
  error: null
};

function setFormField<K extends keyof IFormState['registerData']>(
  state: IFormState,
  action: PayloadAction<{ field: K; value: IFormState['registerData'][K] }>
) {
  state.registerData[action.payload.field] = action.payload.value;
}

export const formSlice = createSlice({
  name: SLICE_NAMES.FORM,
  initialState,
  reducers: {
    clearForm() {
      return initialState;
    },
    clearError(state) {
      state.error = null;
    },
    setEmail(
      state,
      action: PayloadAction<IFormState['registerData']['email']>
    ) {
      state.registerData.email = action.payload;
    },
    setPassword(
      state,
      action: PayloadAction<IFormState['registerData']['password']>
    ) {
      state.registerData.password = action.payload;
    },
    setField: setFormField
  },
  selectors: {
    selectRegisterData: (state) => state.registerData,
    selectRequestStatus: (state) => state.requestStatus,
    selectUser: (state) => state.user,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(fetchRegisterApi.pending), (state) => {
        state.requestStatus = requestStatus.LOADING;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(fetchRegisterApi.fulfilled),
        (state, action: PayloadAction<TUser>) => {
          state.requestStatus = requestStatus.SUCCESS;
          state.user = action.payload;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(fetchRegisterApi.rejected), (state, action) => {
        state.requestStatus = requestStatus.ERROR;
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  }
});

export default formSlice;
