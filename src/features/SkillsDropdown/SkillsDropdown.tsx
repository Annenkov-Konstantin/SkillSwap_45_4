import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TModalProps } from './type';
import { SkillsDropdownUI } from './SkillsDropdownUI';

const modalRoot = document.getElementById('modals');

export const SkillsDropdown: FC<TModalProps> = memo(({ skills, isVisible, onClose }) => {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Анимация появления при монтировании
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 10); // Небольшая задержка для запуска анимации

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible)
    return null

  return ReactDOM.createPortal(
    <SkillsDropdownUI
      onClose={onClose}
      skills={skills}
      isVisible={isVisible}
    ></SkillsDropdownUI>,
    modalRoot as HTMLDivElement
  );
});
