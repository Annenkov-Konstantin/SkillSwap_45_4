export type Gender = 'male' | 'female' | 'any';
export type Preference = 'teach' | 'learn' | 'all';

export interface Filters {
  preferenceFilter: Preference;
  skillFilter: string[];
  genderFilter: Gender;
  cityFilter: string[];
}

export interface Skill {
  id: number;
  title: string;
}

export interface SkillCategory {
  id: number;
  category: string;
  skills: Skill[];
}

export interface City {
  _id: string;
  name: string;
}

export interface FilterAsideUIProps {
  filters: Filters; // текущее состояние фильтров, выбранные фильтры
  cityArray: City[]; // массив городов с сервера
  skillArray: SkillCategory[]; // массив навыков с сервера
  openCategories: number[]; // id раскрытых категорий (которые раскрываются по dropdown trigger)
  showAllCategories: boolean; // флаг показа полного списка категорий
  showAllCities: boolean; // флаг показа полного списка городов
  selectedCount: number; // число выбранных фильтров в заголовке

  onReset: () => void; // сбросить фильтры
  onPreferenceChange: (value: Preference) => void; // изменить все/хочу научиться/ могу научить
  onGenderChange: (value: Gender) => void; // изменить пол автора
  onCityToggle: (city: string) => void; // выбрать/убрать выбор города
  onSkillToggle: (skill: string) => void; // выбрать/убрать выбор навыка
  onCategoryToggle: (categoryId: number) => void; // раскрыть/ свернуть категорию до списка навыков
  onCategorySkillsToggle: (category: SkillCategory) => void; // выбрать/снять все навыки категории.
  onShowAllCategoriesToggle: () => void; // "все категории" развернуть/свернуть
  onShowAllCitiesToggle: () => void; // "все города" развернуть/свернуть
  getCategoryCheckState: (category: SkillCategory) => {
    checked: boolean; // выбраны все навыки категории (true, когда выбраны все навыки категории”)
    indeterminate: boolean; //  выбрана часть навыков в категории (состояние [-]).
  };
}
