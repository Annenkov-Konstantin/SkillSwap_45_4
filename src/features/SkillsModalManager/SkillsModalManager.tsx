import type { FC } from 'react';
import { useState, useEffect, useContext } from 'react';
import { SkillsDropdown } from '@/features';
import { SkillsModalContext } from '@/shared/context/SkillsModalContext';

import skills from '../../../public/db/skills/skills.json';

export const SkillsModalManager:FC = () => {
  const [shouldModalRender, setShouldmodalRender] = useContext(SkillsModalContext);
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);

  const handleSkillsModalClose = () => {
    setSkillModalVisible(false)
    const timer = setTimeout(()=>{
      setShouldmodalRender(false);
    }, 200)
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (shouldModalRender) {
      setTimeout(() => {
        setSkillModalVisible(true);
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
