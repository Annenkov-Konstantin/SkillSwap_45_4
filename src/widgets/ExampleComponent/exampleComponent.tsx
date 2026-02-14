import { useEffect, type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { api } from '@/api';
import users from '../../../public/db/users/users.json'
import type { TSkillData } from '@/api/types';
import type { TUser } from '@/entities/user';

// const user = {
//     "name": "Максим Блатов",
//     "location": "Химки",
//     "dateofbirth": "1991-03-25",
//     "gender": "мужской",
//     "avatarpic": "https://randomuser.me/api/portraits/men/1.jpg",
//     "email": "alex1.user1@example.com",
//     "aboutme": "Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое",
//     "favoriteskills": ["skill_002", "skill_003"],
//     "tolearn": [
//       {
//         "category": 2,
//         "subcategory": [1, 2, 3]
//       }
//     ],
//     "canteach": [
//       {
//         "category": 4,
//         "subcategory": [2, 4]
//       }
//     ],
//   }


const skill = {
    type:'teach' as const,
    title: "Научу печь блины",
    description: "Вы научитесь создавать личный бренд. Продвигать свои услуги, навыки и знания на рынке используя свой собственный бренд для привлечения внимания новых клиентов либо для поиска новой работы.",
    category: 1,
    subcategory: 4,
    images: [
      "https://img.freepik.com/premium-photo/personal-brand-text-with-marker-piece-paper-wooden-table_507676-2273.jpg?semt=ais_hybrid",
      "https://img.freepik.com/premium-vector/branding-team-concept-with-people-scene-flat-design-woman-generates-new-ideas-creating-strategy-brand-identity-targeting-finds-solution-vector-illustration-with-character-situation-web_9209-10038.jpg?semt=ais_hybrid&w=740",
      "https://img.freepik.com/premium-vector/brand-construction-concept-illustration_86047-750.jpg?semt=ais_hybrid&w=740&q=80",
      "https://img.freepik.com/premium-vector/brand-building-abstract-concept-vector-illustration_107173-53469.jpg?semt=ais_hybrid&w=740&q=80"
    ]
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

useEffect(() => {
  const testLike = async () => {
    const result = await api.loginApi({
      email:'alex1.user1@example.com',
      password:'123456'})
      console.log('✅ Ответ:', result);
  };
  testLike();
}, []);

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
    </>
  );
}
