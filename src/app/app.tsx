// Стили и UI
import './styles/index.module.scss';
import './styles/global.scss';
import '../../src/fonts/font.scss';
import styles from './app.module.scss';
import { IconSprite } from '@/assets/IconSprite'; // спрайт иконок

// Роутинг
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/shared/lib/constants';

// Контекст
import { SkillsModalProvider } from '@/shared/context/SkillsModalProvider';
import { SkillsModalManager } from '@/features/SkillsModalManager';

// Страницы
import { HomeCatalog } from '@/pages/HomeCatalog';
import { NotFound404 } from '@/pages/NotFound-404';
import { ServerError500 } from '@/pages/ServerError-500';
// Виджеты
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer';
import { FormProfileUpdate } from '@/widgets/FormProfileUpdate';
import { FormLayout } from '@/widgets/FormLayout/FormLayout';
import { FormStepAccountLogin } from '@/pages/FormRegistration/FormStepAccount/FormStepAccountLogin';
import { FormStepAccountRegistr } from '@/pages/FormRegistration/FormStepAccount/FormStepAccountRegistr';

// Защита маршрутов
import { ProtectedRoute } from '@features/index';
// Хуки
import { useEffect } from 'react';
import { useDispatchedActions } from '@/services/hooks';
// Сторы
import { userListActions } from '@/services/slices/userList';
import { userSkillListActions } from '@/services/slices/userSkillList';
import { skillsActions } from '@/services/slices/skills';
import { cityActions } from '@/services/slices/city';
import { userActions } from '@/services/slices/user';
import { FormStepPersonalUI } from '@/pages/FormRegistration/FormStepPersonal/FormStepPersonalUI';
import { FormStepPersonal } from '@/pages/FormRegistration/FormStepPersonal/FormStepPersonal';
import { RegisterPersonal } from '@/pages/FormRegistration/FormStepPersonal/registerPersonal';


const App = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const { fetchUserApi, authUser } = useDispatchedActions(userActions);
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

  useEffect(() => {
    Promise.all([
      fetchSkills(),
      fetchGetAllUsers(),
      fetchUserListSkills(),
      fetchCity(),
      fetchUserApi()
    ]).catch((error) => {
      console.error('Один из запросов упал:', error);
    }).finally(() => authUser())
  }, []);

  const LayoutWithShell = () => (
    <>
      <Header />
      <IconSprite />
      <SkillsModalManager />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );

  return (
    <SkillsModalProvider>
      <IconSprite />
      <SkillsModalManager />

      {/* Показываем Header только на страницах, где нет FormLayout */}
      {showHeaderFooter && <Header />}

      <div className={styles.container}>
        <Routes location={location}>
          {/* Главная страница и страница навыка - доступна всем */}
          <Route path={AppRoutes.HomeCatalog} element={<HomeCatalog />} />
          <Route path={AppRoutes.RegSkill} element={<div>Навыки (заглушка)</div>} />

          {/* Страницы логина и регистрации - ТОЛЬКО для неавторизованных */}
          <Route element={<ProtectedRoute isPublic />}>
            <Route path={AppRoutes.Login} element={<FormLayout />}>
              <Route index element={<FormStepAccountLogin />} />
            </Route>

            <Route path={AppRoutes.RegistrationLayout} element={<FormLayout />}>
              <Route index element={<Navigate to={AppRoutes.RegAccount} replace />} />
              <Route path={AppRoutes.RegAccount} element={<FormStepAccountRegistr />} />
              <Route path={AppRoutes.RegPersonal} element={<RegisterPersonal />} />
            </Route>
          </Route>

          {/* Профиль - ТОЛЬКО для авторизованных */}
          <Route element={<ProtectedRoute />}>
            {/* Здесь будут защищенные маршруты, например: */}
            <Route path={AppRoutes.Profile} element={<div>Профиль пользователя</div>} />
            <Route path={AppRoutes.Settings} element={<div>Настройки</div>} />
          </Route>

          {/* Другие страницы - доступны всем */}
          <Route path={AppRoutes.Error} element={<ServerError500 />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {/* Показываем Footer только на страницах, где нет FormLayout */}
        {showHeaderFooter && <Footer />}
      </div>
    </SkillsModalProvider>
  );
};

export default App;
