import styles from './UserAvatar.module.css'

export const UserAvatar = () => {
  return (
    <div className={styles.user_account}>
      <p className={styles.user_name}>Мария</p>
      <img src='/' alt="Photo of user" className={styles.user_photo}/>
    </div>
  )
};
