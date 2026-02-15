// import { Button, Input, Card } from '@/shared/ui';
// import  {type FC } from 'react';
// import { useState } from 'react';
// import styles from './exampleComponent.module.scss';
// import { Button, DropdownTrigger } from '@/shared/ui';
// import { Input } from '@/shared/ui';

// export const ExampleComponent: FC = () => {
// const [open, setOpen] = useState(false);
// const [value, setValue] = useState('');

//   return (
//     <div>
//       <p className={styles.test}>Компонент внутри главной страницы</p>
//       <DropdownTrigger
//         onClick={()=>setOpen(!open)}
//         isOpen={open}
//         />
//       <Input value={value} onChange={setValue} isSearch={true}/>
//       <Button status='primary' textInside='Нажать'/>
//     </div>
//   );
// };

import  {useState, type FC } from 'react';
import { HeaderUI } from '../Header';

export const ExampleComponent: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
  const userName = 'Мария'; //данные из стора
  const [isSkillsOpen, setIsSkilsOpen] = useState(false);

  const isLogin = true; //данные из стора - для теста поменять на false

  const handleTriggerClick = () => {
    console.log('Hello'); //заглушка для теста
    setIsSkilsOpen(!isSkillsOpen);
  };

  return (
    <div>
      <HeaderUI
        userPhoto={userPhoto}
        userName={userName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleTriggerClick={handleTriggerClick}
        isSkillsOpen={isSkillsOpen}
        isLogin={isLogin}/>
    </div>
  );
};
