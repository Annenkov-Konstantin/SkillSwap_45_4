import { useLocation, useNavigate } from "react-router-dom";
import { FormLayoutUI } from "./FormLayoutUI";

export const FormLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalSteps = 3;
  let currentStep = 1;

  //проверяем, на какой странице находимся
  const isRegister = location.pathname.includes("/register");
  const isLogin = location.pathname.includes("/login");

  //устанавливаем номер шага в зависимости от страницы регистрации
  if (isRegister) {
    if (location.pathname.includes('personal')) currentStep = 2;
    if (location.pathname.includes('skill')) currentStep = 3;
  }

  const onClose = () => {
    navigate('/');
  }

  return (
    <FormLayoutUI
      onClose={onClose}
      isLogin={isLogin}
      isRegister={isRegister}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
 )
}
