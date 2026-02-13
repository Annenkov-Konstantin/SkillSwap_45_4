import React from 'react';
import type { TUserCardAvatarProps } from './type';
import { formatAgeWithWord } from '@/shared/lib/utils/formatAge';
import { calculateAge } from '@/shared/lib/utils/calculateAge';
import { UserCardAvatarUI } from './UserCardAvatarUI';

export const UserCardAvatar: React.FC<TUserCardAvatarProps> = (
  userData: TUserCardAvatarProps
): React.JSX.Element => {
  const { avatarPic, name, location, dateOfBirth } = userData || {};

  const userAge = calculateAge(dateOfBirth);
  const formattedAge = userAge ? formatAgeWithWord(userAge) : '';

  return (
    <UserCardAvatarUI
      avatarPic={avatarPic}
      name={name}
      location={location}
      formattedAge={formattedAge}
    />
  );
};
