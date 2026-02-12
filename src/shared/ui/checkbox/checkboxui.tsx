import type React from 'react';
import type { TCheckboxProps } from './types';
import styles from './checkbox.module.scss';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.7803 8.62988C16.4903 8.33988 16.0097 8.33988 15.7197 8.62988L10.5801 13.7695L8.28027 11.4697C7.99028 11.1797 7.50973 11.1797 7.21973 11.4697C6.92973 11.7597 6.92973 12.2403 7.21973 12.5303L10.0498 15.3604C10.1898 15.5003 10.3801 15.5801 10.5801 15.5801C10.78 15.58 10.9704 15.5003 11.1104 15.3604L16.7803 9.69043C17.0702 9.40047 17.0702 8.9199 16.7803 8.62988Z"
      fill="currentColor"
    />
  </svg>
);


export const CheckboxUi: React.FC<TCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
  className,
  id = crypto.randomUUID(),
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };
  return (
    <label htmlFor={id} className={`${styles.container} ${className ?? ''}`.trim()}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
        aria-checked={checked}
        aria-label={label}
      />
      <span className={styles.checkmark}>{checked && <CheckIcon className={styles.icon} />}</span>
      {label != null && label !== '' && <span className={styles.label}>{label}</span>}
    </label>
  );
};