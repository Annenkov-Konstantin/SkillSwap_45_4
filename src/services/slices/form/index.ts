import formSlice from './formSlice';
import { fetchRegisterApi } from '@thunks';

export const formActions = {
  ...formSlice.actions,
  fetchRegisterApi
};

export const formSelectors = formSlice.selectors;

export { formSlice };
