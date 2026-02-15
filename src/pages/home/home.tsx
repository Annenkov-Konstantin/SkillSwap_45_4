import styles from './home.module.css';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ExampleComponent } from '@/widgets/ExampleComponent';
import { Footer } from '@/widgets/Footer';

export const Home: FC = () => {
  return (
    <main>
      <div>
        {/* <h1 className={styles.heading}>Главная страница</h1> */}
        <ExampleComponent />
        {/* <Footer /> */}
      </div>
    </main>
  );
};
