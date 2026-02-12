import type React from 'react';
import styles from './button.module.scss';
import type { TButtonProps } from './types';

export const Button: React.FC<TButtonProps> = ({
  onClick,
  status,
  children
}) => {
  const isDisabled = status.toLowerCase().includes('disabled');

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[`button_${status}`]} `}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
