// UserCard.tsx
import React from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@shared/lib/utils/skillsListAdapter';
import { useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';

export const UserCard: React.FC<TUserCardProps> = ({
  user,
  skillsToLearn: propSkillsToLearn,
  skillsCanTeach: propSkillsCanTeach,
}) => {
  if (!user) return null;
  const skills = useAppSelector(skillsSelectors.selectskills);

  // Если пропсы переданы — используем их, иначе вычисляем из user.toLearn / user.canTeach
  const skillsToLearn = propSkillsToLearn ?? skillsListAdapter(user.toLearn, skills);
  const skillsCanTeach = propSkillsCanTeach ?? skillsListAdapter(user.canTeach, skills);

  return (
    <UserCardUI
      user={user}
      handleMore={() => {}}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      isFavorite={false}
      isSuggested={false}
      handleLike={() => {}}
    />
  );
};

/* import React from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@shared/lib/utils/skillsListAdapter';
import { useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';

export const UserCard: React.FC<TUserCardProps> = ({
  user
}: TUserCardProps) => {
  if (!user) return null;
  const skills = useAppSelector(skillsSelectors.selectskills);

  const { toLearn, canTeach } = user;

  const skillsToLearn = skillsListAdapter(toLearn, skills);
  const skillsCanTeach = skillsListAdapter(canTeach, skills);

  return (
    <UserCardUI
      user={user}
      handleMore={() => {}}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      isFavorite={false}
      isSuggested={false}
      handleLike={() => {}}
    />
  );
}; */
