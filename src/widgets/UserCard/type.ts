import type { TSkillAdapter } from '@/features/UserCard/UserCardSkill/type';
import type { TUserSkill } from '@/entities/userSkill';
import type { TUser } from '@entities/user';

export type TUserCardUIProps = {
  user:TUser;
  skillsToLearn: TSkillAdapter[];
  skillsCanTeach: TSkillAdapter[];
  isFavorite: boolean;
  isSuggested: boolean;
  handleMore: () => void;
  handleLike: () => void;
  type: 'learn' | 'teach';
  likeCounter:number;
};

export type TUserCardProps = {
  user:TUser;
  swap:TUserSkill;
};
