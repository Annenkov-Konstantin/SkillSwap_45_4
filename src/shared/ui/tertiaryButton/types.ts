import React from 'react';
import { type TSkill } from '@entities/skills';
import {
  type FilterAsideUIProps,
  PREFERENCE_OPTIONS
} from '@widgets/FilterAside/types';

export interface ITertiaryButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firstIcon?: React.ReactNode;
  label: string;
  onClickButton?: () => void;
  onIconClick?: () => void;
  secondIcon?: React.ReactNode;
}
