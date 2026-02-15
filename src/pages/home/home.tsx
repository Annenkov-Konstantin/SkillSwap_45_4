import styles from './home.module.css';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ExampleComponent } from '@/widgets/ExampleComponent';
import { Footer } from '@/widgets/Footer';
import { SkillsDropdown } from '@/features';
import skills from '../../../public/db/skills/skills.json';

export const Home: FC = () => {
   const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const handleSkillsModalClose = () => {
    setIsSkillsOpen(false);  // принудительное закрытие
  };

  useEffect(() => {
  if (isSkillsOpen) {
    // Блокируем скролл
    document.body.style.overflow = 'hidden';
  } else {
    // Разблокируем
    document.body.style.overflow = 'unset';
  }

  // Обязательно очищаем при размонтировании
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isSkillsOpen]);

  return (
    <>
      <div>
      




      </div>
      <SkillsDropdown
        skills={skills}
        isVisible={isSkillsOpen}
        onClose={handleSkillsModalClose}
      />
    </>

  );
};
