// src/shared/ui/dropdownTrigger/dropdownTrigger.tsx
import type { TInputButtonProps } from './types';
import styles from './inputButton.module.scss';
import clsx from 'clsx';


export const InputButton = ({ 
  isOpen, 
  onOpen, 
  onClear,
  hasValue 
}: TInputButtonProps) => {
  const handleClick = () => {
    if (isOpen && hasValue) {
      onClear?.();
    } else {
      onOpen?.();
    }
  };

  return (
    <button 
      type="button" 
      className={styles.trigger_button}
      onClick={handleClick}
      aria-label={isOpen ? "Очистить поле" : "Открыть список"}
    >
      {(isOpen && hasValue) ? (
        // Крестик при открытом дропдауне и введённом значении
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          className={styles.cross}
        >
          <path
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            d='M6 6L18 18M6 18L18 6'
          />
        </svg>
      ) : (
        // Стрелка при закрытом дропдауне
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
        >
          <path
            fill='currentColor'
            d='M12 15.935c-.646 0-1.292-.249-1.781-.738L4.2 9.179a.696.696 0 0 1 0-.978.696.696 0 0 1 .978 0l6.018 6.018a1.136 1.136 0 0 0 1.606 0L18.821 8.2a.696.696 0 0 1 .978 0 .696.696 0 0 1 0 .978l-6.018 6.018c-.489.49-1.135.738-1.781.738Z'
          />
        </svg>
      )}
    </button>
  );
};