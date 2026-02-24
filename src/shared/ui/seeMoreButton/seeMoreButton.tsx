import React from 'react';
import { TertiaryButton } from '../tertiaryButton';
import { Icon } from '../Icon';
import { type ISeeMoreButtonProps } from './types';
import styles from './seeMoreButton.module.scss';
import clsx from 'clsx';

export const SeeMoreButton: React.FC<ISeeMoreButtonProps> = ({ showMore, expanded = false }) => {
  const label = expanded ? 'Свернуть список' : 'Смотреть все';
  const iconClassName = clsx(expanded && styles.rotated);
  return (
    <div className={styles.seeMoreButton}>
      <TertiaryButton
        label={label}
        onClickButton={showMore}
        secondIcon={<Icon name="icon-chevron-right" size={24} className={iconClassName} />}
        hasIcons={false}
      />
    </div>
  );
};
