import React from 'react';
import { Icon } from '../../shared/ui/Icon';
import { NavLink } from 'react-router-dom';
import styles from './ProfileMenu.module.scss';
import type { IPMItem } from './type';

const sidebarItems: IPMItem[] = [
  {
    to: '/',
    icon: 'request',
    text: 'Заявки'
  },
  {
    to: '/exchanges',
    icon: 'message-text',
    text: 'Мои обмены'
  },
  {
    to: '/favorites',
    icon: 'like',
    text: 'Избранное'
  },
  {
    to: '/skills',
    icon: 'idea',
    text: 'Мои навыки',
    strokeIcon: true
  },
  {
    to: '/user',
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
  return (
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
  );
};
