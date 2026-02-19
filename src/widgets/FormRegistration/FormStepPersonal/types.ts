import type React from 'react';

export const optionsGender = [
  { label: 'Не имеет значения', value: 'any' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' }
];

export interface City {
  _id: string;
  name: string;
}

export type FormStepPersonalUIProps = {
  nameValue: string;
  birthValue: string;
  skillArray: string[];
  categoryArray: string[];
  cityArray: City[];
  genderValue: string;

  profilePhotoAdd: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onNameChange: (value: string)  => void;
  onBirthChange: (value: string)  => void;
  onGenderChange: (value: string) => void
};
