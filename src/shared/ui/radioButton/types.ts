import type { PreferenceOption } from "@/widgets/FilterAside/types";

export type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value:PreferenceOption) => void;
  name: string;
};
