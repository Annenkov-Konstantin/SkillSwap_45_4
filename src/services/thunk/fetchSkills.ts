import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TSkills } from '@/entities/skills';


export const fetchSkills = createAppAsyncThunk<TSkills>(
  `${SLICE_NAMES.SKILLS}/fetchSkills`,
  async (_, { extra: api }) => {
    const data = await api.getDefaultSkillsApi();
    return data;
  }
);
