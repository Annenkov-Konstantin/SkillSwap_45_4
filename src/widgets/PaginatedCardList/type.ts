export type ViewMode = 
  | 'popular' 
  | 'new' 
  | 'recommended' 
  | 'exact-match'
  | 'new-ideas'
  | 'filtered'
  | 'related';

export interface PaginatedCardListProps {
  title?: string;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
}

export interface IPaginatedCardListUIProps<T = any> {
  cards: T[];
  title?: string;
  maxColumns?: 3 | 4;
  maxRows?: number;
  button?: React.ReactNode;       // готовая кнопка для заголовка
  cardRender?: (card: T) => React.ReactNode;
}

/* export interface IPaginatedCardListProps<T = any> {
  cards: T[];
  title?: string;
  viewMode?: ViewMode;
  maxColumns?: 3 | 4;
  maxRows?: number;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  cardRender?: (card: T) => React.ReactNode; // рендер-функция для карточки
} */
