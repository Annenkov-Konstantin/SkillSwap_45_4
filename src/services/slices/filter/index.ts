import filterSlice from './filterSlice';

export const filterActions = {
  ...filterSlice.actions
};
export const filterSelectors = filterSlice.selectors;

export { filterSlice };
