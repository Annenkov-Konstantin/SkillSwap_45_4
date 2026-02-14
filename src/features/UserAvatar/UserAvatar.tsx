import type { FC } from 'react';
import type { TUserAvatarProps } from './type';
import styles from './UserAvatar.module.scss';

export const UserAvatar: FC<TUserAvatarProps> = ({ userName, userPhoto }) => {
  return (
    <div className={styles.user_account}>
      <p className={styles.user_name}>{userName}</p>
      <img src={userPhoto} alt='Photo of user' className={styles.user_photo} />
    </div>
  );
};
