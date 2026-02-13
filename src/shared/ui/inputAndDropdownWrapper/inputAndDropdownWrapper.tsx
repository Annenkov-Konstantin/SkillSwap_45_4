import React from 'react';
import { type IInputAndDropdownWrapper } from './types';
import styles from './inputAndDropdownWrapper.module.scss';
import clsx from 'clsx';

export const InputAndDropdownWrapper = React.forwardRef<
  HTMLDivElement,
  IInputAndDropdownWrapper
>(({ input, dropdownList, isOpen }, containerRef) => {
  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, { [styles.containerOpen]: isOpen })}
    >
      {/* Обёртка для инпута (position: relative для кнопки) */}
      <div className={styles.inputWrapper}>{input}</div>
      {dropdownList}
    </div>
  );
});
