import type { ReactNode } from 'react';

import type { TSkills } from '@/entities/skills';

export type TModalProps = {
  onClose: () => void;
  skills: TSkills | null
  isVisible?: boolean;
};

type CategoryIconType = Record<string, string>;

export const categoryIcon: CategoryIconType = {
  1: 'busines_icon',
  2: 'creativity_icon',
  3: 'languages_icon',
  4: 'education_icon',
  5: 'home_icon',
  6: 'health_icon'
} as const;
