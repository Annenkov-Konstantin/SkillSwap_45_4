import { useState, useEffect } from 'react';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import type { TAuthForm } from './types';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';

export const FormStepAccountRegistr = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<
    'empty' | 'short' | 'strong'
  >('empty');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки регистрации
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
        <Button status='primary' children='Далее' />
      </div>
    </>
  );
};
