import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  userListSlice,
  userSkillListSlice,
  skillsSlice,
  citySlice,
  userSlice,
  filterSlice
} from '@slices';

import { api } from '@/api';

export const rootReducer = combineSlices(
  userListSlice,
  userSkillListSlice,
  skillsSlice,
  citySlice,
  userSlice,
  filterSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } })
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
