import './styles/index.module.scss';
import './styles/global.scss';
import '../../src/fonts/font.scss';
import styles from './app.module.scss'
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

// ----Моки хедера для теста
const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
const userName = 'Мария'; //данные из стора
const isLogin = true; //данные из стора - для теста поменять на false
// ---- Моки конец

const App = () => {
  const location = useLocation();

  return (
    <SkillsModalProvider>
      <IconSprite/>
      <SkillsModalManager/>
      <Header
        userName={userName}
        isLogin={isLogin}
        userPhoto={userPhoto}
      />
      <div className={styles.container}>
        <Routes location={location}>
          <Route path='/' element={<HomeCatalog />} />
          {/*
        <Route path='/skill/:id' element={<Skill />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/profile' element={<Profile />} />
        */}

          {/* Эти роуты должны быть без шапки и футера, которые на всём сайте
          <Route path='/login' element={<FormLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path='/register' element={<FormLayout />}> */}
            {/* Редирект с /register на /register/account (чтобы не было пустой страницы) */}
            {/* <Route index element={<Navigate to="account" replace />} />
            <Route path='account' element={<RegisterAccount />} />
            <Route path='personal' element={<RegisterPersonal />} />
            <Route path='skill' element={<RegisterSkill/>} />
          </Route> */}

          <Route path='/error' element={<ServerError500 />} />
          <Route path='/test' element={<ExampleComponent/>} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        <Footer />
      </div>
    </SkillsModalProvider>
  //  '/ingredients/:id'
  // '/feed/:number'
  );
};

export default App;
