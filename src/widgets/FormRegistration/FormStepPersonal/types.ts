import type React from 'react';
import type { TCity } from '@/entities/city';
import type { ReactNode } from 'react';

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
  selectedCategory: string | null;
  selectedSkill: string | null;
  cityValue: string | null;

  profilePhotoAdd: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onNameChange: (value: string)  => void;
  onBirthChange: (value: string)  => void;
  onGenderChange: (value: string) => void;
  onCityChange: (city: string | null) => void;
  onCategoryChange: (value: string) => void;
  onSkillChange: (value: string) => void;
  onForwardClick: () => void;
  onBackClick: () => void;
  showNameError: boolean;
  getValueHint: () => ReactNode;
};
