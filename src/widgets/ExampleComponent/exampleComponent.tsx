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

  const demoFilters: Filters = {
    preferenceFilter: 'all',
    skillFilter: [],
    genderFilter: 'any',
    cityFilter: []
  };

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
        {name}
      </div>
      <FilterAsideUI
        filters={demoFilters}
        selectedCount={2}
        cityArray={city}
        skillArray={skills}
        openCategories={[1]}
        showAllCategories={false}
        showAllCities={true}
        onReset={() => { }}
        onPreferenceChange={() => { }}
        onGenderChange={() => { }}
        onCityToggle={() => { }}
        onSkillToggle={() => { }}
        onCategoryToggle={() => { }}
        onCategorySkillsToggle={() => { }}
        onShowAllCategoriesToggle={() => { }}
        onShowAllCitiesToggle={() => { }}
        getCategoryCheckState={() => ({ checked: false, indeterminate: true })}
      />
    </>
  );
};
