import { type ICitySelectUI } from './type';
import styles from './CitySelect.module.scss';

export const CitySelectUI = ({ children }: ICitySelectUI) => {
  return <div className={styles.container}>{children}</div>;
};
