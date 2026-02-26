import type { FC } from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { SkillsDropdown } from '@/features';
import { SkillsModalContext } from '@/shared/context/SkillsModalContext';

import skills from '../../../public/db/skills/skills.json';

export const SkillsModalManager:FC = () => {
  const {shouldModalRender, setShouldmodalRender} = useContext(SkillsModalContext);
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);

  // рефы на таймеры
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

   // Cleanup всех таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleSkillsModalClose = () => {
    setSkillModalVisible(false)

     // Отменяем возможный включенный open timer
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    // Отменяем предыдущий close timer
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

     // Запускаем новый таймер на размонтирование
    closeTimerRef.current = window.setTimeout(() => {
      setShouldmodalRender(false);
      closeTimerRef.current = null;
    }, 200);
  };

  useEffect(() => {
    if (shouldModalRender) {
      // Отменяем возможный включенный close timer
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      // Отменяем предыдущий open timer
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }

      // Запускаем новый таймер на показ
      openTimerRef.current = window.setTimeout(() => {
        setSkillModalVisible(true);
        openTimerRef.current = null;
      }, 10);

    }
  }, [shouldModalRender]);


 useEffect(() => {
  if (shouldModalRender) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
  return () => {
    document.body.classList.remove('modal-open');
  };
}, [shouldModalRender]);

  return (
    <>
      { shouldModalRender &&
        <SkillsDropdown
          skills={skills}
          isVisible={isSkillModalVisible}
          onClose={handleSkillsModalClose}
        />
      }
    </>
  );
}
