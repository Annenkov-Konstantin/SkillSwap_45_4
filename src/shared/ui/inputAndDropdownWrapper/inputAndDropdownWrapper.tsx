import React from 'react';
import { type IInputAndDropdownWrapper } from './types';
import styles from './inputAndDropdownWrapper.module.scss';

export const InputAndDropdownWrapper = React.forwardRef(
  (
    { input, dropdownList, isOpen }: IInputAndDropdownWrapper,
    containerRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={containerRef}
        className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}
      >
        {/* Обёртка для инпута (position: relative для кнопки) */}
        <div className={styles.inputWrapper}>{input}</div>
        {dropdownList}
      </div>
    );
  }
);
