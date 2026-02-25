import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TRegisterData } from '@api/types';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus, TSetfirstStepForm } from '@types';
import { fetchRegisterApi } from '@thunks';
import type { TUser } from '@/entities/user';

export interface IFormState {
  registerData: TRegisterData;
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
  user: null,
  error: null
};


export const formSlice = createSlice({
  name: SLICE_NAMES.FORM,
  initialState,
  reducers: {
    clearForm:(state)=> {
      return initialState;
    },
    clearError:(state)=> {
      state.error = null;
    },
    setfirstStepForm:(state, action: PayloadAction<TSetfirstStepForm>) => {
      const {email, password} = action.payload;
      state.registerData.email=email;
      state.registerData.password=password;
    },
    setPassword:(state, action: PayloadAction<IFormState['registerData']['password']>) => {
      state.registerData.password = action.payload;
    },
  },
  selectors: {
    selectRegisterData: (state) => state.registerData,
    selectUser: (state) => state.user,
    selectError: (state) => state.error
  },
});

export default formSlice;
