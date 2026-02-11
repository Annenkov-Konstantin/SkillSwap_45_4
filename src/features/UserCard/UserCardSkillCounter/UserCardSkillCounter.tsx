import styles from './UserCardSkillCounter.module.scss';

type UserCardSkillCounterProps ={
  counter: number;
}

export const UserCardSkillCounter = ({counter}:UserCardSkillCounterProps) => {
   if (counter <= 0) return null;

  return (
      <span className={styles.counter}>+{counter}</span>
  )
}
