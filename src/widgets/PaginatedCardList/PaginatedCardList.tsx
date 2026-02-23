import { useEffect, useRef, useCallback } from 'react';
import { PaginatedCardListUI } from './PaginatedCardListUI';
import { type IPaginatedCardListProps } from './type';
import { Preloader } from '@/shared/ui/preloader';
import styles from './PaginatedCardListUI.module.scss';

export const PaginatedCardList = <T,>({
  cards,
  title,
  maxColumns = 3,
  maxRows,
  button,
  cardRender,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: IPaginatedCardListProps<T>) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    if (!onLoadMore) return;
    const options = { root: null, rootMargin: '20px', threshold: 0.1 };
    observerRef.current = new IntersectionObserver(handleObserver, options);
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [handleObserver, onLoadMore]);

  return (
    <>
      <PaginatedCardListUI
        cards={cards}
        title={title}
        maxColumns={maxColumns}
        maxRows={maxRows}
        button={button}
        cardRender={cardRender}
      />
      {onLoadMore && (
        <div ref={loadMoreRef} className={styles.loadMoreTrigger}>
          {isLoading && <Preloader/>}
        </div>
      )}
    </>
  );
};
