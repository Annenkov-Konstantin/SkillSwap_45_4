import { SkillSelect } from '@/features/SkillSelect';
import styles from './homeCatalog.module.scss';
import type { FC } from 'react';


export const HomeCatalog: FC = () => {

  return (
    <>
    <h1>Главная страница</h1>
    <SkillSelect
      optionsArr={['Миша','Петя','Коля','Дима']}
      placeholderValue='Имя'
    />
    </>
  );
};
