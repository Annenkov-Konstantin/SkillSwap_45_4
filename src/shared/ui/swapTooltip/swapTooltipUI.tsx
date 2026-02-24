import React from 'react';
import styles from './swapTooltip.module.scss';
import { type SwapTooltipUIProps } from './types';
import { Icon } from '@/shared/ui/Icon';

export const SwapTooltipUI: React.FC<SwapTooltipUIProps> = ({
  id,
  text,
  onOpen,
  onClose
}:SwapTooltipUIProps)  => {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notificationTextContainer}>
        <Icon name='icon-idea' size={24} fill='none' />
        <p className={styles.notificationText}>{text}</p>
      </div>
      <button
        type='button'
        className={styles.closeButton}
        onClick={() => onClose(id)}
        aria-label='Закрыть уведомление'
      >
        <Icon name='icon-cross' size={24} fill='#253017' />
      </button>
      <button
        type='button'
        onClick={() => onOpen(id)}
        className={styles.showNotificationButton}
        aria-label='Перейти к уведомлению'
      >
        Перейти
      </button>
    </div>
  );
};
