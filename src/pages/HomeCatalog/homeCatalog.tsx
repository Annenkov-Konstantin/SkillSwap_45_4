import styles from './homeCatalog.module.scss'
import { useEffect, type FC } from 'react';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userListActions, userListSelectors } from '@slice/userList';
import { userSkillListActions, userSkillListSelectors } from '@slice/userSkillList';
import { skillsActions } from '@slice/skills';
import { Preloader } from '@/shared/ui/preloader';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { shallowEqual } from 'react-redux';
import { FilterAside } from '@/widgets/FilterAside/FilterAside';
import { FormStepPersonalUI } from '@/widgets/FormRegistration/FormStepPersonal/FormStepPersonalUI';
import { PreferenceAndSkillWrapper } from '@/shared/ui/preferenceAndSkillWrapper';
import { ResetPreferenceButton } from '@/shared/ui/resetPreferenceButton';
import { ResetSkillButton } from '@/shared/ui/resetSkillButton';
import { filterSelectors, filterActions } from '@slice/filter';
import { fetchCity } from '@/services/thunk';
import { cityActions } from '@/services/slices/city';



export const HomeCatalog: FC = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const { removeSkill } = useDispatchedActions(filterActions);
  const cards = useAppSelector(selectSwapCards, shallowEqual);
  const filter = useAppSelector(filterSelectors.selectFilter);

  const handleDeleteSkill = (categoryId: number, skillId: number) => {
    removeSkill({categoryId, skillId})
  };

  useEffect(() => {
    fetchSkills()
    fetchGetAllUsers()
    fetchUserListSkills()
    fetchCity()
  }, [])


  return (
    <div className={styles.container}>
      <FilterAside/>
      {/* {/*Пример отображения выбранных Предпочтений и Скиллов */}
        <div className={styles.filter_buttons}><PreferenceAndSkillWrapper
            preferenceResetButton={
              filter.preferenceFilter.value !== 'all' ? (
                <ResetPreferenceButton
                  preference={filter.preferenceFilter} // объект
                  onPreferenceChange={() => {}}
                />
              ) : null
            }
            skillResetButton={
              filter.skillFilter.length > 0 ? (
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
              ) : null
            }
          />
        </div>
      <div className={styles.main_content}>Здесь будет лютый контент</div>
   </div>
  );
};
