import { type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import { SkillDetails } from '../SkillDetails/SkillDetails';
import { FormStepAccount } from '../FormRegistration/FormStepAccount';

const images = [
  'https://i.pinimg.com/1200x/9a/35/00/9a35001136e00e4f6ba6d16125077886.jpg',
  'https://i.pinimg.com/736x/f8/b1/08/f8b108f138b66a1cb0ba23fe1855dc1f.jpg',
  'https://i.pinimg.com/736x/27/0b/27/270b279865a032e1cff0e2adb6feed97.jpg',
  'https://i.pinimg.com/736x/9d/2a/13/9d2a13cddf643a68f3523c3fc08cf6e5.jpg',
  'https://i.pinimg.com/736x/50/14/47/5014470afdcf62d6824807ba22d22228.jpg'
];

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [Evalue, setEValue] = useState('');
  const [Pvalue, setPValue] = useState('');


  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger onClick={() => setOpen(!open)} isOpen={open} />
      <Input value={value} onChange={setValue} isSearch={true} />
      <Button status='primary' children='Войти' />

      <SkillDetails
        title={'Разработка веб-приложений на React'}
        images={images}
        categoryId={1}
        skillId={1}
        description={
          'Научу создавать современные SPA-приложения с использованием React, TypeScript и современных инструментов разработки.'
        }
      />
      <FormStepAccount
      passPlaceholder = 'введи пароль'
      passwordChange={setPValue}
      emailChange={setEValue}
      emailValue={Evalue}
      passValue={Pvalue}
      isFormRegistr={true}
      registrInfo='надежный/Пароль должен содержать не менее 8 знаков'
      />
    </div>
  );
};
