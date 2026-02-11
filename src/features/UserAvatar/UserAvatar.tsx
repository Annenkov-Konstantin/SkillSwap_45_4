import styles from './UserAvatar.module.css';
import React from 'react';

export const UserAvatar:React.FC<HTMLDivElement> = () => {
  return (
    <div className={styles.user_account}>
      <p className={styles.user_name}>Мария</p>
      <img src='/' alt='Photo of user' className={styles.user_photo} />
    </div>
  );
};
