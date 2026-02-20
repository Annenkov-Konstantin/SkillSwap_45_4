import React from 'react';
import { type IPreferenceAndSkillWrapperProps } from './types';
import styles from './preferenceAndSkillWrapper.module.scss';

export const PreferenceAndSkillWrapper: React.FC<
  IPreferenceAndSkillWrapperProps
> = ({ preferenceResetButton, skillResetButton }): React.JSX.Element => {
  return (
    <div className={styles.preferenceAndSkillWrapper}>
      {preferenceResetButton} {skillResetButton}
    </div>
  );
};
