export type TSelectOption = {
  value: string;
  label: string;
};

export type TSelectProps = {
  options: TSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};
