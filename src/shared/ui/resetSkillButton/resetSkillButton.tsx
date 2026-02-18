import React from 'react';
import { TertiaryButton } from '../tertiaryButton';
import { Icon } from '../Icon';
import { type IResetSkillButtonProps } from './types';
import styles from './resetSkillButton.module.scss';

export const ResetSkillButton: React.FC<IResetSkillButtonProps> = ({
  skill,
  onSkillToggle
}) => {
  return (
    <div className={styles.resetSkillButton}>
      <TertiaryButton
        label={skill.title}
        onClickButton={() => onSkillToggle(skill.id)}
        secondIcon={<Icon name='icon-cross' size={24} />}
      />
    </div>
  );
};
