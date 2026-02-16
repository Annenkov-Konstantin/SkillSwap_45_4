import { useEffect, type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { api } from '@/api';
import users from '../../../public/db/users/users.json'
import type { TSkillData } from '@/api/types';
import type { TUser } from '@/entities/user';
import {SkillSwapModal} from '../SkillSwapModal';

const user = {
    name:"Елизавета Михайловна Xrfkjdf",
};


export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');


// useEffect(() => {
//   const testLike = async () => {
//     const result = await api.updateUserProfileApi(user)
//       console.log('✅ Ответ:', result);
//   };
//   testLike();
// }, []);

// useEffect(() => {
//   const testLike = async () => {
//     const result = await api.getUserApi()
//       console.log('✅ Ответ:', result);
//   };
//   testLike();
// }, []);

// useEffect(() => {
//   const testLike = async () => {
//     const result = await api.addNewUserSkillApi(skill)
//       console.log('✅ Ответ:', result);
//   };
//   testLike();
// }, []);

// useEffect(() => {
//   const testLike = async () => {
//     const result = await api.loginApi({
//       email:'alex1.user1@example.com',
//       password:'123456'})
//       console.log('✅ Ответ:', result);
//   };
//   testLike();
// }, []);

// useEffect(() => {
//   const testLike = async () => {
//     const result = await api.getUserApi()
//       console.log('✅ Ответ:', result);
//   };
//   testLike();
// }, []);


  return (
    <>
      <div>
        <p className={styles.test}>Компонент внутри главной страницы</p>
        <DropdownTrigger
          onClick={() => setOpen(!open)}
          isOpen={open}
        />
      </div>
      <div>
      {name}
      </div>
      <SkillSwapModal />
    </>
  );
}
