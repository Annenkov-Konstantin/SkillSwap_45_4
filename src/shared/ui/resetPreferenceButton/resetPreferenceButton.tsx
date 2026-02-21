import React from 'react';
import { TertiaryButton } from '../tertiaryButton';
import { Icon } from '../Icon';
import { type IResetPreferenceButtonProps } from './types';
import styles from './resetPreferenceButton.module.scss';

export const ResetPreferenceButton: React.FC<IResetPreferenceButtonProps> = ({
  preference,
  onPreferenceChange
}) => {
  return (
    <div className={styles.resetPreferenceButton}>
      <TertiaryButton
        label={preference.label}
        onClickButton={() => onPreferenceChange(preference)}
        secondIcon={<Icon name='icon-cross' size={24} />}
        hasIcons={true}
      />
    </div>
  );
};44
