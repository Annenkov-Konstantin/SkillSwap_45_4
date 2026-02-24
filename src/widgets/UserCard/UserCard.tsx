// UserCard.tsx
import React, {useMemo, useRef} from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@/shared/lib/utils/skillsListAdapter';
import { skillsSelectors } from '@slice/skills';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userSkillListActions, userSkillListSelectors } from '@slice/userSkillList';
import { userActions, userSelectors } from '@slice/user';

export const UserCard: React.FC<TUserCardProps> = ({
  user,
  swap
}) => {

  if (!user) return null;
  const {fetchUpdateSkillLikeApi}  = useDispatchedActions(userSkillListActions)
  const {fetchToggleFavoriteApi} = useDispatchedActions(userActions)

  const skills = useAppSelector(skillsSelectors.selectskills);
  const isInFavorites = ()=>{
    console.log('user.favoriteSkills:', user.favoriteSkills);
    return user.favoriteSkills.some(skill => skill === swap._id);

  }

  const skillsToLearn = skillsListAdapter(user.toLearn, skills);
  const skillsCanTeach = skillsListAdapter(user.canTeach, skills);
  const handleLike = ()=>{
    if (!isInFavorites()){
      fetchUpdateSkillLikeApi({skillId:swap._id,delta:1})
      fetchToggleFavoriteApi({skillId:swap._id})
    } else {
      fetchUpdateSkillLikeApi({skillId:swap._id,delta: -1})
      fetchToggleFavoriteApi({skillId:swap._id})
    }

  }

  return (
    <UserCardUI
      user={user}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      handleMore={() => {}}
      isFavorite={false}
      isSuggested={false}
      handleLike={handleLike}
      type={swap.type}
      likeCounter = {swap.likes}
    />
  );
};
