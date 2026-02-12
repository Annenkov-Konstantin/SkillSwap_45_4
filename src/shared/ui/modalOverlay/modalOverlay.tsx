import React from 'react';
import type { TModalOverlayUI } from './types';
import styles from './modalOverlay.module.scss';
import clsx from 'clsx';

export const ModalOverlayUI: React.FC<TModalOverlayUI> = ({
  onClick,
  isVisible,
  blur = true,
  backdrop = false
}: TModalOverlayUI) => (
  <div
    className={clsx(styles.overlay, {
      [styles.overlay_blur]: blur,
      [styles.overlay_visible]: isVisible,
      [styles.overlay_backdrop]: backdrop,
    })}
    onClick={onClick}
  ></div>
);
