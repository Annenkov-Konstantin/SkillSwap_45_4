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
import React from 'react';
import  {useState} from 'react';
import { Header } from '../Header/Header';

export type TExample = {
  isSkillsOpen:boolean;
  setIsSkillsOpen:(value:boolean)=>void;
}

export const ExampleComponent: React.FC<TExample> = ({isSkillsOpen, setIsSkillsOpen}) => {
  const userPhoto = './../../../src/images/userPhotoTest.jpg'; // данные из стора
  const userName = 'Мария'; //данные из стора

  const isLogin = true; //данные из стора - для теста поменять на false


  return (
    <div>
      <Header
        userPhoto={userPhoto}
        userName={userName}
        isLogin={isLogin}
        isSkillsOpen={isSkillsOpen}
        setIsSkillsOpen={setIsSkillsOpen}
      />
    </div>
  );
};
