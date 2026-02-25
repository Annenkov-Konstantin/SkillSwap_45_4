import { FormStepPersonal } from './FormStepPersonal';
import type { FC } from 'react';
import styles from './registerPersonal.module.scss';
import userInfo from '@/assets/img/userInfo.svg';

export const RegisterPersonal: FC = () => {
 return (
  <div className={styles.container}>
    <FormStepPersonal />
    <div className={styles.section}>
      <img src={userInfo}/>
      <div className={styles.descriptionWrapper}>
        <h2>Расскажите немного о себе</h2>
        <p className={styles.description}>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</p>
      </div>
    </div>
  </div>
 )
}
