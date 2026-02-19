import React, {useState } from 'react';
import { type ITertiaryButton } from './types';
import styles from './tertiaryButton.module.scss';
import clsx from 'clsx';

export const TertiaryButton: React.FC<ITertiaryButton> = ({
  firstIcon,
  label,
  onClickButton,
  onIconClick,
  secondIcon,
  ...rest
}) => {
const [isKeyPressed, setIsKeyPressed] = useState(false);


  if (!label ) return null;

  const hasIcons = Boolean(firstIcon || secondIcon);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(true);
      onClickButton?.();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(false);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <button
      onClick={onClickButton}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={() => setIsKeyPressed(false)} // сброс при потере фокуса
      type='button'
      className={clsx(
        styles.button,
        {
          [styles.withoutIcons]: !hasIcons,
          [styles.keyPressed]: isKeyPressed // класс при нажатии Enter
        }
      )}
      {...rest}
    >
      {firstIcon && <span className={styles.icon}>{firstIcon}
      </span>}
      <span className={styles.label}>{label}
      </span>
      {secondIcon && <span
      onClick={(e)=>handleIconClick(e)}
      className={styles.icon}>{secondIcon}</span>}
    </button>
  );

};
