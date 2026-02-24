import { HeaderForPaginatedCardList } from '@shared/ui/headerForPaginatedCardList';
import { type IPaginatedCardListUIProps } from './type';
import clsx from 'clsx';
import styles from './PaginatedCardListUI.module.scss';

export const PaginatedCardListUI = <T,>({
  cards,
  title,
  maxColumns = 3,
  maxRows,
  cardRender,
  button
}: IPaginatedCardListUIProps<T>) => {
  const displayedCards = maxRows ? cards.slice(0, maxColumns * maxRows) : cards;

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.header}>
          <HeaderForPaginatedCardList
            heading={title}
            button={button}
          />
        </div>
      )}
      <div className={clsx(styles.grid, styles[`grid-${maxColumns}`])}>
        {displayedCards.map((item, index) => (
          <div key={index} className={styles.gridItem}>
            {cardRender ? cardRender(item) : <div>No render</div>}
          </div>
        ))}
      </div>
    </section>
  );
};
