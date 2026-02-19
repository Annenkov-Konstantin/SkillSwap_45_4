import './styles/index.module.scss';
import './styles/global.scss';
import { IconSprite } from '@/assets/IconSprite'; // спрайт иконок

import { Route, Routes, useLocation } from 'react-router-dom';
import { SkillsModalProvider } from '@/shared/context/SkillsModalProvider';
import { SkillsModalManager } from '@/features/SkillsModalManager';

import { HomeCatalog } from '@/pages/HomeCatalog';
import { NotFound404 } from '@/pages/NotFound-404';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer';
import { ExampleComponent } from '@/widgets/ExampleComponent';

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
      <div>
        <Routes location={location}>
          <Route path='/' element={<HomeCatalog />} />
          {/*
        <Route path='/skill/:id' element={<Skill />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register/account' element={<RegisterAccount />} />
        <Route path='/register/personal' element={<RegisterPersonal/>} />
        <Route path='/register/skill' element={<RegisterSkill/>} />
        <Route path='/error' element={<ServerError500/>} />
        */}
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
