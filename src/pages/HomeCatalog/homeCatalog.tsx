// Реакт
import { useEffect, useState, type FC } from 'react';
import { shallowEqual } from 'react-redux';
// Стили и UI
import styles from './homeCatalog.module.scss';
import { Preloader } from '@/shared/ui/preloader';
import { PreferenceAndSkillWrapper } from '@/shared/ui/preferenceAndSkillWrapper';
// Виджеты
import { FilterAside } from '@/widgets/FilterAside/FilterAside';
// Хуки и утилиты
import {  useAppSelector } from '@store-hooks';
import { requestStatus } from '@/shared/lib/constants';
// Сторы и селекторы
import { userListSelectors } from '@slice/userList';
import {userSkillListSelectors } from '@slice/userSkillList';
import { UserCard } from '@/widgets/UserCard';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { useCardFilters } from '@/shared/hooks/cardFilters';
import { filterSelectors } from '@/services/slices/filter';
import { SortButtonButton } from '@/shared/ui/sortButton/sortButton';

import { SortSwapList } from '@/widgets/SortSwapList';
import {MainRecommendationList} from '@widgets/MainRecomendationList';
import { useLocation, useNavigate } from 'react-router-dom';
import { SkillSwapModal } from '@/widgets/SkillSwapModal';
import { SkillActionModal } from '@/widgets/skillActionModal';
import { Icon } from '@/shared/ui/Icon';

export const HomeCatalog: FC = () => {
  const [show, setShow] = useState(false);
  const userListRequestStatus  = useAppSelector(userListSelectors.selectUserListStatus);
  const userSkillListRequestStatus  = useAppSelector(userSkillListSelectors.selectUserSkillListStatus);
  const isFilterActive = useAppSelector(filterSelectors.selectActiveFilter);
  const isLoading =
    userListRequestStatus === requestStatus.LOADING ||
    userSkillListRequestStatus === requestStatus.LOADING;
  const navigate= useNavigate();
  const location = useLocation();
  const state = location.state;

  //исходный массив
  const cards = useAppSelector(selectSwapCards, shallowEqual);

  // отфильтрованный массив (только для фильтров)
  const filteredCards  = useCardFilters(cards);

  const handleClose = ()=> {
    setShow(false)
  }

   useEffect(() => {
  if (state?.success) {
    setShow(true);
    navigate(location.pathname, {
      replace: true,
      state: {}
    });
  }
}, [state]);

  return (
  <div className={styles.container}>
      {show && <SkillActionModal
      image= {<Icon name={'icon-Done'} size={100} stroke="#253017" fill={'none'}/>}
      maintText='Важе предложение создано'
      secondaryText='Теперь вы можете предложить обмен'
      primaryBtnText= 'Готово'
      onClose={handleClose}
      isOpen={show}
      />}
    <FilterAside />
    {!isFilterActive && (
      <>
      <SortSwapList
      type='popular'
      />
      <SortSwapList
      type='new'
      />
      <MainRecommendationList />
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
