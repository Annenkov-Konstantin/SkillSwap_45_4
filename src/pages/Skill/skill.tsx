import styles from './skill.module.scss';
import { SkillDetails } from '@/widgets/SkillDetails/SkillDetails';
import { UserInfoCard } from '@/widgets/UserCard/UserInfoCard';
import type { FC } from 'react';
import { useAppSelector } from '@store-hooks';
import { userSlice } from '@/services/slices';
import type { TUser } from '@/entities/user';

export const Skill: FC = () => {
  //fetch user that was clicked
  //const user = useAppSelector(userSlice.selectors.selectUser);
  const mockUser: TUser = {
    _id: 'mockId',
    name: 'mockName',
    location: 'mockLocation',
    dateOfBirth: '1991',
    gender: 'male',
    avatarPic:
      'https://i.pinimg.com/736x/f8/b1/08/f8b108f138b66a1cb0ba23fe1855dc1f.jpg',
    email: 'mock@mail.com',
    aboutMe:
      'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
    createdAt: 'mockDate',
    updatedAt: 'mockDate',
    favoriteSkills: [],
    toLearn: [{ category: 1, subcategory: [1] }],
    canTeach: [{ category: 2, subcategory: [2] }]
  };
  //?mb fetch cards with same skill for sugestions

  const images = [
    'https://i.pinimg.com/1200x/9a/35/00/9a35001136e00e4f6ba6d16125077886.jpg',
    'https://i.pinimg.com/736x/f8/b1/08/f8b108f138b66a1cb0ba23fe1855dc1f.jpg',
    'https://i.pinimg.com/736x/27/0b/27/270b279865a032e1cff0e2adb6feed97.jpg',
    'https://i.pinimg.com/736x/9d/2a/13/9d2a13cddf643a68f3523c3fc08cf6e5.jpg',
    'https://i.pinimg.com/736x/50/14/47/5014470afdcf62d6824807ba22d22228.jpg'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.teacher_card}>
        <UserInfoCard user={mockUser}></UserInfoCard>
      </div>
      <div className={styles.info_card}>
        <SkillDetails
          title={'Разработка веб-приложений на React'}
          images={images}
          categoryId={1}
          skillId={1}
          description='Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры'
        ></SkillDetails>
      </div>
      <div className={styles.sugestions_heading}>
        <h2 className={styles.sugestions_heading}>Похожие предложения</h2>
      </div>
      <div className={styles.sugestions_content}></div>
    </div>
  );
};
