import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TRegisterData } from '@api/types';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus, TSetfirstStepForm, TSetSecondStepForm, TThirdStepFormData } from '@types';
import { fetchRegisterApi } from '@thunks';
import type { TUser } from '@/entities/user';

export interface IFormState {
  registerData: TRegisterData;
  firstStep:boolean,
  secondStep:boolean,
  swapInfo:{
    skillName:string,
    description:string,
    images:string[]
  },
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
  swapInfo:{
    skillName:'',
    description:'',
    images:[]

  },
  firstStep:false,
  secondStep:false
};


export const formSlice = createSlice({
  name: SLICE_NAMES.FORM,
  initialState,
  reducers: {
    clearForm:(state)=> {
      return initialState;
    },
    setfirstStepForm:(state, action: PayloadAction<TSetfirstStepForm>) => {
      const {email, password} = action.payload;
      state.registerData.email=email;
      state.registerData.password=password;
      state.firstStep=true;
    },
    setPassword:(state, action: PayloadAction<IFormState['registerData']['password']>) => {
      state.registerData.password = action.payload;
    },
    setSecondStepForm:(state, action: PayloadAction<TSetSecondStepForm>) => {
       state.registerData = { ...state.registerData, ...action.payload }
       state.secondStep=true;
    },
    setThirdStepForm:(state, action: PayloadAction<TThirdStepFormData>) => {
       const data = action.payload;
       state.swapInfo.skillName=data.skillName;
       state.swapInfo.description=data.description;
       state.registerData.canTeach=data.toTeach;
       if(data.skillImages)
       state.swapInfo.images=data.skillImages;
    },
  },
  selectors: {
    selectRegisterData: (state) => state.registerData,
    selectIsFirstStepTrue: (state) => state.firstStep,
    selectIsSecondStepTrue: (state) => state.secondStep,
    selectSwapData: (state) => ({
      swapInfo: state.swapInfo,
      canTeach: state.registerData.canTeach,
      toLearn:state.registerData.toLearn,
      aboutMe:state.registerData.aboutMe
    })
  },
});

export default formSlice;
