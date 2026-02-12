import React from 'react';

export interface IInputForDropdown {
  button: React.ReactNode;
  inputValue: string;
  inputId: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsOpen: (value: boolean) => void;
  placeholder?: string;
  isOpen: boolean;
}
