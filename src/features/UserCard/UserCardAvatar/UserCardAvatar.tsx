import React from 'react';
import type { TUserCardAvatarProps } from './type';
import { formatAgeWithWord } from '@/utils/formatAge';
import { calculateAge } from '@/utils/calculateAge';
import styles from './UserCardAvatar.module.css';

export const UserCardAvatar = (
  userData: TUserCardAvatarProps
): React.JSX.Element => {
  const { avatarPic, name, location, dateOfBirth } = userData || {};

  const userAge = calculateAge(dateOfBirth);

  const formattedAge = userAge ? formatAgeWithWord(userAge) : '';

  return (
    <div className={styles.user_account}>
      <img
        src={avatarPic}
        alt={`Фото пользователя ${name}`}
        className={styles.user_photo}
      />
      <div className={styles.user_info}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.user_name}>{`${location}, ${formattedAge}`}</p>
      </div>
    </div>
  );
};
