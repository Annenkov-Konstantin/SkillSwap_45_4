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
  const testLogin = async () => {
    try {
      // 🎯 ХАРДКОД - тестовые данные для входа
      const credentials = {
        email: '0999999@55555.ru',  // 👈 ТВОЙ ТЕСТОВЫЙ EMAIL
        password: '123456'           // 👈 ТВОЙ ТЕСТОВЫЙ ПАРОЛЬ
      };

      console.log('🚀 Отправляем запрос на вход:', credentials);

      const result = await api.login(credentials);

      console.log('✅ Успешный вход!');
      console.log('📦 Данные пользователя:', result.user);
      console.log('🔑 Токены:', result.tokens);

    } catch (error) {
      console.error('❌ Ошибка входа:', error);
    }
  };

  testLogin();
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
