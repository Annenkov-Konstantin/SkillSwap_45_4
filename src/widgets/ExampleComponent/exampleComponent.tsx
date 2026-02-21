import { useCallback, useState, useEffect } from 'react';
import type { FC } from 'react';
import { UserCard } from '@widgets/UserCard';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userListActions, userListSelectors } from '@slice/userList';
import { skillsActions, skillsSelectors } from '@slice/skills';

import { FilterAside } from '../FilterAside/FilterAside';



export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const { fetchGetAllUsers } = useDispatchedActions(userListActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);
  const usersList = useAppSelector(userListSelectors.selectUserList);
  const skills = useAppSelector(skillsSelectors.selectskills);
  let user = null;

  if (usersList) {
    user = usersList[0];
  }

  useEffect(() => {
    fetchGetAllUsers();
    fetchSkills();
  }, []);

  useEffect(() => {
    console.log('userSkillList:', usersList);
    console.log('skills', skills);
  }, [usersList]);

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24
        }}
      >
        {usersList?.map((user, index) => {
          return (
            <div key={index} style={{ width: 324 }}>
              <UserCard user={user} />
            </div>
          );
        })}
      </div>

      <FilterAside />
    </>
  );
};
