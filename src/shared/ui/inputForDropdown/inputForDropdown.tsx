import React from 'react';
import { type IInputForDropdown } from './types';
import styles from './inputForDropdown.module.scss';
import clsx from 'clsx';

export const InputForDropdown = React.forwardRef<
  HTMLInputElement,
  IInputForDropdown
>(
  (
    {
      button,
      inputValue,
      inputId,
      handleInputChange,
      handleKeyDown,
      setIsOpen,
      placeholder,
      isOpen
    },
    inputRef
  ) => {
    return (
      <>
        <input
          id={inputId}
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={clsx(styles.input, {[styles.open]: isOpen})}
        />

        <div className={styles.triggerWrapper}>{button}</div>
      </>
    );
  }
);
