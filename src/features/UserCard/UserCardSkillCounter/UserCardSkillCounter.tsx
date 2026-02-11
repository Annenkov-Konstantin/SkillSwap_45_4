import styles from './UserCardSkillCounter.module.scss';
import type { TUserCardSkillCounterProps } from './types';
import React from 'react';

export const UserCardSkillCounter:React.FC<TUserCardSkillCounterProps> = ({counter}:TUserCardSkillCounterProps) => {
   if (counter <= 0) return null;

  return (
      <span className={styles.counter}>+{counter}</span>
  )
}
