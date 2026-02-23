import userSkillListSlice from './userSkillListSlice';
import {
  fetchUpdateSkillLikeApi,
  fetchUserListSkills,
} from '@thunks';

export const userSkillListActions = {
  ...userSkillListSlice.actions,
  fetchUserListSkills,
  fetchUpdateSkillLikeApi
};
export const userSkillListSelectors = userSkillListSlice.selectors;

export { userSkillListSlice };
