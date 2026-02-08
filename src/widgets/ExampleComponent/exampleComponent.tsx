// import { Button, Input, Card } from '@/shared/ui';
import  {type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';

export const ExampleComponent: FC = () => {
const [open, setOpen] = useState(false);
const [value, setValue] = useState('');

  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger
        onClick={()=>setOpen(!open)}
        isOpen={open}
        />
      <Input value={value} onChange={setValue} isSearch={true}/>
      <Button status='primary' textInside='Нажать'/>
    </div>
  );
};
