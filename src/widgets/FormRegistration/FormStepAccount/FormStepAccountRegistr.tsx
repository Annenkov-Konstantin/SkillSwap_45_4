import { useState, useEffect } from 'react';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import type { TAuthForm } from './types';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';

const LOCAL_STORAGE_REGISTR_KEY = 'registrationFormEmail';

export const FormStepAccountRegistr = () => {
  const [emailValue, setEmailValue] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_REGISTR_KEY) || ''
  );

  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<
    'empty' | 'short' | 'strong'
  >('empty');

  // Убрала useEffect — сохранение будет только при submit
  // Сохраняем данные в localStorage при их изменении
  //useEffect(() => {
  // if (emailValue) {
  //   localStorage.setItem(LOCAL_STORAGE_REGISTR_KEY, emailValue);
  // } else {
  // Если email пустой, удаляем из localStorage
  //   localStorage.removeItem(LOCAL_STORAGE_REGISTR_KEY);
  //  }
  // }, [emailValue]);

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError(!validateEmail(newValue));
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassValue(newPassword);
    const status = checkPasswordLengthStatus(newPassword);
    setPasswordStatus(status);
    setPasswordError(status !== 'strong');
  };

  const getPasswordHint = () => {
    switch (passwordStatus) {
      case 'empty':
        return (
          <p className={styles.hintNormal}>
            Пароль должен содержать не менее 8 знаков
          </p>
        );
      case 'short':
        return (
          <p className={styles.hintNormal}>
            Пароль должен содержать не менее 8 знаков
          </p>
        );
      case 'strong':
        return <p className={styles.hintStrong}>Надёжный</p>;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Здесь будет логика отправки регистрации что-то типо этого из userSlice
    // await registerUser({ email: emailValue, password: passValue });
    // Формируем объект с данными для отправки
    const registrationData = {
      email: emailValue,
      password: passValue
    };
    console.log(registrationData);
    try {
      // Отправляем объект в API
      //await registerUser(registrationData);

      if (emailValue) {
        localStorage.setItem(LOCAL_STORAGE_REGISTR_KEY, emailValue);
      }
      console.log('Пользователь зарегистрирован');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div className={styles.formBackground}>
      <FormStepAccountUI
        passPlaceholder='Придумайте пароль'
        emailErrorText='Неверный формат email'
        passValue={passValue}
        emailValue={emailValue}
        emailError={emailError}
        passwordError={passwordError}
        isFormRegistr={true}
        registrInfo='Регистрация нового пользователя'
        getPasswordHint={getPasswordHint}
        emailChange={handleEmailChange}
        passwordChange={handlePasswordChange}
      />
      <div className={styles.formButton}>
        <Button status='primary' children='Далее' onClick={handleSubmit} />
      </div>
    </div>
  );
};
