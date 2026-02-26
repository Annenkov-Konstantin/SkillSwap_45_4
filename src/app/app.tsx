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
import { Skill } from '@/pages/Skill';
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
import { FormStepSkill } from '@/pages/FormRegistration/FormStepSkill';
import { Profile } from '@/pages/Profile';
import { FavouritesCollection } from '@/widgets/Favourites';


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
    }).finally(() => authUser());
  }, []);

  return (
    <SkillsModalProvider>
      {/* Единый спрайт и менеджер */}
      <IconSprite />
      <SkillsModalManager />

      {/* Хедер для всех страниц кроме форм */}
      {showHeaderFooter && <Header />}

      <div className={styles.container}>
        <Routes location={location}>
          {/* Публичные страницы */}
          <Route path={AppRoutes.HomeCatalog} element={<HomeCatalog />} />
          <Route path={AppRoutes.Skill} element={<Skill />} />

          {/* Страницы только для неавторизованных */}
          <Route element={<ProtectedRoute isPublic />}>
            <Route path={AppRoutes.Login} element={<FormLayout />}>
              <Route index element={<FormStepAccountLogin />} />
            </Route>
            <Route path={AppRoutes.Skill} element={<Skill/>} />

            <Route path={AppRoutes.RegistrationLayout} element={<FormLayout />}>
              <Route index element={<Navigate to={AppRoutes.RegAccount} replace />} />
              <Route path={AppRoutes.RegAccount} element={<FormStepAccountRegistr />} />
              <Route path={AppRoutes.RegPersonal} element={<RegisterPersonal />} />
              <Route path={AppRoutes.RegSkill} element={<FormStepSkill />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path={AppRoutes.Profile} element={<Profile />}>
              <Route index element={<FormProfileUpdate/>}/>
              <Route path={AppRoutes.Favourites} element={<FavouritesCollection/>}/>
            </Route>
          </Route>

          {/* Страницы ошибок */}
          <Route path={AppRoutes.Error} element={<ServerError500 />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>

      {/* Футер для всех страниц кроме форм */}
      {showHeaderFooter && <Footer />}
    </SkillsModalProvider>
  );
};

export default App;
