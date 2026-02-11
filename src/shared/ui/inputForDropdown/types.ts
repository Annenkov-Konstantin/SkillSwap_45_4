import React from 'react';

export interface IInputForDropdown {
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setIsOpen: (value: boolean) => void;
    handleOpen: () => void;
    handleClear: () => void;
    placeholder?: string;
    labelValue?: string;
    isOpen: boolean;
  };
