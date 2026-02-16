import { SkillSelect } from '@/features/SkillSelect';
import styles from './homeCatalog.module.scss';
import type { FC } from 'react';
import { Select } from '@/shared/ui';

const options = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'Английский' },
  { value: 'de', label: 'Немецкий' },
  { value: 'fr', label: 'Французский' },
  { value: 'es', label: 'Испанский' }
];

export const HomeCatalog: FC = () => {

  return (
    <>
    <h1>Главная страница</h1>
    <SkillSelect
      optionsArr={['Миша','Петя','Коля','Дима']}
      placeholderValue='Имя'
    />


<Select
  options={options}
  placeholder="Выберите язык"
  label="Язык интерфейса"
  onChange={(value) => console.log('Selected:', value)}
/>
    </>
  );
};
