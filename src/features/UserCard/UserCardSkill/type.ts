// Добавить правильные типы данных
export type TSkill = {
  category: string;
  subCategory: string;
  title: string;
};

export type TUserCardSkillUIProps = {
  title: 'Может научить' | 'Хочет научиться';
  skills: TSkill[];
};
