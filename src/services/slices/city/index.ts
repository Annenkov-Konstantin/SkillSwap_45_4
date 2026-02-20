import citySlice from './citySlice';
import {
  fetchCity,
} from '@thunks';

export const cityActions = {
  ...citySlice.actions,
  fetchCity,
};
export const citySelectors = citySlice.selectors;

export { citySlice };
