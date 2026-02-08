import type React from 'react';
import styles from './button.module.scss';
import type { TButtonProps } from '@/widgets/ExampleComponent/types';

export const Button: React.FC<TButtonProps> = ({
  onClick,
  status,
  textInside
}) => {
  const isDisabled = status.toLowerCase().includes('disabled');

  return (
    <button
      onClick={onClick}
      className= {`${styles.button} ${styles[`button_${status}`]}`}
      disabled={isDisabled}
    >
      {textInside}
    </button>
  );
};
