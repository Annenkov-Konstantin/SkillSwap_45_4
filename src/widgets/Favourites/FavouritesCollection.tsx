import { useAppSelector } from '@/services/hooks';
import styles from './FavouritesCollection.module.scss';
import { type FC } from 'react';
import { userSelectors } from '@/services/slices/user';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { UserCard } from '../UserCard';

export const FavouritesCollection :React.FC = () => {
  const user = useAppSelector(userSelectors.selectUser);
  const allCards = useAppSelector(selectSwapCards);
  const favouritesArr = user?.favoriteSkills;
  const displayedCards = allCards.filter(card => {
    if(favouritesArr) return favouritesArr.find(item=> item === card.skill._id)})

  return (
      <div className={styles.container}>
        {displayedCards.map((item, index) => (
          <div key={index} className={styles.gridItem}>
            <UserCard user={item.user} swap={item.skill}/>
          </div>
        ))}
      </div>
  );
};
