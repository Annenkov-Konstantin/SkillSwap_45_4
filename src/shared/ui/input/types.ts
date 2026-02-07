export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url';

export type InputUIProps = {
  type?: InputType;
  pattern?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  error?: boolean;
  errorText?: string;
  className?: string; // для кастомных стилей контейнера
  isSearch?: boolean;
  isEditable?: boolean;
};
