import React from "react";
import styles from './profile.module.scss';
import { ProfileMenu } from '@widgets/ProfileMenu';
import { FormProfileUpdate } from '@widgets/FormProfileUpdate';

export const Profile: React.FC = () => (
  <div className={styles.container}>
    <ProfileMenu />
    <FormProfileUpdate />
  </div>
);
