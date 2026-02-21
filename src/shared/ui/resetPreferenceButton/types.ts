import { type PreferenceOption } from '@widgets/FilterAside/types';

export interface IResetPreferenceButtonProps {
  preference: PreferenceOption;
  onPreferenceChange: () => void;
}
