import { useState } from 'react';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import type { TAuthForm } from './types';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';

export const FormStepAccountLogin = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError(!validateEmail(newValue));
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassValue(newPassword);
    const status = checkPasswordLengthStatus(newPassword);
    setPasswordError(status === 'empty');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки логина
  };

  return (
    <>
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
        <Button status='primary' children='Войти' />
        <Button status='secondary' children='Зарегистрироваться' />
      </div>
    </>
  );
};
