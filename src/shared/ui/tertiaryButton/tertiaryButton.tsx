import React, { useState } from 'react';
import { type ITertiaryButton } from './types';
import styles from './tertiaryButton.module.scss';
import clsx from 'clsx';

export const TertiaryButton: React.FC<ITertiaryButton> = ({
  firstIcon,
  label,
  onClickButton,
  secondIcon,
  ...rest
}) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  if (!label || !onClickButton) return null;

  const hasIcons = Boolean(firstIcon || secondIcon);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(true);
      onClickButton(); // Enter активирует действие
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(false);
    }
  };

  return (
    <button
      onClick={hasIcons ? undefined : onClickButton} // клик по кнопке только если нет иконок
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={() => setIsKeyPressed(false)}
      type='button'
      className={clsx(
        styles.button,
        {
          [styles.withoutIcons]: !hasIcons,
          [styles.hasIcons]: hasIcons,
          [styles.keyPressed]: isKeyPressed
        }
      )}
      {...rest}
    >
      {firstIcon && (
        <span
          className={styles.icon}
          onClick={hasIcons ? onClickButton : undefined} // клик по иконке
        >
          {firstIcon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {secondIcon && (
        <span
          className={styles.icon}
          onClick={hasIcons ? onClickButton : undefined}
        >
          {secondIcon}
        </span>
      )}
    </button>
  );
};
