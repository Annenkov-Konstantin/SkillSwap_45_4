import React from 'react';
import { Icon } from '../Icon';
import { type IResetSkillButtonProps } from './types';
import styles from './resetSkillButton.module.scss';
import { TertiaryButton } from '../tertiaryButton';

export const ResetSkillButton: React.FC<IResetSkillButtonProps> = ({
  skill,
  onSkillToggle
}) => {
  return (
    <div className={styles.resetSkillButton}>
      <TertiaryButton
        label={skill.title}
        onClickButton={onSkillToggle}
        secondIcon={<Icon name='icon-cross' size={24} />}
        hasIcons={true}
      />
    </div>
  );
};
