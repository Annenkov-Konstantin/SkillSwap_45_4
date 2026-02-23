import { memo, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TNotificationModalProps } from './type';
import { NotificationModalUI } from './NotificationModalUI';

const modalRoot = document.getElementById('modals');

export const NotificationModal: FC<TNotificationModalProps> = memo((props) => {
  const { onClose } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
    <NotificationModalUI {...props} onClose={handleClose} />,
    modalRoot
  );
});
