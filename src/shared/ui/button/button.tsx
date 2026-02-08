import type React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  onClick?: () => void; //!temp
  status: string;
  textInside: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  status,
  textInside
}) => {
  const isDisabled = status.toLowerCase().includes('disabled');
  
  return (
    <button
      onClick={onClick}
      className= {`${styles.button} ${styles[`button${status}`]}`}
      disabled={isDisabled}
    >
      {textInside}
    </button>
  );
};
