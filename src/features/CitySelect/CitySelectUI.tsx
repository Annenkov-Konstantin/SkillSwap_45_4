import React from 'react';
import { type ICitySelectUI } from './type';
import styles from './CitySelect.module.scss';

export const CitySelectUI = React.forwardRef(
  (
    { children, isOpen }: ICitySelectUI,
    containerRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={containerRef} className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}>
        {children}
      </div>
    );
  }
);
