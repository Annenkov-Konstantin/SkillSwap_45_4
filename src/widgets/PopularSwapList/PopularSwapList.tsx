import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '@store-hooks';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { shallowEqual } from 'react-redux';
import { PaginatedCardList } from '@widgets/PaginatedCardList';
import { UserCard } from '@widgets/UserCard';
import { type TUser } from '@entities/user';
import { type TUserSkill } from '@/entities/userSkill';
import { SeeMoreButton } from '@shared/ui/seeMoreButton';
import { Preloader } from '@/shared/ui/preloader';

export const PopularSwapList: React.FC = ({
}) => {
  const [expanded, setExpanded] = useState(false);
  const swapCards = useAppSelector(selectSwapCards, shallowEqual);

  const sortedSwapCards = useMemo(
    () => [...swapCards].sort((a, b) => b.skill.likes - a.skill.likes),
    [swapCards]
  );

  const topSwapCards = useMemo(
    () => sortedSwapCards.slice(0, 6),
    [sortedSwapCards]
  );

  const renderCard = useCallback(
    ({ user, skill }: { user: TUser; skill: TUserSkill }) => (
      <UserCard key={`${user._id}-${skill._id}`} user={user} swap={skill} />
    ),
    []
  );

  const handleToggle = useCallback(() => setExpanded((prev) => !prev), []);

  // Кнопка в этом компоненте показывается всегда, если карточек больше трёх
  const showToggleButton = topSwapCards.length > 3;
  const button = showToggleButton ? (
    <SeeMoreButton showMore={handleToggle} expanded={expanded} />
  ) : undefined;

  if (!swapCards.length) return <Preloader />;

  return (
    <PaginatedCardList
      cards={topSwapCards}
      title={'Популярное'}
      maxRows={expanded ? undefined : 1}
      button={button}
      cardRender={renderCard}
    />
  );
};
