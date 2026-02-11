import type { ReactNode } from 'react';

// временная типопая заглушка
interface Category {
  id: number;
  title: string;
  skills: string[];
}

export type TModalProps = {
  onClose: () => void;
  skills: Category[];
  isVisible?: boolean;
};

type CategoryIconType = Record<string, string>;

export const categoryIcon: CategoryIconType = {
  'Бизнес и карьера': 'busines_icon',
  'Творчество и искусство': 'creativity_icon',
  'Иностранные языки': 'languages_icon',
  'Образование и развитие': 'education_icon',
  'Дом и уют': 'home_icon',
  'Здоровье и лайфстайл': 'health_icon'
} as const;
