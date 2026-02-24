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
import {
  userSkillListActions,
  userSkillListSelectors
} from '@slice/userSkillList';
import { skillsActions } from '@slice/skills';
import { cityActions } from '@/services/slices/city';
import { UserCard } from '@/widgets/UserCard';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { useCardFilters } from '@/shared/hooks/cardFilters';
import { filterSelectors } from '@/services/slices/filter';
import { SortButtonButton } from '@/shared/ui/sortButton/sortButton';

import { SortSwapList } from '@/widgets/SortSwapList';

export const HomeCatalog: FC = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const userListRequestStatus  = useAppSelector(userListSelectors.selectUserListStatus);
  const userSkillListRequestStatus  = useAppSelector(userSkillListSelectors.selectUserSkillListStatus);
  const isFilterActive = useAppSelector(filterSelectors.selectActiveFilter);
  const isLoading =
    userListRequestStatus === requestStatus.LOADING ||
    userSkillListRequestStatus === requestStatus.LOADING;

  useEffect(() => {
    Promise.all([
      fetchSkills(),
      fetchGetAllUsers(),
      fetchUserListSkills(),
      fetchCity()
    ]).catch((error) => {
      console.error('Один из запросов упал:', error);
    });
  }, []);

  const cards = useAppSelector(selectSwapCards, shallowEqual);



  const filteredCards  = useCardFilters(cards); // отфильтрованный массив
  // console.log(filteredCards)

  return (
  <div className={styles.container}>
    <FilterAside />
    {!isFilterActive && (
      <>
      <SortSwapList
      type='popular'
      />
      <SortSwapList
      type='new'
      />
      </>
    )}
    {isFilterActive && (
      <>
        <div className={styles.filter_buttons}>
          <PreferenceAndSkillWrapper />
        </div>
        {isLoading ? (
          <Preloader radius={70} />
        ) : (
          <div className={styles.main_content}>
             <div className={styles.main_heading}>
              <h1>Подходящие предложения: <span className={styles.heading_counter}>{filteredCards.length}</span></h1>
              <SortButtonButton/>
              </div>
            {filteredCards.map((card, index) => (
              <UserCard
                key={index}
                user={card.user}
                swap={card.skill}
              />
            ))}
          </div>
        )}
      </>
    )}
  </div>
);
}
