import type { FC } from "react";
import { Button } from "@/shared/ui";
import { NotificationModal } from '@/features/NotificationModal';
import styles from './HeaderActions.module.css';
import { UserAvatar } from "../UserAvatar";
import bell from '@assets/icons/notification.svg';
import heart from '@assets/icons/like.svg';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/services/hooks";
import { userSelectors } from "@/services/slices/user";

export const HeaderActions: React.FC = () => {
  const user = useAppSelector(userSelectors.selectUser);

  const navigate = useNavigate();
  // добавить навигацию на роуты, когда появятся

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register'); // или любой другой путь
  };

  const handleNotificationClose = () => {
    setNotificationModalOpen(false);
  };

  return (
    <>
      {user ? (
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
          <UserAvatar userName={user.name} userPhoto={user.avatarPic}/>
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
