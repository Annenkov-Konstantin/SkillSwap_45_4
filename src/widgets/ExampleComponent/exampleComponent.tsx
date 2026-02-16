import { useEffect, type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { api } from '@/api';
import users from '../../../public/db/users/users.json';
import type { TSkillData } from '@/api/types';
import type { TUser } from '@/entities/user';
import { FormStepAccount } from '@widgets/FormRegistration/FormStepAccount';

const user = {
  name: 'Елизавета Михайловна Xrfkjdf'
};

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFormRegistr, setIsFormRegistr] = useState(false); // true - регистрация, false - вход

  // useEffect(() => {
  //   const testLike = async () => {
  //     const result = await api.updateUserProfileApi(user)
  //       console.log('✅ Ответ:', result);
  //   };
  //   testLike();
  // }, []);

  // useEffect(() => {
  //   const testLike = async () => {
  //     const result = await api.getUserApi()
  //       console.log('✅ Ответ:', result);
  //   };
  //   testLike();
  // }, []);

  // useEffect(() => {
  //   const testLike = async () => {
  //     const result = await api.addNewUserSkillApi(skill)
  //       console.log('✅ Ответ:', result);
  //   };
  //   testLike();
  // }, []);

  // useEffect(() => {
  //   const testLike = async () => {
  //     const result = await api.loginApi({
  //       email:'alex1.user1@example.com',
  //       password:'123456'})
  //       console.log('✅ Ответ:', result);
  //   };
  //   testLike();
  // }, []);

  // useEffect(() => {
  //   const testLike = async () => {
  //     const result = await api.getUserApi()
  //       console.log('✅ Ответ:', result);
  //   };
  //   testLike();
  // }, []);
  const handleEmailChange = (value: string) => {
    setEmailValue(value);
    // Здесь будет логика проверки email
    if (value === 'petrov@mail.ru') {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    // Здесь будет логика проверки пароля
    // Ошибка пароля только для режима входа и только для конкретного значения
    if (!isFormRegistr && value === 'qwerty') {
      setPasswordError(true);
      setEmailError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <>
      <div>
        {/* Кнопки для переключения режима (для тестирования) */}
        {/* Кнопки для переключения режима */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => {
              setIsFormRegistr(true);
              setEmailValue('');
              setPasswordValue('');
              setEmailError(false);
              setPasswordError(false);
            }}
          >
            Регистрация
          </button>
          <button
            onClick={() => {
              setIsFormRegistr(false);
              setEmailValue('');
              setPasswordValue('');
              setEmailError(false);
              setPasswordError(false);
            }}
          >
            Вход
          </button>
        </div>

        <p className={styles.test}>Компонент внутри главной страницы</p>
        <DropdownTrigger onClick={() => setOpen(!open)} isOpen={open} />
        <FormStepAccount
          passPlaceholder={
            isFormRegistr ? 'Придумайте надёжный пароль' : 'Введите ваш пароль'
          }
          passwordChange={handlePasswordChange}
          emailChange={handleEmailChange}
          passValue={passwordValue}
          emailValue={emailValue}
          emailError={emailError}
          passwordError={passwordError}
          isFormRegistr={isFormRegistr}
          registrInfo='Пароль должен содержать не менее 8 знаков'
          emailErrorText={emailError ? 'Email уже используется' : undefined}
        />
      </div>
      <div>{name}</div>
    </>
  );
}
