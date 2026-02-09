import type { TUser } from '@entities/user';

export type TUserCardAvatarProps = Pick<
  TUser,
  'name' | 'avatarPic' | 'location' | 'dateOfBirth'
>;

export type TUserCardAvatarPropsUI = Pick<
  TUser,
  'name' | 'avatarPic' | 'location'
> & {
  formattedAge: string;
};
