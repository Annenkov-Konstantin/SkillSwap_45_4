// Стили и UI
import './styles/index.module.scss';
import './styles/global.scss';
import '../../src/fonts/font.scss';
import styles from './app.module.scss';
import { IconSprite } from '@/assets/IconSprite'; // спрайт иконок

// Роутинг
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

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
import { ExampleComponent } from '@/widgets/ExampleComponent';
import { FormProfileUpdate } from '@/widgets/FormProfileUpdate';
import { FormLayout } from '@/widgets/FormLayout/FormLayout';
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
// ----Моки хедера для теста
const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
const userName = 'Мария'; //данные из стора
const isLogin = true; //данные из стора - для теста поменять на false
// ---- Моки конец

const App = () => {
  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const { fetchCity } = useDispatchedActions(cityActions);
  const location = useLocation();

  useEffect(() => {
      Promise.all([
        fetchSkills(),
        fetchGetAllUsers(),
        fetchUserListSkills(),
        fetchCity()
      ]).catch((error) => {
        console.error('Один из запросов упал:', error);
      });
    }, []);

  const LayoutWithShell = () => (
    <>
      <Header userName={userName} userPhoto={userPhoto} isLogin={isLogin} />
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
      <Routes>
        <Route element={<LayoutWithShell />}>
          <Route path='/' element={<HomeCatalog />} />
          {/* <Route path='/skill/:id' element={<Skill />} /> */}
          {/* <Route
            path='/favorites'
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
          <Route path='/error' element={<ServerError500 />} />
          <Route path='*' element={<NotFound404 />} />

          <Route path='/test' element={<ExampleComponent />} />
        </Route>

        {/* <Route path='/login' element={<FormLayout />}>
          <Route
            index
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
        </Route> */}

        {/* <Route path='/register' element={<FormLayout />}>
          <Route index element={<Navigate to='account' replace />} />
          <Route
            path='account'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <RegisterAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path='personal'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <RegisterPersonal />
              </ProtectedRoute>
            }
          />
          <Route
            path='skill'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <RegisterSkill />
              </ProtectedRoute>
            }
          />
        </Route> */}
      </Routes>
    </SkillsModalProvider>
  );
};

export default App;
