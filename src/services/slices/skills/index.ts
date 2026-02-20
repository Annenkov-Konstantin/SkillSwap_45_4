import skillsSlice from './skillsSlice';
import {
  fetchSkills,
} from '@thunks';

export const skillsActions = {
  ...skillsSlice.actions,
  fetchSkills,
};
export const skillsSelectors = skillsSlice.selectors;

export { skillsSlice };
