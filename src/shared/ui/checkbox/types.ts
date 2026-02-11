export type TCheckboxProps = {
  checked: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;

  disabled?: boolean;
  className?: string;
  value?: string | number;
  id?: string;
  name?: string;
};
