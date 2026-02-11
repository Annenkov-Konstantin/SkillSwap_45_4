import styles from './UserSkillDescription.module.scss';
import type { UserSkillDescriptionUIProps } from './types';
import React from 'react';

export const UserSkillDescription:React.FC<UserSkillDescriptionUIProps> = ({
  title,
  skill,
  description
}: UserSkillDescriptionUIProps) => {
  const categoryDisplay = `${skill.categoryTitle} / ${skill.categorySkill}`;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.category}>{categoryDisplay}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
