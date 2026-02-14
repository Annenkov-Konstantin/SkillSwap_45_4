import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TModalProps } from './type';
import { SkillsDropdownUI } from './SkillsDropdownUI';

const modalRoot = document.getElementById('modals');

export const SkillsDropdown: FC<TModalProps> = memo(({ onClose, skills }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        handleClose();
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
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // Обработка закрытия с анимацией
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return ReactDOM.createPortal(
    <SkillsDropdownUI
      onClose={handleClose}
      skills={skills}
      isVisible={isVisible}
    ></SkillsDropdownUI>,
    modalRoot as HTMLDivElement
  );
});
