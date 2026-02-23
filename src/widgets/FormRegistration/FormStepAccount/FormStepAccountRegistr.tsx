import { useState, useEffect } from 'react';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import type { TAuthForm } from './types';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';

const LOCAL_STORAGE_REGISTR_KEY = 'registrationFormData';

export const FormStepAccountRegistr = () => {
  const storedData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_REGISTR_KEY) || '{}'
  );
  const [emailValue, setEmailValue] = useState<string>(storedData.email || '');
  const [passValue, setPassValue] = useState<string>(storedData.password || '');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<
    'empty' | 'short' | 'strong'
  >('empty');

  // Сохраняем данные в localStorage при их изменении
  useEffect(() => {
    const dataToSave = {
      email: emailValue,
      password: passValue
    };
    localStorage.setItem(LOCAL_STORAGE_REGISTR_KEY, JSON.stringify(dataToSave));
  }, [emailValue, passValue]);

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
    // При отправке регистрации очищаем localStorage (пользователь завершил процесс)
    localStorage.removeItem(LOCAL_STORAGE_REGISTR_KEY);
    console.log('submit');
    // Здесь будет логика отправки регистрации что-то типо этого из userSlice
    // await registerUser({ email: emailValue, password: passValue });
  };

  return (
    <>
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
    </>
  );
};
