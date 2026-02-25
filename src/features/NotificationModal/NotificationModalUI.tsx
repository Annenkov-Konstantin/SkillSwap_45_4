import { memo } from 'react';
import type { FC } from 'react';
import { ModalOverlayUI } from '@/shared/ui';
import ideaIcon from '@assets/icons/idea.svg';
import type { TNotificationItem } from './type';
import styles from './NotificationModal.module.scss';

type TNotificationListProps = {
  notifications: TNotificationItem[];
  variant: 'new' | 'viewed';
  onNotificationAction?: (notificationId: string) => void;
};

type TNotificationModalUIProps = {
  onClose: () => void;
  newNotifications: TNotificationItem[];
  viewedNotifications: TNotificationItem[];
  isVisible?: boolean;
  onReadAll: () => void;
  onClearViewed: () => void;
  onNotificationAction: (notificationId: string) => void;
};

const NotificationList: FC<TNotificationListProps> = memo(
  ({ notifications, onNotificationAction, variant }) => (
    <ul
      className={`${styles.list} ${
        variant === 'new' ? styles.list_new : styles.list_viewed
      }`}
    >
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className={`${styles.list_item} ${
            variant === 'new' ? styles.list_item_new : ''
          }`}
        >
          <img
            src={ideaIcon}
            alt=""
            aria-hidden
            className={styles.notification_icon}
          />
          <div className={styles.notification_content}>
            <p className={styles.notification_title}>{notification.title}</p>
            <p className={styles.notification_description}>
              {notification.description}
            </p>
          </div>
          <span className={styles.notification_date}>{notification.dateLabel}</span>
          {notification.actionLabel && (
            <button
              type="button"
              className={styles.action_button}
              onClick={() => onNotificationAction?.(notification.id)}
            >
              {notification.actionLabel}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
);

export const NotificationModalUI: FC<TNotificationModalUIProps> = memo(
  ({
    onClose,
    newNotifications,
    viewedNotifications,
    isVisible,
    onReadAll,
    onClearViewed,
    onNotificationAction
  }) => (
    <>
      <section
        className={`${styles.notification_modal} ${isVisible ? styles.visible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Уведомления"
      >
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2 className={styles.section_title}>Новые уведомления</h2>
            <button
              type="button"
              className={styles.section_action}
              onClick={onReadAll}
              disabled={newNotifications.length === 0}
            >
              Прочитать все
            </button>
          </div>
          {newNotifications.length > 0 ? (
            <NotificationList
              notifications={newNotifications}
              variant="new"
              onNotificationAction={onNotificationAction}
            />
          ) : (
            <p className={styles.empty_state}>Новых уведомлений пока нет</p>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2 className={styles.section_title}>Просмотренные</h2>
            <button
              type="button"
              className={styles.section_action}
              onClick={onClearViewed}
              disabled={viewedNotifications.length === 0}
            >
              Очистить
            </button>
          </div>
          {viewedNotifications.length > 0 ? (
            <NotificationList
              notifications={viewedNotifications}
              variant="viewed"
            />
          ) : (
            <p className={styles.empty_state}>
              Просмотренных уведомлений пока нет
            </p>
          )}
        </div>
      </section>
      <ModalOverlayUI onClick={onClose} blur={false} isVisible={isVisible} />
    </>
  )
);
