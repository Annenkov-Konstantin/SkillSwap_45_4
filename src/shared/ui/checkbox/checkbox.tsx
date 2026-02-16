import { CheckboxUi } from './checkboxui';
import type { TCheckboxProps } from './types';
import React from 'react';

export const Checkbox: React.FC<TCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
  className,
  value,
  id,
  name
}) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!checked);
    }
  };
  return (
    <CheckboxUi
      checked={checked}
      label={label}
      disabled={disabled}
      className={className}
      value={value}
      id={id}
      name={name}
      onChange={handleToggle}
    />
  );
};
