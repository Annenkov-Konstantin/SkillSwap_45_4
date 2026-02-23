import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';

import googleIcon from '../../../assets/icons/google.svg';
import appleIcon from '../../../assets/icons/apple.svg';

import styles from './FormStepAccount.module.scss';

import type { TAuthForm } from './types';

export const FormStepAccountUI: FC<TAuthForm> = ({
  passPlaceholder,
  emailErrorText,
  passwordChange,
  emailChange,
  passValue,
  emailValue,
  emailError,
  passwordError,
  isFormRegistr,
  registrInfo,
  getPasswordHint
}) => {
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
          onChange={emailChange}
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
          onChange={passwordChange}
          error={passwordError}
          errorText=''
          name='password'
        />

        {/* Контейнер для подсказок пароля */}
        <div className={styles.passwordHints}>
          {/* Подсказки для режима регистрации */}
          {isFormRegistr && getPasswordHint?.()}

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
