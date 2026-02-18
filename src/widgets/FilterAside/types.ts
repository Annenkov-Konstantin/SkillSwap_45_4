import {type TSkill} from '@entities/skills';
import {type TCity} from '@entities/city';

export type Gender = 'male' | 'female' | 'any';
export type Preference = 'teach' | 'learn' | 'all';
// Типы для опций (объекты)
export type PreferenceOption = typeof PREFERENCE_OPTIONS[number];
export type GenderOption = typeof GENDER_OPTIONS[number];

export interface Filters {
  preferenceFilter: PreferenceOption;
  skillFilter: TSkill[];
  genderFilter: GenderOption;
  cityFilter: TCity[];
}

export interface SkillCategory {
  id: number;
  category: string;
  skills: TSkill[];
}

export interface FilterAsideUIProps {
  filters: Filters; // текущее состояние фильтров, выбранные фильтры
  cityArray: TCity[]; // массив городов с сервера
  skillArray: SkillCategory[]; // массив навыков с сервера
  openCategories: number[]; // id раскрытых категорий (которые раскрываются по dropdown trigger)
  showAllCategories: boolean; // флаг показа полного списка категорий
  showAllCities: boolean; // флаг показа полного списка городов
  selectedCount: number; // число выбранных фильтров в заголовке

  onReset: () => void; // сбросить фильтры
  onPreferenceChange: (value: Preference) => void; // изменить все/хочу научиться/ могу научить
  onGenderChange: (value: Gender) => void; // изменить пол автора
  onCityToggle: (city: string) => void; // выбрать/убрать выбор города
  onSkillToggle: (skill: number) => void; // выбрать/убрать выбор навыка
  onCategoryToggle: (categoryId: number) => void; // раскрыть/ свернуть категорию до списка навыков
  onCategorySkillsToggle: (category: SkillCategory) => void; // выбрать/снять все навыки категории.
  onShowAllCategoriesToggle: () => void; // "все категории" развернуть/свернуть
  onShowAllCitiesToggle: () => void; // "все города" развернуть/свернуть
  getCategoryCheckState: (category: SkillCategory) => {
    checked: boolean; // выбраны все навыки категории (true, когда выбраны все навыки категории”)
    indeterminate: boolean; //  выбрана часть навыков в категории (состояние [-]).
  };
}

export const PREFERENCE_OPTIONS = [
  { label: 'Всё', value: 'all' as const },
  { label: 'Хочу научиться', value: 'learn' as const },
  { label: 'Могу научить', value: 'teach' as const }
] as const;

export const GENDER_OPTIONS = [
  { label: 'Не имеет значения', value: 'any' as const },
  { label: 'Мужской', value: 'male' as const },
  { label: 'Женский', value: 'female' as const }
] as const;
