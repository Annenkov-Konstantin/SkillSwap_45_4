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


export const HomeCatalog: FC = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const cards = useAppSelector(selectSwapCards, shallowEqual);

  useEffect(() => {
    fetchSkills()
    fetchGetAllUsers()
    fetchUserListSkills()

  }, [])


  return (
    <div className={styles.container}>
    <h1>Главная страница каталога</h1>
    {/* <Preloader
    /> */}
    {/* <FilterAside/> */}
   </div>
  );
};
