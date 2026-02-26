import userSkillListSlice from './userSkillListSlice';
import {
  fetchUpdateSkillLikeApi,
  fetchUserListSkills,
  fetchAddNewUserSkill
} from '@thunks';

export const userSkillListActions = {
  ...userSkillListSlice.actions,
  fetchUserListSkills,
  fetchUpdateSkillLikeApi,
  fetchAddNewUserSkill
};
export const userSkillListSelectors = userSkillListSlice.selectors;

export { userSkillListSlice };
