import type { PayloadAction } from '@reduxjs/toolkit';
import type { TCity } from '@/entities/city';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES, requestStatus } from '@constants';
import type { TRequestStatus } from '@types';
import {
  fetchCity,
} from '@thunks';

export interface ICity {
  city: TCity[] | null;
  requestStatus: TRequestStatus;
  error: string | null;
}

export const initialState: ICity = {
  city: null,
  requestStatus: requestStatus.IDLE,
  error: null
};

export const citySlice = createSlice({
  name: SLICE_NAMES.CITY,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  selectors: {
    selectCity: (state) => state.city,
    selectCityStatus:(state)=> state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchCity.pending,
        ),
        (state) => {
          state.requestStatus = requestStatus.LOADING;
          state.error = null;
        }
      )
      // Общая обработка для fulfilled
      .addMatcher(
        isAnyOf(fetchCity.fulfilled),
        (state, action: PayloadAction<TCity[]>) => {
          state.requestStatus = requestStatus.SUCCESS;
          const city = action.payload;
          if (Array.isArray(city)){
            state.city = city
            state.error = null;
          } else {
            state.error = 'Неверный тип данных';
          }
        }
      )
      // Общая обработка для всех остальных rejected
      .addMatcher(
        isAnyOf(fetchCity.rejected),
        (state, action) => {
          state.requestStatus = requestStatus.ERROR;
          if (action.error.message) {
            state.error = action.error?.message;
          }
        }
      );
  }

});

export default citySlice;
