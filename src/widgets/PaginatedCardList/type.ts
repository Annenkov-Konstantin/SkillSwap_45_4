export interface IPaginatedCardListProps<T> extends IPaginatedCardListUIProps<T> {
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export interface IPaginatedCardListUIProps<T = unknown> {
  cards: T[];
  title?: string;
  maxColumns?: 3 | 4;
  maxRows?: number;
  button?: React.ReactNode;
  cardRender?: (card: T) => React.ReactNode;
}
