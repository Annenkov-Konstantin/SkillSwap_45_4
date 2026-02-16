import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TModalProps } from './type';
import { SkillsDropdownUI } from './SkillsDropdownUI';

const modalRoot = document.getElementById('modals');

export const SkillsDropdown: FC<TModalProps> = memo(({ skills, isVisible, onClose }) => {

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);



  return ReactDOM.createPortal(
    <SkillsDropdownUI
      onClose={handleClose}
      skills={skills}
      isVisible={isVisible}
    />,
    modalRoot as HTMLDivElement
  );
});
