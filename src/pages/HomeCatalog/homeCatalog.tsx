// Реакт
import { useEffect, type FC } from 'react';
import { shallowEqual } from 'react-redux';
// Стили и UI
import styles from './homeCatalog.module.scss';
import { Preloader } from '@/shared/ui/preloader';
import { PreferenceAndSkillWrapper } from '@/shared/ui/preferenceAndSkillWrapper';
// Виджеты
import { FilterAside } from '@/widgets/FilterAside/FilterAside';

// Хуки и утилиты
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { requestStatus } from '@/shared/lib/constants';

// Сторы и селекторы
import { userListActions, userListSelectors } from '@slice/userList';
import { userSkillListActions, userSkillListSelectors } from '@slice/userSkillList';
import { skillsActions } from '@slice/skills';
import { cityActions } from '@/services/slices/city';


export const HomeCatalog: FC = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  // const cards = useAppSelector(selectSwapCards, shallowEqual);
  const userListRequestStatus  = useAppSelector(userListSelectors.selectUserListStatus);
  const userSkillListRequestStatus  = useAppSelector(userSkillListSelectors.selectUserSkillListStatus);
  const isLoading =
    userListRequestStatus === requestStatus.LOADING ||
    userSkillListRequestStatus === requestStatus.LOADING;


   useEffect(() => {
    fetchSkills()
    .then(()=>fetchGetAllUsers())
    .then(()=>fetchUserListSkills())
    .then(()=>fetchCity())
  }, [])



  return (
    <div className={styles.container}>
      <FilterAside/>
      {/* {/*Пример отображения выбранных Предпочтений и Скиллов */}
        <div className={styles.filter_buttons}>
          <PreferenceAndSkillWrapper/>
        </div>
      {isLoading? <Preloader  radius={70}/>: <div className={styles.main_content}>Здесь будет лютый контент</div>}
   </div>
  );
};
