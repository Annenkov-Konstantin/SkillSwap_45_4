import { memo, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TNotificationItem, TNotificationModalProps } from './type';
import { NotificationModalUI } from './NotificationModalUI';

const modalRoot = document.getElementById('modals');

const getDefaultNewNotifications = (): TNotificationItem[] => [
  {
    id: 'new-1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    dateLabel: 'сегодня',
    actionLabel: 'Перейти'
  },
  {
    id: 'new-2',
    title: 'Татьяна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    dateLabel: 'сегодня',
    actionLabel: 'Перейти'
  }
];

const getDefaultViewedNotifications = (): TNotificationItem[] => [
  {
    id: 'viewed-1',
    title: 'Олег предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    dateLabel: 'вчера'
  },
  {
    id: 'viewed-2',
    title: 'Игорь принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    dateLabel: '23 мая'
  }
];

export const NotificationModal: FC<TNotificationModalProps> = memo(
  ({ onClose, isVisible }) => {
    const [newNotifications, setNewNotifications] = useState<TNotificationItem[]>(
      getDefaultNewNotifications
    );
    const [viewedNotifications, setViewedNotifications] = useState<
      TNotificationItem[]
    >(getDefaultViewedNotifications);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleReadAll = useCallback(() => {
      setNewNotifications([]);
    }, []);

    const handleClearViewed = useCallback(() => {
      setViewedNotifications([]);
    }, []);

    const handleNotificationAction = useCallback((notificationId: string) => {
      setNewNotifications((prevState) =>
        prevState.filter((notification) => notification.id !== notificationId)
      );
    }, []);

    useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [handleClose]);

    if (!modalRoot) {
      return null;
    }

    return ReactDOM.createPortal(
      <NotificationModalUI
        onClose={handleClose}
        isVisible={isVisible}
        newNotifications={newNotifications}
        viewedNotifications={viewedNotifications}
        onReadAll={handleReadAll}
        onClearViewed={handleClearViewed}
        onNotificationAction={handleNotificationAction}
      />,
      modalRoot
    );
  }
);
