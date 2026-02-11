import  {type FC } from 'react';
import { useState, useEffect } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';

type User = {
  _id: string;                     // уникальный идентификатор
  name: string;                    // полное имя
  location: string;                // город проживания
  dateOfBirth: string;            // дата рождения в формате YYYY-MM-DD
  gender: 'мужской' | 'женский';  // только два значения
  avatarPic: string;              // URL аватарки
  email: string;                  // email адрес
  aboutMe: string;                // описание пользователя
  createdAt: string;              // дата создания в ISO формате
  updatedAt: string;              // дата обновления в ISO формате
  favoriteSkills: string[];       // массив любимых навыков
  toLearn: string[];              // массив навыков для изучения
  canTeach: string[];             // массив навыков для преподавания
};



export const ExampleComponent: FC = () => {
const [open, setOpen] = useState(false);
const [value, setValue] = useState('');

const [users, setUsers] = useState<User[]>([]);


useEffect(()=>{

  // 1. Базовый fetch для поиска по ID
async function getUsers() {
  const response = await fetch(
    `https://eccajwbbfsahzeawepwa.supabase.co/rest/v1/users?select=*`,
    {
      headers: {
        'apikey': 'sb_publishable_8HjF0IOBx5hMsEmtEqhQ7A_CDV1IglM',
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
 setUsers(data);
}

getUsers();


},[])

  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger
        onClick={()=>setOpen(!open)}
        isOpen={open}
        />
      <Input value={value} onChange={setValue} isSearch={true}/>
      <Button status='primary' children='Войти'/>
      <ul>
        {users.map(user =>
          <li key={user._id}>{user.name}</li>
        )}
      </ul>
    </div>
  );
};
