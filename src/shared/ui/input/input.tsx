import React, { useState, useRef } from 'react';
import styles from './input.module.scss';
import eyeOpenSvg from './icons/eye-open.svg';
import eyeClosedSvg from './icons/eye-closed.svg';
import search from './icons/search.svg';

import type { InputType, InputUIProps } from './types';

export const Input:React.FC<InputUIProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  error = false,
  errorText,
  className = '',
  isSearch = false
}: InputUIProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isPasswordType = type === 'password';

  const getInputType = (): InputType => {
    if (isPasswordType) {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.inputWrapper} ${error ? styles.error : ''}`}>
        {isSearch && !isFocused && value! === '' && (
          <img src={search} alt='Иконка поиска' className={styles.searchIcon} />
        )}

        <input
          ref={inputRef}
          type={getInputType()}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          aria-invalid={error}
          aria-describedby={error && errorText ? `${name}-error` : undefined}
          onFocus={() => setIsFocused(true)} // при фокусе — true
          onBlur={() => setIsFocused(false)} // при потере фокуса — false
        />

        {isPasswordType && (
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <img
              src={showPassword ? eyeOpenSvg : eyeClosedSvg}
              alt=''
              className={styles.eyeIcon}
            />
          </button>
        )}
      </div>

      {error && errorText && (
        <span id={`${name}-error`} className={styles.errorText} role='alert'>
          {errorText}
        </span>
      )}
    </div>
  );
};
