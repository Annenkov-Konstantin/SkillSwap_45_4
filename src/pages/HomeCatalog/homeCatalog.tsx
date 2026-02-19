import styles from './homeCatalog.module.scss'
import { useEffect, type FC } from 'react';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userListActions, userListSelectors } from '@slice/userList';
import { Preloader } from '@/shared/ui/preloader';


export const HomeCatalog: FC = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const status = useAppSelector(userListSelectors.selectUserListStatus);

  useEffect(() => {
    fetchGetAllUsers()
  }, []);

  console.log(status)


  return (
    <div className={styles.container}>
    <h1>Главная страница каталога</h1>
    <Preloader
    />
   </div>
  );
};
