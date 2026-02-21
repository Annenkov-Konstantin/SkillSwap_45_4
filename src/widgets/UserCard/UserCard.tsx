import React from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@/shared/lib/utils/skillsListAdapter';
import { useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';

export const UserCard: React.FC<TUserCardProps> = ({
  user,
  swap
}) => {
  if (!user) return null;

  const skills = useAppSelector(skillsSelectors.selectskills);

  const skillsToLearn = skillsListAdapter(user.toLearn, skills);
  const skillsCanTeach = skillsListAdapter(user.canTeach, skills);

  return (
    <UserCardUI
      user={user}
      handleMore={() => {}}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      isFavorite={false}
      isSuggested={false}
      handleLike={() => {}}
      type={swap.type}
    />
  );
};
