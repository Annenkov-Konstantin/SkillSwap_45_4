import React from 'react';
import { TertiaryButton } from '../tertiaryButton';
import { Icon } from '../Icon';
import { type IResetGenderButtonProps } from './types';
import styles from './resetGenderButton.module.scss';

export const ResetGenderButton: React.FC<IResetGenderButtonProps> = ({
  gender,
  onGenderChange
}) => {
  return (
    <div className={styles.resetGenderButton}>
      <TertiaryButton
        label={gender.label}
        onClickButton={() => onGenderChange()}
        secondIcon={<Icon name='icon-cross' size={24} />}
      />
    </div>
  );
};44
