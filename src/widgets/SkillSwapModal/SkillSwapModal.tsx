import type React from 'react';
import styles from './SkillSwapModal.module.scss';
import { SkillGallery, UserSkillDescription } from '@features/index';
import { Button, ModalOverlayUI } from '@shared/ui';
import type { SkillGalleryProps } from '../../features/SkillGallery/type';
import type { UserSkillDescriptionProps } from '../../features/UserSkillDescription/type';

export const SkillSwapModal: React.FC = () => {
  const userSkillData: UserSkillDescriptionProps = {
    title: 'Игра на барабанах',
    categoryId: 2,
    skillId: 4,
    description: `Привет! Я играю на барабанах уже больше 10 лет —от репетиций в гараже до
      выступлений на сцене с живыми группами. Научу основам техники (и как не отбить
      себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать
      уверенно даже без паритуры`
  };

  const galleryData: SkillGalleryProps = {
    title: 'Игра на барабанах',
    images: [
      'https://i.ytimg.com/vi/f-hg4Ke9BVU/maxresdefault.jpg',
      'https://i.ytimg.com/vi/QbKjlysK0d4/maxresdefault.jpg',
      'https://avatars.mds.yandex.net/i?id=9693c935c95cc07c742e8f5d3b17a34f_l-3644822-images-thumbs&n=13',
      'https://i.ytimg.com/vi/7nhN-eDSqGQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gVCgbMA8=&amp;rs=AOn4CLB1X9rBJNF_ZpqUA3tHUqhF19MxqA',
      'https://avatars.mds.yandex.net/get-vthumb/761774/19a533ce73c1a7582e27cd1d02c5944a/564x318_1',
      'https://i.ytimg.com/vi/2j6TH5MlZlY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGcgZyhnMA8=&amp;rs=AOn4CLAHBkqsyxdcoI9nh1t1hbdTryByHQ'
    ]
  };

  return (
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.title}>{'Ваше предложение'}</h2>
          <p className={styles.description}>
            {'Пожалуйста, проверьте и подтвердите правильность данных'}
          </p>
        </header>
        <div className={styles.main}>
          <div className={styles.skill}>
            <UserSkillDescription
              title={userSkillData.title}
              categoryId={userSkillData.categoryId}
              skillId={userSkillData.skillId}
              description={userSkillData.description}
            />
            <div className={styles.buttons}>
              <Button status='secondary'>
                {'Редактировать'}
                <img
                  className={styles['edit-icon']}
                  src='src\assets\icons\edit.svg'
                />
              </Button>
              <Button status='primary'>{'Готово'}</Button>
            </div>
          </div>
          <SkillGallery title={galleryData.title} images={galleryData.images} />
        </div>
      </div>
      <ModalOverlayUI isVisible={true} backdrop={true} onClick={() => {}} />
    </>
  );
};
