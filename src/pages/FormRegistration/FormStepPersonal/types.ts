import type React from 'react';
import type { TCity } from '@/entities/city';

export const optionsGender = [
  { label: 'Не имеет значения', value: 'any' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' }
];


export type FormStepPersonalUIProps = {
  nameValue: string;
  birthValue: string;
  skillArray: string[];
  categoryArray: string[];
  cityArray: TCity[];
  genderValue: string;

  profilePhotoAdd: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onNameChange: (value: string)  => void;
  onBirthChange: (value: string)  => void;
  onGenderChange: (value: string) => void
};
