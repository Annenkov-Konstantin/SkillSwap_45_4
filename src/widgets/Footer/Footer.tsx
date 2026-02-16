import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo } from '@/shared/ui';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.footerLogoWrapper}>
        <Logo />
        <p className={styles.copyright}>SkillSwap — 2026</p>
      </div>
      <ul className={styles.footerLinksGroup}>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            О проекте
          </NavLink>
        </li>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            Все навыки
          </NavLink>
        </li>
      </ul>
      <ul className={styles.footerLinksGroup}>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            Контакты
          </NavLink>
        </li>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            Блок
          </NavLink>
        </li>
      </ul>
      <ul className={styles.footerLinksGroup}>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            Политика конфиденциальности
          </NavLink>
        </li>
        <li>
          <NavLink to='#' className={styles.footerLink}>
            Пользовательское соглашение
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
