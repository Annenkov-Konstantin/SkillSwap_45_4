// import { Button, Input, Card } from '@/shared/ui';
import  {type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { DropdownTrigger } from '@/shared/ui';

export const ExampleComponent: FC = () => {
const [open, setOpen] = useState(false);
  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger
        onClick={()=>setOpen(!open)}
        isOpen={open}
        />
      <button className={styles.btn}>asdasd</button>
    </div>
  );
};
