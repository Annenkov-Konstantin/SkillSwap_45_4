<<<<<<< features/UserCard/add-userCardSkill
import { useEffect, type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { api } from '@/api';
import users from '../../../public/db/users/users.json'
import type { TSkillData } from '@/api/types';
import type { TUser } from '@/entities/user';
import { UserCardSkillUI } from '@features/index';


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

const skills = [
  {
    categoryId: 1,
    subCategory: 'Тайм-менеджмент'
  },
  {
    categoryId: 4,
    subCategory: 'Навыки обучения'
  },
  {
    categoryId: 6,
    subCategory: 'Йога и медитация'
  },
  {
    categoryId: 1,
    subCategory: 'Тайм-менеджмент'
  },
]

  return (
    <>
      <div>
        <p className={styles.test}>Компонент внутри главной страницы</p>
        <DropdownTrigger
          onClick={() => setOpen(!open)}
          isOpen={open}
        />
      </div>
      <div style={{width: 300}}>
        <UserCardSkillUI title='Хочет научиться' skills={skills} />
      </div>
      <div style={{width: 550}}>
        <UserCardSkillUI title='Хочет научиться' skills={skills} />
      </div>
      <div>
      {name}
      </div>
    </>
  );
}
=======
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

>>>>>>> development
