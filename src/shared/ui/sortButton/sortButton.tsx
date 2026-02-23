import React from 'react';
import { Icon } from '../Icon';
import type { ISortButtonProps } from './types';
import styles from './sortButton.module.scss';
import { TertiaryButton } from '../tertiaryButton';
import { useAppSelector, useDispatchedActions } from '@/services/hooks';
import { filterActions,filterSelectors } from '@/services/slices/filter';
import { SORT_OPTIONS } from '@/widgets/FilterAside/types';

const sortType = {
  [SORT_OPTIONS[0].value]:SORT_OPTIONS[1],
  [SORT_OPTIONS[1].value]:SORT_OPTIONS[2],
  [SORT_OPTIONS[2].value]:SORT_OPTIONS[0],
}

export const SortButtonButton: React.FC = ({
}) => {

  const { sortChange } = useDispatchedActions(filterActions);
  const sortValue = useAppSelector(filterSelectors.selectSortFilter)

  const handleSort=()=>{
    sortChange(sortType[sortValue.value])
  }

  return (
    <div className={styles.sort_button_container}>
      <TertiaryButton
        label={sortValue.label}
        onClickButton={handleSort}
        firstIcon={<Icon name='icon-sort' size={24} className={sortValue.value === 'new'? styles.revert: ''}/>}
        hasIcons={false}
        isSort={true}
      />
    </div>
  );
};
