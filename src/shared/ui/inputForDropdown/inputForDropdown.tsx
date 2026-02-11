import React from 'react';
import { type IInputForDropdown } from './types';
import { InputButton } from '@shared/ui/inputButton';
import styles from './inputForDropdown.module.scss';

export const InputForDropdown = React.forwardRef<
  HTMLInputElement,
  IInputForDropdown
>(
  (
    {
      inputValue,
      handleInputChange,
      handleKeyDown,
      setIsOpen,
      placeholder,
      labelValue,
      isOpen,
      handleOpen,
      handleClear
    },
    inputRef
  ) => {
    // ID для связи label и input
    const inputId = React.useId();

    return (
      <div className={styles.container}>
        <label htmlFor={inputId} className={styles.label}>
          {labelValue}
        </label>
        <div className={styles.inputWrapper}>
          <input
            id={inputId}
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={styles.input}
          />

          <div className={styles.triggerWrapper}>
            <InputButton
              isOpen={isOpen}
              hasValue={!!inputValue}
              onOpen={handleOpen}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>
    );
  }
);
