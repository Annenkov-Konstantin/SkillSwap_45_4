import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';
import { useAppSelector, useDispatchedActions } from '@/services/hooks';
import { userActions, userSelectors } from '@/services/slices/user';

const LOCAL_STORAGE_EMAIL_KEY = 'loginFormEmail';

export const FormStepAccountLogin = () => {
  const errorMessage = useAppSelector(userSelectors.selectUserError);
  const {fetchLoginApi, clearError} = useDispatchedActions(userActions);
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY) || ''
  );
  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);



  // Сохраняем email в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, emailValue);
  }, [emailValue]);

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError(!validateEmail(newValue));
    if (errorMessage) {
      clearError();
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassValue(newPassword);
    const status = checkPasswordLengthStatus(newPassword);
    setPasswordError(status === 'empty');
    if (errorMessage) {
      clearError();
    }
  };

  const handleSubmit = async () => {
    // Формируем объект с данными для отправки
    const loginData = {
      email: emailValue,
      password: passValue
    };
    try {
       await fetchLoginApi(loginData).unwrap()
      .then(()=>{
      localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY)
      navigate('/', { replace: true });
    })
    } catch (error) {
      console.error('Ошибка логина:', error);
    }
  };

  useEffect(()=>{
    return()=>{ clearError();}
  },[])

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
        errorInfo={errorMessage}
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
