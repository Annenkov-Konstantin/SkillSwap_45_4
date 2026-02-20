import { createAppAsyncThunk } from '@store-hooks';
import { SLICE_NAMES } from '@constants';
import type { TUser } from '@/entities/user';


export const fetchGetAllUsers = createAppAsyncThunk<TUser[]>(
  `${SLICE_NAMES.USER_LIST}/fetchGetAllUsers`,
  async (_, { extra: api }) => {
    const data = await api.getAllUsersApi();
    return data;
  }
);
