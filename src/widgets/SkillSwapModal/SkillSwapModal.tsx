import type React from 'react';
import styles from './SkillSwapModal.module.scss';
import { SkillGallery, UserSkillDescription } from '@features/index';
import { Button, ModalOverlayUI } from '@shared/ui';
import type { SkillGalleryProps } from '../../features/SkillGallery/type';
import type { UserSkillDescriptionProps } from '../../features/UserSkillDescription/type';
import { Icon } from '@/shared/ui/Icon';
import type { TSkillSwapModalProps } from './type';
import { useAppSelector, useDispatchedActions } from '@/services/hooks';
import { formSelectors } from '@/services/slices/form';
import { userActions } from '@/services/slices/user';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, mockSwapApiDataLearn } from '@/shared/lib/constants';
import type { TSkillData } from '@/api/types';
import { userSkillListActions } from '@/services/slices/userSkillList';

export const SkillSwapModal: React.FC<TSkillSwapModalProps> = ({onClose}) => {
  const swapPreviwInfo = useAppSelector(formSelectors.selectSwapData);
  const { fetchRegisterApi } = useDispatchedActions(userActions);
  const { fetchAddNewUserSkill } = useDispatchedActions(userSkillListActions)
  const dataForRegisth= useAppSelector(formSelectors.selectRegisterData)
  const dataForSwapCard = useAppSelector(formSelectors.selectSwapData)

  const navigate = useNavigate();

  const handleClickEdit =()=>{
    onClose()
  }

  const userSkillData: UserSkillDescriptionProps = {
    title: swapPreviwInfo.swapInfo.skillName,
    categoryId: swapPreviwInfo.canTeach[0].category,
    skillId: swapPreviwInfo.canTeach[0].subcategory[0],
    description: swapPreviwInfo.swapInfo.description
  };

  const galleryData: SkillGalleryProps = {
    title: swapPreviwInfo.swapInfo.skillName,
    images:swapPreviwInfo.swapInfo.images
  };

  const swapApiDataTeach:TSkillData ={
    title:dataForSwapCard.swapInfo.skillName,
    description: dataForSwapCard.swapInfo.description,
    type: "teach",
    category: dataForSwapCard.canTeach[0].category,
    subcategory: dataForSwapCard.canTeach[0].subcategory[0],
    images:dataForSwapCard.swapInfo.images
  }

    const swapApiDataLearn:TSkillData ={
    ... mockSwapApiDataLearn,
    type: "learn",
    category: dataForSwapCard.toLearn[0].category,
    subcategory: dataForSwapCard.toLearn[0].subcategory[0],
  }

  const clearRegistrationData = () => {
    localStorage.removeItem('registrationTeachData');
    localStorage.removeItem('registrationPersonalData');
    localStorage.removeItem('registrationFormEmail');
  };

  const handleSubmitClick = async () => {
    try {
      await fetchRegisterApi(dataForRegisth).unwrap();
      await fetchAddNewUserSkill(swapApiDataTeach);
      await fetchAddNewUserSkill(swapApiDataLearn);
      clearRegistrationData();
      navigate(AppRoutes.HomeCatalog);
    } catch (error) {
      navigate(AppRoutes.RegAccount, {
        state: { badLogin: true }
      });
    }
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
              <Button
                onClick={handleClickEdit}
                status='secondary'>
                {'Редактировать'}
                <Icon name={'icon-edit'} className={styles.icon_pen}/>
              </Button>
              <Button
              onClick={handleSubmitClick}
              status='primary'>{'Готово'}</Button>
            </div>
          </div>
          <SkillGallery title={galleryData.title} images={galleryData.images} />
        </div>
      </div>
      <ModalOverlayUI isVisible={true} backdrop={true} onClick={() => {}} />
    </>
  );
};
