import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { SkillsModalContext } from './SkillsModalContext';

interface SkillsModalProviderProps {
  children: ReactNode;
}

export const SkillsModalProvider: FC<SkillsModalProviderProps> = ({ children }) => {
  const [shouldModalRender, setShouldmodalRender] = useState(false);

  return (
    <SkillsModalContext.Provider value={[shouldModalRender, setShouldmodalRender]}>
      {children}
    </SkillsModalContext.Provider>
  );
};
