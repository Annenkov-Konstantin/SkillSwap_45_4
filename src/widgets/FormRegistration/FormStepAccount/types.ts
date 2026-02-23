export type TAuthForm = {
  passPlaceholder: string;
  emailErrorText?: string;
  passwordChange: (value: string) => void;
  emailChange: (value: string) => void;
  passValue: string;
  emailValue: string;
  emailError?: boolean;
  passwordError?: boolean;
  isFormRegistr: boolean;
  registrInfo: string;
  getPasswordHint?: () => React.ReactNode;
};
