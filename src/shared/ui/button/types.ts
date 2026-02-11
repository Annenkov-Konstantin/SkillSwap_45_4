import type { ReactNode } from "react";

type ButtonStatus =
  | 'primary'
  | 'primary_disabled'
  | 'secondary'
  | 'secondary_disabled'
  | 'form_button_disabled';

export type TButtonProps = {
  onClick?: () => void;
  status: ButtonStatus;
  children: ReactNode;
}
