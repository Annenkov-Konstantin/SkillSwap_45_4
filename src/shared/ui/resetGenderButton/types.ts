import { type GenderOption } from '@widgets/FilterAside/types';

export interface IResetGenderButtonProps {
  gender: GenderOption;
  onGenderChange: () => void;
}
