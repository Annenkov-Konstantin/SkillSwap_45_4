type ButtonStatus =
  | 'primary'
  | 'primary_disabled'
  | 'secondary'
  | 'secondary_disabled';

export type TButtonProps = {
  onClick?: () => void;
  status: ButtonStatus;
  textInside: string;
}
