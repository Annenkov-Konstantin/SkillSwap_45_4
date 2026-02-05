import styles from './home.module.css';
import type {FC} from 'react';
import { useEffect } from 'react';
import { ExampleComponent } from '@/widgets/ExampleComponent';

export const Home: FC = () => {

  return (
    <main>
      <div>
        <h1 className={styles.heading}>
          Главная страница
        </h1>
        <ExampleComponent/>
      </div>
    </main>
  );
};
