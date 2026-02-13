import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';

import googleIcon from '../../../assets/icons/google.svg';
import appleIcon from '../../../assets/icons/apple.svg';

import styles from './FormStepAccount.module.scss';

import { useState } from 'react';

export const FormStepAccount: FC = () => {
  const [value, setValue] = useState(''); // email
  const [password, setPassword] = useState(''); // пароль

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (newValue: string) => {
    setValue(newValue);
    // Валидация email: минимум 3 символа
    setEmailError(newValue.length < 3 && newValue.length > 0);
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    // Валидация пароля: минимум 6 символов
    setPasswordError(newPassword.length < 6);
  };

  const handleGoogleLogin = () => {
    // Логика авторизации через Google (например, редирект или вызов API)
    console.log('Авторизация через Google...');
  };

  const handleAppleLogin = () => {
    // Логика авторизации через Apple
    console.log('Авторизация через Apple...');
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
          pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          placeholder='Введите email'
          value={value}
          onChange={handleEmailChange}
          error={emailError}
          errorText='Слишком коротко (минимум 3 символа)'
          name='email-input'
        />
      </div>

      {/* Инпут для пароля */}
      <div>
        <label htmlFor='password'>Пароль</label>
        <Input
          type='password'
          placeholder='Введите ваш пароль'
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          errorText='Пароль слишком короткий (минимум 6 символов)'
          name='password-input'
        />
      </div>

      {/* Кнопка «Далее» */}
      <div className={styles.buttonNextWrapper}>
        <Button status='primary' children='Далее' />
      </div>
    </form>
  );
};
