// В types.ts (для UI)
import type React from 'react';
import type { TCity } from '@/entities/city';
import type { ReactNode } from 'react';
import type { ButtonStatus } from '@/shared/ui/button/types';
import type { TCategory, TSkill } from '@/entities/skills';

export const optionsGender = [
  { label: 'Не имеет значения', value: 'any' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' }
];

export type TCategoryOption = {
  id: number;
  category: string;
};

export type TTeachSkill = {
  category: number;      // ID категории
  subcategory: number[]; // массив ID подкатегорий
};

export type FormStepPersonalUIProps = {
  aboutMe:string;
  avatarPreview: string;
  nameValue: string;
  birthValue: string;
  skillArray: TSkill[];
  categoryArray: TCategoryOption[];
  cityArray: TCity[];
  genderValue: string;
  selectedCategory: TCategoryOption | null;
  selectedSkillIds: number[]; // ИЗМЕНЕНО: теперь массив ID
  cityValue: string;
  buttonStatus: ButtonStatus;
  selectedSkills: TSkill[];

  profilePhotoAdd: () => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onBirthChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onCityChange: (city: string) => void;
  onCategoryChange: (value: TCategoryOption | null) => void;
  onSkillsChange: (skillIds: number[]) => void; // ИЗМЕНЕНО: теперь принимает массив ID
  onForwardClick: () => void;
  onBackClick: () => void;
  onAboutMeChange:(value: string) => void;
  showNameError: boolean;
  getValueHint: () => ReactNode;
};
