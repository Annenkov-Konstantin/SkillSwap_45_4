import styles from './UserCard.module.scss';
import React from 'react';
import { UserCardAvatar, UserCardSkillUI } from '@features/index';
import type { TUserCardUIProps } from './type';
import { Button, LikeButtonUI } from '@shared/ui';
import clockIcon from '@assets/icons/clock.svg';

export const UserCardUI: React.FC<TUserCardUIProps> = ({
  user,
  handleMore,
  skillsToLearn,
  skillsCanTeach,
  isFavorite = false,
  isSuggested = false,
  handleLike,
  type,
  likeCounter
}: TUserCardUIProps) => {
  if (!user) return null;

  const { name, avatarPic, location, dateOfBirth } = user;

  return (
    <div className={styles.card}>
      <div className={styles.like}>
        <span>{likeCounter}</span>
        <LikeButtonUI onClick={handleLike} isLiked={isFavorite} />
      </div>
      <UserCardAvatar
        name={name}
        avatarPic={avatarPic}
        location={location}
        dateOfBirth={dateOfBirth}
      />
      <div className={styles.skills}>
        {type === 'learn' && (
        <>
          <UserCardSkillUI title='Хочет научиться' skills={skillsToLearn} />
          <UserCardSkillUI title='Может научить' skills={skillsCanTeach} />
        </>
        )}
        {type === 'teach' && (
        <>
          <UserCardSkillUI title='Может научить' skills={skillsCanTeach} />
          <UserCardSkillUI title='Хочет научиться' skills={skillsToLearn} />
        </>
        )}
      </div>
      {isSuggested ? (
        <Button status='secondary' onClick={handleMore}>
          <img className={styles.buttonImg} src={clockIcon} alt='часы' />
          Обмен предложен
        </Button>
      ) : (
        <Button status='primary' onClick={handleMore}>
          Подробнее
        </Button>
      )}
    </div>
  );
};
