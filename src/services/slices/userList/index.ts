import userListSlice from './userListSlice';
import {
  fetchGetAllUsers,
} from '@thunks';

export const userListActions = {
  ...userListSlice.actions,
  fetchGetAllUsers,
};
export const userListSelectors = userListSlice.selectors;

export { userListSlice };
