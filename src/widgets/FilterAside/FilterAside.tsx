import React, { useEffect, useState } from 'react';
import { FilterAsideUI } from './FilterAsideUI';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { skillsSelectors, skillsActions } from '@slice/skills';
import { filterSelectors, filterActions } from '@slice/filter';
import { citySelectors, cityActions } from '@/services/slices/city';
import { useCardFilters } from '@/shared/hooks/cardFilters';
import { shallowEqual } from 'react-redux';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import type { TFilters, TSkillFilter } from './types';
import type { GenderOption, PreferenceOption} from '@/widgets/FilterAside/types';
import type { TSkill } from '@/entities/skills';


export const FilterAside:React.FC = () => {
  const city = useAppSelector(citySelectors.selectCity);
  const skills = useAppSelector(skillsSelectors.selectskills);
  const filter = useAppSelector(filterSelectors.selectFilter);
  const { toggleSkill } = useDispatchedActions(filterActions);

  const [isCategoryOpen, setCategoryOpen] = useState<number[]>([]);


  const handleSkillToggle = (categoryId: number, skill: TSkill) => {
    toggleSkill({ categoryId, skill })
  }

  const checkSkillExist = (categoryId: number, skillId: number):boolean=> {
    const category = filter.skillFilter.find(item => item.categoryId === categoryId);
    return category ? category.skills.some(s => s.id === skillId) : false;
  }


  const handleCategoryToggle = (id:number)=>{
    setCategoryOpen(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev,id]
      }
    })
 }

  return (
      <FilterAsideUI
        filters={filter}
        selectedCount={4}
        cityArray={city?city:[]}
        skillArray={skills?skills:[]}
        openCategories={isCategoryOpen}
        showAllCategories={true}
        showAllCities={false}
        onReset={() => {}}
        onPreferenceChange={() => {}}
        onGenderChange={() => {}}
        onCityToggle={() => {}}
        onSkillToggle={handleSkillToggle}
        onCheckSkillExist={checkSkillExist}
        onCategoryToggle={handleCategoryToggle}
        onCategorySkillsToggle={() => {}}
        onShowAllCategoriesToggle={() => {}}
        onShowAllCitiesToggle={() => {}}
      />
  );
}
