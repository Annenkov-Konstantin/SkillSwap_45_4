import { useEffect, useState, type FC } from 'react';
import type { SkillCard } from '../lib/types';
import type { Filters, TSkillFilter } from '@/widgets/FilterAside/types';
import type { TSkill } from '@/entities/skills';

export const useCardFilters =(skillSwapList:SkillCard[]) => {

  const [skillFilter, setSkillFilter] = useState<TSkillFilter>({});

  const handleSkillToggle = (categoryId: number, skill: TSkill) => {
    setSkillFilter(prev => {
      const currentSkills = prev[categoryId] || [];
      const skillExists = currentSkills.some(s => s.id === skill.id);

      const newSkillFilterCopy = { ...prev };//копия объекта (новая ссылка)!

      if (skillExists) {
        //копия массива скилов (новая ссылка) иначе реакт не увидит разницы!
        const updatedSkillArray = currentSkills.filter(s => s.id !== skill.id);
        if (updatedSkillArray.length === 0) {
          delete newSkillFilterCopy[categoryId];
        } else {
          // присваиваем новому обьекту с новым массивом новое значение (удаление элемента)
          newSkillFilterCopy[categoryId] = updatedSkillArray;
        }
      } else {
        // присваиваем новому массиву новый элемнт (добавление скила)
        newSkillFilterCopy[categoryId] = [...currentSkills, skill];
      }

      return newSkillFilterCopy
      ;
    });
  }

  const checkSkillExist = (categoryId: number, skillId: number):boolean=> {
    if (!skillFilter[categoryId]) return false;
    return skillFilter[categoryId].some(s => s.id === skillId);
  }

  const resetFilterButtonContent = () =>{

  }
  return ({
    handleSkillToggle,
    checkSkillExist,
    skillFilter
  })
}
