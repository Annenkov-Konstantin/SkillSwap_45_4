import React from 'react';
import styles from './preferenceAndSkillWrapper.module.scss';
import { ResetPreferenceButton } from '../resetPreferenceButton';
import { useAppSelector, useDispatchedActions } from '@/services/hooks';
import { filterActions, filterSelectors } from '@slice/filter';
import { ResetSkillButton } from '../resetSkillButton';
import { ResetGenderButton } from '../resetGenderButton';
import { ResetCityButton } from '../resetCityButton/resetCityButton';

export const PreferenceAndSkillWrapper: React.FC
 = (): React.JSX.Element => {

const {
  removeSkill,
  removePreferenceChange,
  removeGenderChange,
  removeCity
} = useDispatchedActions(filterActions);

  const filter = useAppSelector(filterSelectors.selectFilter);

   const handleDeleteSkill = (categoryId: number, skillId: number) => {
    removeSkill({categoryId, skillId})
  };


  return (
    <div className={styles.preferenceAndSkillWrapper}>
       {filter.preferenceFilter.value !== 'all' && (
          <ResetPreferenceButton
            preference={filter.preferenceFilter} // объект
            onPreferenceChange={removePreferenceChange}
          />
        )}
        {filter.skillFilter.length > 0 && (
          <>
            {filter.skillFilter.map((category) => (
              category.skills.map(skill => (
                <ResetSkillButton
                  key={`${category.categoryId}-${skill.id}`}
                  skill={skill}
                  onSkillToggle={()=>handleDeleteSkill(category.categoryId, skill.id)}
                />
              ))
             ))}
          </>
        )}
        {filter.genderFilter.value !== 'any' && (
            <ResetGenderButton
              gender={filter.genderFilter} // объект
              onGenderChange={removeGenderChange}
            />
        )}
        {filter.cityFilter.length > 0 && (
          <>
            {filter.cityFilter.map((city, index) => (
              <ResetCityButton
                key={`${city._id}-${index}`}
                city={city}
                onCityToggle={()=>removeCity(city)}
              />
            ))}
          </>
        )}
    </div>
  );
};
