import type { TCity } from "@/entities/city";
import type { TCategory, TSkill, TSkills } from "@/entities/skills";

export type PreferenceOption = typeof PREFERENCE_OPTIONS[number];
export type GenderOption = typeof GENDER_OPTIONS[number];
export type SortOption = typeof SORT_OPTIONS[number];

export type TSkillFilter = {
  categoryId: number;
  skills: TSkill[];
}

export interface TFilters {
  preferenceFilter: PreferenceOption;
  skillFilter: TSkillFilter[];
  genderFilter: GenderOption;
  cityFilter: TCity[];
  searchFilter:string;
  sortFilter:SortOption;
}



export interface FilterAsideUIProps {
  cityArray: TCity[]; // массив городов с сервера
  skillArray: TSkills; // массив навыков с сервера
  openCategories: number[]; // id раскрытых категорий (которые раскрываются по dropdown trigger)
  showAllCategories: boolean; // флаг показа полного списка категорий
  showAllCities: boolean; // флаг показа полного списка городов
  selectedCount: number; // число выбранных фильтров в заголовке

  onReset: () => void; // сбросить фильтры
  onPreferenceChange: (value: PreferenceOption) => void; // изменить все/хочу научиться/ могу научить
  onGenderChange: (value: GenderOption) => void; // изменить пол автора
  onCityToggle: (city: TCity) => void; // выбрать/убрать выбор города
  onSkillToggle: (category:number, skill: TSkill) => void; // выбрать/убрать выбор навыка
  onCategoryToggle: (categoryId: number) => void; // раскрыть/ свернуть категорию до списка навыков
  onCategorySkillsToggle: (category: TCategory) => void; // выбрать/снять все навыки категории.
  onShowAllCategoriesToggle: () => void; // "все категории" развернуть/свернуть
  onShowAllCitiesToggle: () => void; // "все города" развернуть/свернуть
  onCheckSkillExist:(category:number, skillId: number)=> boolean;// выставляет чекбоксы в (true/false)
  onCheckPreferenceExist:(pref:PreferenceOption)=>boolean // выставляет радиокнопки preference в (true/false)
  onCheckGenderExist:(gender:GenderOption)=>boolean //выставляет радиокнопки gender в (true/false)
  onCheckCityExist:(city:TCity)=>boolean //выставляет радиокнопки  в (true/false)
  // getCategoryCheckState: (category: SkillCategory) => {
  //   checked: boolean; // выбраны все навыки категории (true, когда выбраны все навыки категории”)
  //   indeterminate: boolean; //  выбрана часть навыков в категории (состояние [-]).
  // };
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

export const SORT_OPTIONS = [
  { label: 'По умолчанию', value: 'default' as const },
  { label: 'Сначала новые', value: 'new' as const },
  { label: 'Сначала давние', value: 'old' as const }
] as const;
