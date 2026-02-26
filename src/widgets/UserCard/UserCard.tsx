// UserCard.tsx
import React, {useEffect, useMemo, useRef, useState} from 'react';
import { UserCardUI } from './UserCardUI';
import type { TUserCardProps } from './type';
import { skillsListAdapter } from '@/shared/lib/utils/skillsListAdapter';
import { skillsSelectors } from '@slice/skills';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userSkillListActions, userSkillListSelectors } from '@slice/userSkillList';
import { userActions, userSelectors } from '@slice/user';
import { current } from '@reduxjs/toolkit';

export const UserCard: React.FC<TUserCardProps> = ({
  user,
  swap
}) => {
  const {fetchUpdateSkillLikeApi}  = useDispatchedActions(userSkillListActions)
  const {fetchToggleFavoriteApi} = useDispatchedActions(userActions)
  const buttonLikeRef= useRef<HTMLButtonElement>(null);
  const [showLikeMessage, setLikeMessage] = useState (false);
  const currnetUser = useAppSelector(userSelectors.selectUser)
  const skills = useAppSelector(skillsSelectors.selectskills);
  const isInFavorites = ()=>{
    return currnetUser?.favoriteSkills.some(skill => skill === swap._id);
  }

  const skillsToLearn = skillsListAdapter(user.toLearn, skills);
  const skillsCanTeach = skillsListAdapter(user.canTeach, skills);

  const handleLike = (e:React.MouseEvent)=>{
    e.stopPropagation();
    if (!user) return null;
    if(user && user._id === currnetUser?._id ) return;

    const likeButton = e.target as HTMLButtonElement;
    if(!currnetUser && likeButton ){
      setLikeMessage(true);
      return
    }
    if(currnetUser){
      if (!isInFavorites()){
        fetchUpdateSkillLikeApi({skillId:swap._id,delta:1})
        fetchToggleFavoriteApi({skillId:swap._id})
      } else {
        fetchUpdateSkillLikeApi({skillId:swap._id,delta: -1})
        fetchToggleFavoriteApi({skillId:swap._id})
      }
    }
  }

  // Подсказка если не зареган
  useEffect(() => {
    if (!buttonLikeRef.current) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonLikeRef.current && !buttonLikeRef.current.contains(event.target as Node)) {
        setLikeMessage(false);
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLikeMessage(false);
      }
    };
    // Добавляем обработчики
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [buttonLikeRef]);

  return (
    <UserCardUI
      user={user}
      skillsToLearn={skillsToLearn}
      skillsCanTeach={skillsCanTeach}
      handleMore={() => {}}
      isFavorite={isInFavorites}
      isSuggested={false}
      handleLike={handleLike}
      type={swap.type}
      likeCounter = {swap.likes}
      likeRef={buttonLikeRef}
      isLikeMessage={showLikeMessage}
    />
  );
};
