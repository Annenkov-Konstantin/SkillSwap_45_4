import React from 'react';
import styles from './tertiaryButton.module.scss';
import {type TertiaryButtonUIProps} from './types';
import clsx from 'clsx';



export const TertiaryButtonUI: React.FC<TertiaryButtonUIProps> = ({
  firstIcon,
  label,
  secondIcon,
  hasIcons,
  isKeyPressed,
  isSort,
  onButtonClick,
  onIconClick,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...rest
}) => {
  return (
    <button
      onClick={hasIcons ? undefined : onButtonClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      type='button'
      className={clsx(
        styles.button,
        {
          [styles.withoutIcons]: !hasIcons,
          [styles.hasIcons]: hasIcons,
          [styles.keyPressed]: isKeyPressed,
          [styles.sort]: isSort
        }
      )}
      {...rest}
    >
      {firstIcon && (
        <span
          className={styles.icon}
          onClick={hasIcons ? onIconClick : undefined}
        >
          {firstIcon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {secondIcon && (
        <span
          className={styles.icon}
          onClick={hasIcons ? onIconClick : undefined}
        >
          {secondIcon}
        </span>
      )}
    </button>
  );
};
