import userSkillListSlice from './userSkillListSlice';
import {
  fetchUserListSkills,
} from '@thunks';

export const userSkillListActions = {
  ...userSkillListSlice.actions,
  fetchUserListSkills,
};
export const userSkillListSelectors = userSkillListSlice.selectors;

export { userSkillListSlice };
