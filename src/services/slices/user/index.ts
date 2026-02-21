import userSlice from './userSlice';
import {
  fetchLoginApi,
  fetchRegisterApi,
  fetchUserApi,
  fetchUpdateUserApi
} from '@thunks';

export const userActions = {
  ...userSlice.actions,
  fetchLoginApi,
  fetchRegisterApi,
  fetchUserApi,
  fetchUpdateUserApi
};

export const userSelectors = userSlice.selectors;

export {userSlice};

//export { default } from './userSlice';
//export * from './userSlice'; // clearError, logout и др. actions

// Если нужен тип состояния
//export type { IUserState } from './userSlice';
