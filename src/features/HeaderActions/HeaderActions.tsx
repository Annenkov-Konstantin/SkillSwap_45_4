import { useState, type FC } from "react";
import type { THeaderActionsProps } from "./type";
import { Button } from "@/shared/ui";
import { NotificationModal } from '@/features/NotificationModal';
import styles from './HeaderActions.module.css';
import { UserAvatar } from "../UserAvatar";
import bell from '@assets/icons/notification.svg';
import heart from '@assets/icons/like.svg';

// добавить навигацию на роуты, когда появятся
export const HeaderActions: FC<THeaderActionsProps> = ({
  isLogin,
  userName,
  userPhoto
}) => {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const handleLoginClick = () => {};

  const handleRegisterClick = () => {};

  const handleFavouritesClick = () => {};

  const handleNotificationOpen = () => {
    setNotificationModalOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationModalOpen(false);
  };

  return (
    <>
      {isLogin ? (
        <div className={styles.profile_container}>
          <div className={styles.profile_buttons_container}>
            <button
              type="button"
              className={styles.profile_button}
              onClick={handleFavouritesClick}
            >
              <img src={heart} alt="Иконка сердечка" />
            </button>
            <button
              type="button"
              className={styles.profile_button}
              onClick={handleNotificationOpen}
            >
              <img src={bell} alt="Иконка колокольчика" />
            </button>
          </div>
          <UserAvatar userName={userName} userPhoto={userPhoto} />
        </div>
      ) : (
        <div className={styles.buttons_container}>
          <Button onClick={handleLoginClick} status="secondary">
            Войти
          </Button>
          <Button onClick={handleRegisterClick} status="primary">
            Зарегистрироваться
          </Button>
        </div>
      )}
      {isNotificationModalOpen && (
        <NotificationModal
          onClose={handleNotificationClose}
          isVisible={isNotificationModalOpen}
        />
      )}
    </>
  );
};
