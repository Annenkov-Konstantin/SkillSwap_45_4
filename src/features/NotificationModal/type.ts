export type TNotificationItem = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  actionLabel?: string;
};

export type TNotificationModalProps = {
  onClose: () => void;
  newNotifications: TNotificationItem[];
  viewedNotifications: TNotificationItem[];
  isVisible?: boolean;
  onReadAll?: () => void;
  onClearViewed?: () => void;
  onNotificationAction?: (notificationId: string) => void;
};
