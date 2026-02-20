import type { TUser } from '@entities/user';
import type { TSkill } from '@features/UserCard/UserCardSkill/type';

export type TUserCardUIProps = {
  user: Pick<TUser, 'name' | 'avatarPic' | 'location' | 'dateOfBirth'> | null;
  handleMore: () => void;
  skillsToLearn: TSkill[];
  skillsCanTeach: TSkill[];
  isFavorite: boolean;
  isSuggested: boolean;
  handleLike: () => void;
};

export type TUserCardProps = {
  user: Pick<
    TUser,
    'name' | 'avatarPic' | 'location' | 'dateOfBirth' | 'toLearn' | 'canTeach'
  > | null;
};
