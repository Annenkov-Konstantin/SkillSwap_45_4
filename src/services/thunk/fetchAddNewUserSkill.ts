import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TSkillData } from '@api/types';
import type { TUser } from '@/entities/user';
import type { TUserSkill } from '@/entities/userSkill';

// Добавление нового Навыка

export const fetchAddNewUserSkill = createAppAsyncThunk<
  TUserSkill,
  TSkillData
>(
  `${SLICE_NAMES.USER_SKILL_LIST}/fetchAddNewUserSkill`,
  async (data, { extra: api }) => {
    const result = await api.addNewUserSkillApi(data);
    if (!result.success) {
      throw new Error(result.message || 'Registration failed');
    }
   return result.data
  }
);
