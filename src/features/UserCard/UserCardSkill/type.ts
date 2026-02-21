import type { TCategory, TSkill as Skill } from '@entities/skills';

export type TSkill = {
  categoryId: TCategory['id'];
  subCategory: Skill['title'];
};

export type TUserCardSkillUIProps = {
  title: 'Может научить' | 'Хочет научиться';
  skills: TSkill[];
};
