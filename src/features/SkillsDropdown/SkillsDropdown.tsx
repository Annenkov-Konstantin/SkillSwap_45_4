import { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';
import type { TModalProps } from './type';
import { SkillsDropdownUI } from './SkillsDropdownUI';

const modalRoot = document.getElementById('modals');

export const SkillsDropdown: FC<TModalProps> = memo(({ onClose, skills }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Обработка закрытия с анимацией
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Время должно совпадать с duration анимации
  };

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
    }, 10); // Небольшая задержка для запуска анимации

    return () => clearTimeout(timer);
  }, []);

  return ReactDOM.createPortal(
    <SkillsDropdownUI
      onClose={handleClose}
      skills={skills}
      isVisible={isVisible}
    ></SkillsDropdownUI>,
    modalRoot as HTMLDivElement
  );
});
