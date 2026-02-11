import { type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger
        onClick={() => setOpen(!open)}
        isOpen={open}
      />
      <Input value={value} onChange={setValue} isSearch={true} />
      <Button status='primary' children='Войти' />
      <Checkbox checked={checked} label='Бизнес и карьера' onChange={setChecked} />
      <Checkbox checked={checked1} label='Творчество и искусство' onChange={setChecked1} />
      <Checkbox checked={checked2} label='Спорт и здоровье' onChange={setChecked2} />
    </div>
  );
};
