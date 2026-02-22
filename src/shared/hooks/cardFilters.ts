import { useMemo, useState, type FC } from 'react';
import type { SkillCard } from '../lib/types';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { filterActions, filterSelectors } from '@/services/slices/filter';
import { GENDER_OPTIONS, PREFERENCE_OPTIONS } from '@/widgets/FilterAside/types';
import { skillsListAdapter } from '../lib/utils/skillsListAdapter';
import { skillsSelectors } from '@/services/slices/skills';

export const useCardFilters =(skillSwapList:SkillCard[]) => {
  const filters = useAppSelector(filterSelectors.selectFilter);
  const skillsStore = useAppSelector(skillsSelectors.selectskills);

  const GENDER_MAP = {
   'female': 'женский',
    'male':'мужской',
    'any':''
  }

 // Мемоизированная фильтрация карточек по текущим фильтрам из стора
  const filteredCards = useMemo(() => {
    return skillSwapList.filter(card => {
      // 1. Фильтр по полу
      if (filters.genderFilter.value !== GENDER_OPTIONS[0].value &&
        card.user.gender !== GENDER_MAP[filters.genderFilter.value])
        return false;

      // 2. Фильтр по предпочтениям
      if (filters.preferenceFilter.value !== PREFERENCE_OPTIONS[0].value &&
        card.skill.type !== filters.preferenceFilter.value)
        return false;

      // 3. Фильтр по навыкам
      if (filters.skillFilter.length > 0) {
        const hasMatchingSkill = filters.skillFilter.some(category =>
          category.categoryId === card.skill.category &&
          category.skills.some(skill => skill.id === card.skill.subCategory)
        );
        if (!hasMatchingSkill) return false;
      }

      // 4. Фильтр по городам
      if (filters.cityFilter.length > 0) {
        const hasSelectedCity = filters.cityFilter.some(city =>
          city.name === card.user.location
        );
        if (!hasSelectedCity) return false;
      }

      // 4. Фильтр по городам
      if (filters.searchFilter !== '') {
        const searchTarget = filters.searchFilter;
        const hasMatchBaseFields =
          card.user.gender.includes(searchTarget.toLocaleLowerCase())||
          card.user.location.includes(searchTarget)||
          card.skill.title.includes(searchTarget)

        let matchesCategoryOrSkill = false;
        if (skillsStore){
        const categoryInfo = skillsStore.find(item => item.id === card.skill.category);
        if( categoryInfo ){
          const userSkillsToLearn = skillsListAdapter(
            [{
              category:card.user.toLearn[0].category,
              subcategory: card.user.toLearn[0].subcategory
            }],
             skillsStore);
          const userSkillsCanTeach = skillsListAdapter(
            [{
              category:card.user.canTeach[0].category,
              subcategory: card.user.canTeach[0].subcategory
            }],
             skillsStore);

          matchesCategoryOrSkill =
            categoryInfo.category.includes(searchTarget) ||
            userSkillsToLearn.some(item=> item.subCategory.includes(searchTarget))||
            userSkillsCanTeach.some(item=> item.subCategory.includes(searchTarget))
          }
        }
        if (!hasMatchBaseFields && !matchesCategoryOrSkill) {
        return false;
  }
      }
        return true
      });
    }, [skillSwapList, filters, skillsStore]);

    // Возвращаем только отфильтрованный массив
    return filteredCards;
  };
