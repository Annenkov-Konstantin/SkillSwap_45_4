import { type ReactNode, type ButtonHTMLAttributes } from 'react';

export interface ITertiaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  firstIcon?: ReactNode;
  label: string;
  onClickButton?: () => void;
  secondIcon?: ReactNode;
}

export interface TertiaryButtonUIProps {
  firstIcon?: React.ReactNode;
  label: string;
  secondIcon?: React.ReactNode;
  hasIcons: boolean;
  isKeyPressed: boolean;
  onButtonClick?: () => void;
  onIconClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  [key: string]: any; // для rest-пропсов
}