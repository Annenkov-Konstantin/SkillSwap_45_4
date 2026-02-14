// hooks/useSkill.ts
import { useMemo } from 'react';
import categoriesData from '../../../public/db/skills/skills.json';

export function useSkill(categoryId: number | null, skillId: number | null) {
  return useMemo(() => {
    if (!categoryId || !skillId) return null;

    const category = categoriesData.find(
      (category) => category.id === categoryId
    );
    if (!category) return null;

    const skill = category.skills.find((s) => s.id === skillId);
    if (!skill) return null;

    return {
      categoryId: category.id,
      categoryTitle: category.category,
      skill: skill
    };
  }, [categoryId, skillId]);
}
