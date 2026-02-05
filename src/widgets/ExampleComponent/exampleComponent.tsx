// import { Button, Input, Card } from '@/shared/ui';
import type { FC } from 'react';
import styles from './exampleComponent.module.css';



export const ExampleComponent: FC = () => {

  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>

    </div>
  );
};
