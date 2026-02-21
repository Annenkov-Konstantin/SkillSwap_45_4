import { useCallback, useState, useEffect } from 'react';
import type { FC } from 'react';

import { FilterAside } from '../FilterAside/FilterAside';



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

  return <FilterAside />;
};
