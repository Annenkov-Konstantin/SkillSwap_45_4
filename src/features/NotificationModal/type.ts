export type TNotificationItem = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  actionLabel?: string;
};

export type TNotificationModalProps = {
  onClose: () => void;
  isVisible?: boolean;
};
