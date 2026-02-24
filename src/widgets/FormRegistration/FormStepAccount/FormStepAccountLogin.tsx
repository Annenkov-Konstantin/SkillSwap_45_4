import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import type { TAuthForm } from './types';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';

const LOCAL_STORAGE_EMAIL_KEY = 'loginFormEmail';

export const FormStepAccountLogin = () => {
  const [emailValue, setEmailValue] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY) || ''
  );
  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();

  // Сохраняем email в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, emailValue);
  }, [emailValue]);

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError(!validateEmail(newValue));
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassValue(newPassword);
    const status = checkPasswordLengthStatus(newPassword);
    setPasswordError(status === 'empty');
  };

  const handleSubmit = async () => {
    // Здесь будет логика отправки логина. код отправки данных на сервер. надо взять из userSlice? что-то типо
    //await loginUser({ email: emailValue, password: passValue });
    // Формируем объект с данными для отправки
    const loginData = {
      email: emailValue,
      password: passValue
    };
    console.log(loginData);
    try {
      // Отправляем объект в API (пример с userSlice)
      //await loginUser(loginData);
      // После успешного логина — очищаем email из localStorage
      localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
      console.log('Успешный логин, очищаем localStorage');
    } catch (error) {
      console.error('Ошибка логина:', error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.formBackground}>
      <FormStepAccountUI
        passPlaceholder='Введите пароль'
        emailErrorText='Неверный формат email'
        passValue={passValue}
        emailValue={emailValue}
        emailError={emailError}
        passwordError={passwordError}
        isFormRegistr={false}
        registrInfo='Вход пользователя'
        getPasswordHint={() => null}
        emailChange={handleEmailChange}
        passwordChange={handlePasswordChange}
      />
      <div className={styles.formButton}>
        <Button status='primary' children='Войти' onClick={handleSubmit} />
        <button
          type='button'
          className={styles.registerButton}
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
