import './styles/index.module.scss';
import './styles/global.scss';

import { Route, Routes, useLocation } from 'react-router-dom';
import { SkillsModalProvider } from '@/shared/context/SkillsModalProvider';
import { SkillsModalManager } from '@/features';

import { HomeCatalog } from '@/pages/HomeCatalog';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer';
import { useState } from 'react';

// ----Моки хедера для теста
const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
const userName = 'Мария'; //данные из стора
const isLogin = true; //данные из стора - для теста поменять на false
// ---- Моки конец

const App = () => {
  const location = useLocation();

  return (
   <SkillsModalProvider>
    <Header
        userName={userName}
        isLogin={isLogin}
        userPhoto={userPhoto}
    />
    <SkillsModalManager/>
    <div>
      <Routes location={location}>
        <Route path='/' element={<HomeCatalog />} />
        {/* <Route path='/skill/:id' element={<Skill />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register/account' element={<RegisterAccount />} />
        <Route path='/register/personal' element={<RegisterPersonal/>} />
        <Route path='/register/skill' element={<RegisterSkill/>} />
        <Route path='/error' element={<ServerError500/>} /> */}
        <Route path='/test' element={<HomeCatalog/>} />
      </Routes>
      <Footer />
    </div>
  </SkillsModalProvider>
  //  '/ingredients/:id'
  // '/feed/:number'
  );
};

export default App;
