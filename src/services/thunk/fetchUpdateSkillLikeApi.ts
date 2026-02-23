import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { Tdelta, TlikeData } from '@/api/types';

export const fetchUpdateSkillLikeApi = createAppAsyncThunk<
    TlikeData,
    {
      skillId:string;
      delta:Tdelta
    }
  >(
  `${SLICE_NAMES.USER}/fetchUpdateSkillLikeApi`,
  async (params, { extra: api }) => {
    const result = await api.updateSkillLikesApi(params.skillId, params.delta);
      if (!result.success) {
        throw new Error(result.message || 'Ошибка обновления лайка');
      }
      return result.data
  }
);






















