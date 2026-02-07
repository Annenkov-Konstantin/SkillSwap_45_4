import styles from './exampleComponent.module.css';
import { useState, type FC } from 'react';
import skills from '../../../public/db/skills.json';
import { SkillsDropdown } from '@/features/SkillsDropdown';

// Тестовый компонент для разных элементов
// Вставляейте в код ниже и проверяйте реализцию (функционал, визуал )

export const ExampleComponent: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <p className={styles.test}>Компонент внутри главной страницы</p>
        <button onClick= {()=>setShowModal(!showModal)}>{!showModal? 'показать выпадашку':'скрыть'}</button>
      </div>

      { showModal &&
        <SkillsDropdown
          onClose={() => setShowModal(false)}
          skills={skills.categories}
        />
      }
    </>
  );
};
