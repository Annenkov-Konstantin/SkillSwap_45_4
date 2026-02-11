import { type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';

import { CitySelect } from '@features/CitySelect';

import cities from '../../../public/db/city/city.json';

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <div>
        <CitySelect someList={cities} />

      </div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger onClick={() => setOpen(!open)} isOpen={open} />
      <Input value={value} onChange={setValue} isSearch={true} />
      <Button status='primary' children='Войти' />
    </div>
  );
};
