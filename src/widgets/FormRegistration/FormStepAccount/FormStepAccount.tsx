import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';

import googleIcon from '../../../assets/icons/google.svg';
import appleIcon from '../../../assets/icons/apple.svg';

import styles from './FormStepAccount.module.scss';

import type { TAuthForm } from './types';
import { useState, useEffect } from 'react';

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
  const [passwordLengthStatus, setPasswordLengthStatus] = useState<
    'empty' | 'short' | 'strong'
  >('empty');

  // Проверяем длину пароля при каждом изменении
  useEffect(() => {
    if (isFormRegistr) {
      if (!passValue) {
        setPasswordLengthStatus('empty');
      } else if (passValue.length < 8) {
        setPasswordLengthStatus('short');
      } else {
        setPasswordLengthStatus('strong');
      }
    }
  }, [passValue, isFormRegistr]);

  const handleEmailChange = (newValue: string) => {
    emailChange(newValue); //  новый email
  };

  const handlePasswordChange = (newPassword: string) => {
    passwordChange(newPassword); // новый пароль
  };

  // Определяем какую подсказку показать для пароля в режиме регистрации
  const getPasswordHint = () => {
    if (!isFormRegistr) return null;

    switch (passwordLengthStatus) {
      case 'empty':
        return (
          <p className={styles.hintNormal}>
            Пароль должен содержать не менее 8 знаков
          </p>
        );
      case 'short':
        return (
          <p className={styles.hintNormal}>
            Пароль должен содержать не менее 8 знаков
          </p>
        );
      case 'strong':
        return <p className={styles.hintStrong}>Надёжный</p>;
      default:
        return null;
    }
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

      {/* Инпут для Email */}
      <div className={styles.inputGroup}>
        <label htmlFor='email'>Email</label>
        <Input
          type='email'
          placeholder='Введите email'
          value={emailValue}
          onChange={handleEmailChange}
          error={emailError}
          errorText=''
          name='email'
        />
        {isFormRegistr && emailError && emailErrorText && (
          <p className={styles.hintError}>{emailErrorText}</p>
        )}
      </div>

      {/* Инпут для пароля */}
      <div className={styles.inputGroup}>
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

        {/* Контейнер для подсказок пароля */}
        <div className={styles.passwordHints}>
          {/* Подсказки для режима регистрации */}
          {isFormRegistr && getPasswordHint()}

          {/* Подсказка для режима входа при ошибке */}
          {!isFormRegistr && (passwordError || emailError) && (
            <p className={styles.hintError}>
              Email или пароль введён неверно. Пожалуйста проверьте правильность
              введённых данных
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
