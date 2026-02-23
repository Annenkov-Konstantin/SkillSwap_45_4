import React, { useState } from 'react';
import { FilterAsideUI } from './FilterAsideUI';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';
import { filterSelectors, filterActions } from '@slice/filter';
import { citySelectors } from '@/services/slices/city';
import type { GenderOption, PreferenceOption} from '@/widgets/FilterAside/types';
import type { TSkill } from '@/entities/skills';
import type { TCity } from '@/entities/city';


export const FilterAside:React.FC = () => {
  const city = useAppSelector(citySelectors.selectCity);
  const skills = useAppSelector(skillsSelectors.selectskills);
  const filter = useAppSelector(filterSelectors.selectFilter);
  const {
    toggleSkill,
    preferenceChange,
    genderChange,
    cityChange,
    clearFilter
  } = useDispatchedActions(filterActions);

  const [isCategoryOpen, setCategoryOpen] = useState<number[]>([]);
  const [isAllCategoriesOpen, setAllCategoriesOpen] = useState<boolean>(false);
  const [isAllCitiesOpen, setAllCitiesOpen] = useState<boolean>(false);

  // Ручки для инпутов
  const handleSkillToggle = (categoryId: number, skill: TSkill) => {
    toggleSkill({ categoryId, skill })
  }
  const handlePreferenceChange = (pref:PreferenceOption)=> {
    preferenceChange(pref)
  }
  const handleGenderChange = (gender:GenderOption)=> {
    genderChange(gender)
  }

  const handleCityChange = (city:TCity) => {
    cityChange(city)
  }

  const handleClearFilter = () => {
    clearFilter()
  }


  //True/false для чекбоксов и радиокнопок
  const checkSkillExist = (categoryId: number, skillId: number):boolean=> {
    const category = filter.skillFilter.find(item => item.categoryId === categoryId);
    return category ? category.skills.some(s => s.id === skillId) : false;
  }
  const checkPreferenceExist = (pref:PreferenceOption):boolean=> {
    return filter.preferenceFilter.value === pref.value
  }
  const checkGenderExist = (gender:GenderOption):boolean=> {
    return filter.genderFilter.value === gender.value
  }
  const checkCityExist = (city:TCity):boolean=> {
    return filter.cityFilter.some(item => item._id === city._id);
  }



  //Показать/скрыть категории
  const handleCategoryToggle = (id:number)=>{
    setCategoryOpen(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev,id]
      }
    })
  }

  const handleShowAllCategories = () => {
   setAllCategoriesOpen(!isAllCategoriesOpen)
  }

  const handleShowAllCities = () => {
   setAllCitiesOpen(!isAllCitiesOpen)
  }

  const countActiveFilters = (): number => {
    let activeCount = 0;
    if (filter.preferenceFilter.value !== 'all') {
      activeCount++;
    }
    if (filter.genderFilter.value !== 'any') {
      activeCount++;
    }
    filter.skillFilter.forEach(category=>
      activeCount+= category.skills.length
    )
    activeCount += filter.cityFilter.length;
    return activeCount;
  };

  return (
      <FilterAsideUI
        selectedCount={countActiveFilters()}
        cityArray={city?city:[]}
        skillArray={skills?skills:[]}
        openCategories={isCategoryOpen}
        showAllCategories={isAllCategoriesOpen}
        showAllCities={isAllCitiesOpen}
        onReset={handleClearFilter}
        onPreferenceChange={handlePreferenceChange}
        onGenderChange={handleGenderChange}
        onCityToggle={handleCityChange}
        onSkillToggle={handleSkillToggle}
        onCheckPreferenceExist={checkPreferenceExist}
        onCheckSkillExist={checkSkillExist}
        onCheckGenderExist={checkGenderExist}
        onCheckCityExist={checkCityExist}
        onCategoryToggle={handleCategoryToggle}
        onCategorySkillsToggle={() => {}}
        onShowAllCategoriesToggle={handleShowAllCategories}
        onShowAllCitiesToggle={handleShowAllCities}
      />
  );
}
