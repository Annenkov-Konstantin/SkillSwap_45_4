import { useEffect, type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { api } from '@/api';
import users from '../../../public/db/users/users.json'



export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

useEffect(() => {
    const testUpdate = async () => {
      try {
        // 🎯 ХАРДКОД - тестовые данные пользователя
        const testUserData = {

          name: 'Сережа',
          email: 'test@example.com',
          location: 'Москва',
          dateofbirth: '1990-01-01',  // 👈 snake_case!
          gender: 'мужицкий',
          aboutme: 'Это тестовый профиль'  // 👈 snake_case!
        };

        console.log('🚀 Отправляем тестовые данные:', testUserData);

        const result = await api.updateUserProfile(testUserData);

        console.log('✅ Результат обновления:', result);
        console.log('📦 Обновленные данные:', result.data);

      } catch (error) {
        console.error('❌ Ошибка:', error);
      }
    };

    testUpdate();
  }, []); // Запускается один раз при монтировании


  return (
    <>
      <div>
        <p className={styles.test}>Компонент внутри главной страницы</p>
        <DropdownTrigger
          onClick={() => setOpen(!open)}
          isOpen={open}
        />
      </div>
      <div>
      {name}
      </div>
    </>
  );
};
