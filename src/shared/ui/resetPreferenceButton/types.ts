import { type Preference, type PreferenceOption } from '@widgets/FilterAside/types';

export interface IResetPreferenceButtonProps {
  preference: PreferenceOption;
  onPreferenceChange: (value: Preference) => void;
}
