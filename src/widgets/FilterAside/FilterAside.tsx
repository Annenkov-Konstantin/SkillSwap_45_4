import React, { useEffect, useState } from 'react';
import { FilterAsideUI } from './FilterAsideUI';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { skillsSelectors, skillsActions } from '@slice/skills';
import { citySelectors, cityActions } from '@/services/slices/city';
import { useCardFilters } from '@/shared/hooks/cardFilters';
import { shallowEqual } from 'react-redux';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import type { Filters } from './types';

const INITIAL_VISIBLE_CATEGORIES = 5;
const INITIAL_VISIBLE_CITIES = 5;


export const FilterAside:React.FC = () => {
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const city = useAppSelector(citySelectors.selectCity);
  const skills = useAppSelector(skillsSelectors.selectskills);
  const cards = useAppSelector(selectSwapCards, shallowEqual);

  const {
    handleSkillToggle,
    checkSkillExist,
    skillFilter
  } = useCardFilters (cards)

  const [isCategoryOpen, setCategoryOpen] = useState<number[]>([]);

  useEffect(() => {
    fetchSkills()
    fetchCity()
  }, [fetchSkills, fetchCity])


  const handleCategoryToggle = (id:number)=>{
    setCategoryOpen(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev,id]
      }
    })
 }

 const demoFilters:Filters = {
  preferenceFilter: 'all',
  skillFilter:skillFilter,
  genderFilter: 'any',
  cityFilter: []
};
console.log (demoFilters.skillFilter)

  return (
      <FilterAsideUI
        filters={demoFilters}
        selectedCount={4}
        cityArray={city?city:[]}
        skillArray={skills?skills:[]}
        openCategories={isCategoryOpen}
        showAllCategories={false}
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
