import { useState } from 'react';
import styles from './favourites.module.css'
import clsx from 'clsx';

export const Favourites = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button
      onClick={() => setIsLiked(!isLiked)}
      className={clsx(styles.icon, isLiked && styles.is_liked)}
      type='button'
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
      >
        <path
          className={styles.heart}
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.5 1A5.5 5.5 0 0 0 1 6.5C1 12 7.5 17 11 18.163 14.5 17 21 12 21 6.5a5.5 5.5 0 0 0-10-3.163A5.5 5.5 0 0 0 6.5 1"
        />
      </svg>
    </button>
  );
};
