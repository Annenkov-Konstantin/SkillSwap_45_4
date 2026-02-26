import React, { useContext, useState } from "react";
import styles from './profile.module.scss';
import { ProfileMenu } from '@widgets/ProfileMenu';
import { SkillActionModal } from "@/widgets/skillActionModal";
import { Icon } from "@/shared/ui/Icon";
import { FavouritesCollection } from "@/widgets/Favourites";
import { Outlet } from "react-router-dom";
import { FormProfileUpdate } from "@/widgets/FormProfileUpdate";
import { SkillsModalContext } from "@/shared/context/SkillsModalContext";

export const Profile: React.FC = () => {
 const {showProfileModal, setShowProfileModal} = useContext(SkillsModalContext);

    const handleClose= ()=>{
      setShowProfileModal(false)
    }
    //  const handleOpen= ()=>{
    //    setShowProfileModal(true);
    // }

    return(
    <div className={styles.container}>
      {showProfileModal &&
       <SkillActionModal
          image={<Icon name={'icon-user'} size={100} fill={'#abd27a'} />}
          maintText={'Ваши данные обновлены'}
          secondaryText={''}
          primaryBtnText={'Ок'}
          onClose={handleClose}
          isOpen={showProfileModal}
       />}
      <ProfileMenu />
      <Outlet/>
    </div>
  );
}
