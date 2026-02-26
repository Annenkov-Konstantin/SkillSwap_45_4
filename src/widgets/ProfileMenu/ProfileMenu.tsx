import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { NavLink } from 'react-router-dom';
import styles from './ProfileMenu.module.scss';
import type { IPMItem } from './type';
import { Button } from '@/shared/ui';
import { deleteCookie } from '@/shared/lib/utils/cookie';
import { useDispatchedActions } from '@/services/hooks';
import { userActions } from '@/services/slices/user';
import { AppRoutes } from '@/shared/lib/constants';

const sidebarItems: IPMItem[] = [
  {
    to: '/my-orders',
    icon: 'request',
    text: 'Заявки',
  },
  {
    to: '/my-swap',
    icon: 'message-text',
    text: 'Мои обмены'
  },
  {
    to: AppRoutes.Favourites,
    icon: 'like',
    text: 'Избранное'
  },
  {
    to: '/my-skills',
    icon: 'idea',
    text: 'Мои навыки',
    strokeIcon: true
  },
  {
    to: '/profile',
    icon: 'user',
    text: 'Личные данные'
  }
];



const getIconColor = (strokeIcon: boolean) => {
  return strokeIcon
    ? { fill: 'none', stroke: '#253017' }
    : { fill: '#253017', stroke: 'none' };
};

export const ProfileMenu: React.FC = () => {

  const {clearUser} = useDispatchedActions(userActions)

  const handleClick = ()=>{
    localStorage.removeItem('refresh_token');
    deleteCookie('access_token');
    clearUser()
  }


  return (
    <div className={styles.aside}>
      <nav
        aria-label='Боковая панель профиля пользователя'
        className={styles.sidebar}
      >
        {sidebarItems.map((item) => {
          const { fill, stroke } = getIconColor(item.strokeIcon || false);
          return (
            <NavLink key={item.to} to={item.to} className={styles.link} end>
              {({ isActive }) => (
                <span
                  className={`${styles.linkContent} ${isActive ? styles.linkActive : ''}`}
                >
                  <Icon
                    name={`icon-${item.icon}`}
                    size={24}
                    fill={fill}
                    stroke={stroke}
                    aria-hidden='true'
                  />
                  <span className={styles.sidebarLinkText}>{item.text}</span>
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className={styles.button_wrapper}>
        <Button
        onClick={handleClick}
        status={'primary'}
        children={'Выход'}
        type={'button'}
        />
      </div>
   </div>
  );
};
