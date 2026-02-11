import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import type { FC } from 'react';

export const Logo: FC = () => (
  <Link to='/' className={styles.logo}>
    <div className={styles.icon} role='img' aria-label='Логотип SkillSwap' />
    <span className={styles.text}>SkillSwap</span>
  </Link>
);
