import { useState } from 'react';
import { FormStepAccountUI } from './FormStepAccountUI';
import { Button } from '../../../shared/ui/button';
import {
  validateEmail,
  checkPasswordLengthStatus
} from '@/shared/lib/utils/formValidation';

import styles from './FormStepAccount.module.scss';
import { useDispatchedActions } from '@/services/hooks';
import { formActions } from '@/services/slices/form';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/lib/constants';

const LOCAL_STORAGE_REGISTR_KEY = 'registrationFormEmail';

export const FormStepAccountRegistr:React.FC = () => {
  const navigate = useNavigate();
  const { setfirstStepForm }= useDispatchedActions(formActions)
  const [emailValue, setEmailValue] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_REGISTR_KEY) || ''
  );
  const [passValue, setPassValue] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<
    'empty' | 'short' | 'strong'
  >('empty');

  const isDisabled= emailError || passValue.length<8 ?'primary_disabled':'primary';

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
    const registrationData = {
      email: emailValue,
      password: passValue
    };
    if (emailValue) {
        localStorage.setItem(LOCAL_STORAGE_REGISTR_KEY, emailValue);
    }
    setfirstStepForm(registrationData);
    navigate(AppRoutes.RegPersonal);
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
        getPasswordHint={getPasswordHint}
        emailChange={handleEmailChange}
        passwordChange={handlePasswordChange}
      />
      <div className={styles.formButton}>
        <Button status={isDisabled} children='Далее' onClick={handleSubmit} />
      </div>
    </div>
  );
};
