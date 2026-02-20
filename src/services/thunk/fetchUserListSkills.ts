import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TUserSkill } from '@/entities/userSkill';


export const fetchUserListSkills = createAppAsyncThunk<TUserSkill[]>(
  `${SLICE_NAMES.USER_SKILL_LIST}/fetchUserListSkills`,
  async (_, { extra: api }) => {
    const data = await api.getUserListSkillsApi();
      return data
  }
);
