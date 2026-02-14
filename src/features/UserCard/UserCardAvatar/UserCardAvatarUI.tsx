import React from 'react';
import type { TUserCardAvatarPropsUI } from './type';
import styles from './UserCardAvatar.module.scss';

export const UserCardAvatarUI: React.FC<TUserCardAvatarPropsUI> = ({
  avatarPic,
  name,
  location,
  formattedAge
}: TUserCardAvatarPropsUI): React.JSX.Element => {
  return (
    <div className={styles.user_account}>
      <img src={avatarPic} alt='Photo of user' className={styles.user_photo} />
      <div className={styles.user_info}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.user_name}>
          {`${location}${formattedAge ? `, ${formattedAge}` : ''}`}
        </p>
      </div>
    </div>
  );
};
