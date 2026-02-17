import { useState } from 'react';
import type { FC } from 'react';

import { FilterAsideUI } from '../FilterAside';
import skills from '../../../public/db/skills/skills.json';
import city from '../../../public/db/city/city.json';
import type { Filters } from '../FilterAside/types';

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');


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
        onReset={() => {}}
        onPreferenceChange={() => {}}
        onGenderChange={() => {}}
        onCityToggle={() => {}}
        onSkillToggle={() => {}}
        onCategoryToggle={() => {}}
        onCategorySkillsToggle={() => {}}
        onShowAllCategoriesToggle={() => {}}
        onShowAllCitiesToggle={() => {}}
        getCategoryCheckState={() => ({ checked: false, indeterminate: true })}
      />
    </>
  );
}
