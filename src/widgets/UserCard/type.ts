import React from 'react';
import type { TSkillAdapter } from '@/features/UserCard/UserCardSkill/type';
import type { TUserSkill } from '@/entities/userSkill';
import type { TUser } from '@entities/user';

export type TUserCardUIProps = {
  user:TUser;
  skillsToLearn: TSkillAdapter[];
  skillsCanTeach: TSkillAdapter[];
  isFavorite:()=>boolean | undefined;
  isSuggested: boolean;
  handleMore: () => void;
  handleLike: (value:React.MouseEvent) => void;
  type: 'learn' | 'teach';
  likeCounter:number;
  likeRef?: React.Ref<HTMLButtonElement>;
  isLikeMessage?:boolean;
};

export type TUserCardProps = {
  user:TUser;
  swap:TUserSkill;
};
