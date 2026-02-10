import { categories } from '../../../public/db/skills/skills.json';

type CategoryWithSkills = (typeof categories)[number];

export type CategorySkillPair = {
  [K in CategoryWithSkills['id']]: {
    categoryId: K;
    categoryTitle: Extract<CategoryWithSkills, { id: K }>['title'];
    categorySkill: Extract<CategoryWithSkills, { id: K }>['skills'][number];
  };
}[CategoryWithSkills['id']];

export type UserSkillDescriptionUIProps = {
  title: string;
  skill: CategorySkillPair;
  description: string;
};
