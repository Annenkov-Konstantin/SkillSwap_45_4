import React from 'react';
import { type IHeaderForPaginatedCardListProps } from './types';
import styles from './headerForPaginatedCardList.module.scss';

export const HeaderForPaginatedCardList: React.FC<
  IHeaderForPaginatedCardListProps
> = ({ heading, button }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.headerForPaginatedCardList}>{heading}</h2>
      <div>{button}</div>
    </div>
  );
};
