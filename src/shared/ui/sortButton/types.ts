import { type SortOption } from '@widgets/FilterAside/types';

export interface ISortButtonProps {
  type: SortOption;
  onSortToggle: () => void;
}
