import React, { useEffect, useState } from 'react';
import { FilterAsideUI } from './FilterAsideUI';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { skillsSelectors, skillsActions } from '@slice/skills';
import { citySelectors, cityActions } from '@/services/slices/city';
import { useCardFilters } from '@/shared/hooks/cardFilters';
import { shallowEqual } from 'react-redux';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import type { Filters, TSkillFilter } from './types';
import type { GenderOption, PreferenceOption} from '@/widgets/FilterAside/types';
import type { TSkill } from '@/entities/skills';

const INITIAL_VISIBLE_CATEGORIES = 5;
const INITIAL_VISIBLE_CITIES = 5;


export const FilterAside:React.FC = () => {
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const city = useAppSelector(citySelectors.selectCity);
  const skills = useAppSelector(skillsSelectors.selectskills);
  const cards = useAppSelector(selectSwapCards, shallowEqual);

  const [isCategoryOpen, setCategoryOpen] = useState<number[]>([]);
  const [skillFilter, setSkillFilter] = useState<TSkillFilter[]>([]);
  const [preferenceFilter, setPreferenceFilter] = useState<PreferenceOption>({label:'Всё', value: 'all'});
  const [genderFilter, setGenderFilter] = useState<GenderOption>({label:'Не имеет значения', value:'any'});

  useEffect(() => {
    fetchSkills()
    fetchCity()
  }, [fetchSkills, fetchCity]);

  const handleSkillToggle = (categoryId: number, skill: TSkill) => {
    setSkillFilter(prev => {
      const prevMap = new Map(prev.map(item => [item.categoryId, item.skills]));//копия мапы (новая ссылка)!
      const currentSkills = prevMap.get(categoryId) || [];
      const skillExists = currentSkills.some(s => s.id === skill.id);

      if (skillExists) {
        //копия массива скилов (новая ссылка) иначе реакт не увидит разницы!
        const updatedSkillArray = currentSkills.filter(s => s.id !== skill.id);
        if (updatedSkillArray.length === 0) {
          prevMap.delete(categoryId);
        } else {
          // присваиваем новой мапе с новым массивом новое значение (удаление элемента)
           prevMap.set(categoryId, updatedSkillArray);
        }
      } else {
        // присваиваем новому массиву новый элемнт (добавление скила)
         prevMap.set(categoryId, [...currentSkills, skill]);
      }
      return Array.from(prevMap.entries()).map(([catId, skills]) => ({
        categoryId:catId,
        skills
      }));
    });
  }

  const checkSkillExist = (categoryId: number, skillId: number):boolean=> {
    const category = skillFilter.find(item => item.categoryId === categoryId);
    return category ? category.skills.some(s => s.id === skillId) : false;
  }

  const resetFilterButtonContent = () =>{

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

 const demoFilters:Filters = {
  preferenceFilter: preferenceFilter,
  skillFilter:skillFilter,
  genderFilter: genderFilter,
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
