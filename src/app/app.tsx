import './styles/index.module.scss';
import './styles/global.scss';
import '../../src/fonts/font.scss';
import styles from './app.module.scss';
import { IconSprite } from '@/assets/IconSprite'; // спрайт иконок

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SkillsModalProvider } from '@/shared/context/SkillsModalProvider';
import { SkillsModalManager } from '@/features/SkillsModalManager';

import { HomeCatalog } from '@/pages/HomeCatalog';
import { NotFound404 } from '@/pages/NotFound-404';
import { ServerError500 } from '@/pages/ServerError-500';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer';
import { ExampleComponent } from '@/widgets/ExampleComponent';
import { FormProfileUpdate } from '@/widgets/FormProfileUpdate';
import { FormLayout } from '@/widgets/FormLayout/FormLayout';
import { CalendarInput } from '@/shared/ui/dateInputCalendar';

import { FormStepAccountLogin } from '@/widgets/FormRegistration/FormStepAccount/FormStepAccountLogin';
import { FormStepAccountRegistr } from '@/widgets/FormRegistration/FormStepAccount/FormStepAccountRegistr';

// ----Моки хедера для теста
const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
const userName = 'Мария'; // данные из стора
const isLogin = true; // данные из стора — для теста поменять на false
// ---- Моки конец

const App = () => {
  const location = useLocation();

  // Массив путей, на которых не должны отображаться Header и Footer
  const hideHeaderFooterPaths = [
    '/login',
    '/register',
    '/register/account',
    '/register/personal',
    '/register/skill'
  ];

  const showHeaderFooter = !hideHeaderFooterPaths.includes(location.pathname);

  return (
    <SkillsModalProvider>
      <IconSprite />
      <SkillsModalManager />

      {/* Показываем Header только на страницах, где нет FormLayout */}
      {showHeaderFooter && (
        <Header userName={userName} isLogin={isLogin} userPhoto={userPhoto} />
      )}

      <div className={styles.container}>
        <CalendarInput />

        <Routes location={location}>
          {/* Главная страница */}
          <Route path='/' element={<HomeCatalog />} />

          {/* Страница логина — внутри FormLayout */}
          <Route path='/login' element={<FormLayout />}>
            <Route index element={<FormStepAccountLogin />} />
          </Route>

          {/* Страница регистрации шаг 1 — внутри FormLayout */}
          <Route path='/register' element={<FormLayout />}>
            <Route index element={<FormStepAccountRegistr />} />
          </Route>

          {/* Страница регистрации — внутри FormLayout с редиректом 
          <Route path="/register" element={<FormLayout />}>
            {/* Редирект с /register на /register/account 
            <Route index element={<Navigate to="account" replace />} />

            {/* Шаг 1: учётная запись
            <Route
              path="account"
              element={
                <FormStepAccountRegistr
                  passPlaceholder="Придумайте пароль"
                  emailErrorText="Неверный формат email"
                  isFormRegistr={true}
                  registrInfo="Регистрация нового пользователя"
                />
              }
            />

            {/* Заглушки для следующих шагов регистрации 
            <Route path="personal" element={<div>Личные данные (заглушка)</div>} />
            <Route path="skill" element={<div>Навыки (заглушка)</div>} />
          </Route>
*/}
          {/* Другие страницы */}
          <Route path='/error' element={<ServerError500 />} />
          <Route path='/test' element={<ExampleComponent />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {/* Показываем Footer только на страницах, где нет FormLayout */}
        {showHeaderFooter && <Footer />}
      </div>
    </SkillsModalProvider>
  );
};

export default App;
