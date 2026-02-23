import type { TSkillCategory } from '@entities/user';
import type { TSkillAdapter } from '@features/UserCard/UserCardSkill/type';
import type { TSkills } from '@entities/skills';

export const skillsListAdapter = (
  skills: TSkillCategory[] | null,
  skillsStore: TSkills | null
): TSkillAdapter[] => {
  const result: TSkillAdapter[] = [];
  if (!skills || !skillsStore) return result;

  for (let i = 0; i < skills.length; i++) {
    for (let j = 0; j < skills[i].subcategory.length; j++) {
      result.push({
        categoryId: skills[i].category,
        subCategory:
          skillsStore
            .find((item) => item.id === skills[i].category)
            ?.skills.find((item) => item.id === skills[i].subcategory[j])
            ?.title || ''
      });
    }
  }

  return result;
};
