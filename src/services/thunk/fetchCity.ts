import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TCity } from '@/entities/city';


export const fetchCity = createAppAsyncThunk<TCity[]>(
  `${SLICE_NAMES.CITY}/fetchCity`,
  async (_, { extra: api }) => {
    const data = await api.getCitiesApi();
    return data;
  }
);
