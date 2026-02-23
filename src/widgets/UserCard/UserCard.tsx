// UserCard.tsx
import React, {useMemo} from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@/shared/lib/utils/skillsListAdapter';
import { useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';

export const UserCard: React.FC<TUserCardProps> = ({
  user,
  swap
}) => {
  const allSkills = useAppSelector(skillsSelectors.selectskills);

  // Преобразуем toLearn пользователя в массив TSkillAdapter[]
  const skillsToLearn = useMemo(() => {
    const categories = user.toLearn.map((item) => ({
      category: item.category,
      subcategory: item.subcategory,
    }));
    return skillsListAdapter(categories, allSkills);
  }, [user.toLearn, allSkills]);

  // Преобразуем предлагаемый навык в массив TSkillAdapter[] (один элемент)
  const skillsCanTeach = useMemo(() => {
    const categories = [{
      category: swap.category,
      subcategory: [swap.subCategory],
    }];
    return skillsListAdapter(categories, allSkills);
  }, [swap, allSkills]);

  if (!user) return null;


  return (
    <UserCardUI
      user={user}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      handleMore={() => {}}
      isFavorite={false}
      isSuggested={false}
      handleLike={() => {}}
      likesCount={swap.likes}
    />
  );
};
 
