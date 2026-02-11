import React from 'react';
import type { RadioButtonProps } from './types';
import styles from './RadioButton.module.scss';

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  name
}) => {
  return (
    <label className={styles.radioButton}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        aria-label={label}
      />
      <span className={styles.customRadio} />
      {label}
    </label>
  );
};

export default RadioButton;
