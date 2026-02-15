import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';

import googleIcon from '../../../assets/icons/google.svg';
import appleIcon from '../../../assets/icons/apple.svg';

import styles from './FormStepAccount.module.scss';

import type { TAuthForm } from './types';

import { useState } from 'react';

export const FormStepAccount: FC<TAuthForm> = ({
  passPlaceholder,
  emailErrorText,
  passwordChange,
  emailChange,
  passValue,
  emailValue,
  emailError,
  passwordError,
  isFormRegistr,
  registrInfo
}) => {

  const handleEmailChange = (newValue: string) => {
    emailChange(newValue); // вызываем пропс с новым значением
  };

  const handlePasswordChange = (newPassword: string) => {
    passwordChange(newPassword); // вызываем пропс с новым паролем
  };

  return (
    <form className={styles.formContainer}>
      {/* Кнопки «Продолжить с Google» и «Продолжить с Apple» */}
      <Button
        status='form_button_disabled'
        children={
          <>
            <img className={styles.buttonSvg} src={googleIcon} alt='Google' />
            Продолжить с Google
          </>
        }
      />

      <Button
        status='form_button_disabled'
        children={
          <>
            <img className={styles.buttonSvg} src={appleIcon} alt='Apple' />
            Продолжить с Apple
          </>
        }
      />

      {/* Разделитель «или» */}
      <div className={styles.separator}>
        <span>или</span>
      </div>

      {/* Поле ввода Email */}
      <div>
        <label htmlFor='email'>Email</label>
        <Input
          type='email'
          placeholder='Введите email'
          value={emailValue}
          onChange={handleEmailChange}
          error={emailError}
          errorText={emailErrorText || ''}
          name='email'
        />
      </div>

      {/* Инпут для пароля */}
      <div>
        <label htmlFor='password'>Пароль</label>
        <Input
          type='password'
          placeholder={passPlaceholder}
          value={passValue}
          onChange={handlePasswordChange}
          error={passwordError}
          errorText=''
          name='password'
        />
      </div>
      {
      isFormRegistr && !passwordError &&
      <p>{registrInfo}</p>
      }
    </form>
  );
};
