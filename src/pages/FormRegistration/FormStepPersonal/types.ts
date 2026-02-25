import type React from 'react';
import type { TCity } from '@/entities/city';
import type { ReactNode } from 'react';
import type { ButtonStatus } from '@/shared/ui/button/types';

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
  selectedSkills: string[]; // ИЗМЕНЕНО: теперь массив строк вместо одной строки
  cityValue: string | null;
  buttonStatus: ButtonStatus;

  profilePhotoAdd: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onBirthChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onCityChange: (city: string | null) => void;
  onCategoryChange: (value: string) => void;
  onSkillsChange: (skills: string[]) => void; // ИЗМЕНЕНО: теперь принимает массив строк
  onForwardClick: () => void;
  onBackClick: () => void;
  showNameError: boolean;
  getValueHint: () => ReactNode;
};
