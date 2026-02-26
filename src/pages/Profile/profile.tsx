import React, { useState } from "react";
import styles from './profile.module.scss';
import { ProfileMenu } from '@widgets/ProfileMenu';
import { FormProfileUpdate } from '@widgets/FormProfileUpdate';
import { SkillActionModal } from "@/widgets/skillActionModal";
import { Icon } from "@/shared/ui/Icon";

export const Profile: React.FC = () => {
  const [showModal, setShowModal] = useState(false);


    const handleClose= ()=>{
      setShowModal(false)
    }

     const handleOpen= ()=>{
      setShowModal(true)
    }


    return(
    <div className={styles.container}>
      {showModal &&
       <SkillActionModal
          image={<Icon name={'icon-user'} size={100} fill={'#abd27a'} />}
          maintText={'Ваши данные обновлены'}
          secondaryText={''}
          primaryBtnText={'Ок'}
          onClose={handleClose}
          isOpen={showModal}
       />}
      <ProfileMenu />
      <FormProfileUpdate
        onModalAction={handleOpen}
      />
    </div>
  );
}
