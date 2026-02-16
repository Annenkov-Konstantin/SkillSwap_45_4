import styles from './UserSkillDescription.module.scss';
import type { UserSkillDescriptionProps } from './type';
import React from 'react';
import { useSkill } from '@/shared/hooks/useSkillsCategoryMatcher';

export const UserSkillDescription: React.FC<UserSkillDescriptionProps> = ({
  title,
  categoryId,
  skillId,
  description
}: UserSkillDescriptionProps) => {
  const skillPair = useSkill(categoryId, skillId);

  const categoryDisplay = `${skillPair?.categoryTitle} / ${skillPair?.skill.title}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.category}>{categoryDisplay}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
