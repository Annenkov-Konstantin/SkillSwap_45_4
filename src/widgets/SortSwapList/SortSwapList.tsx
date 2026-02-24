import React, { useCallback, useMemo, useState, type FC } from 'react';
import { useAppSelector } from '@store-hooks';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { shallowEqual } from 'react-redux';
import { PaginatedCardList } from '@widgets/PaginatedCardList';
import { UserCard } from '@widgets/UserCard';
import { type TUser } from '@entities/user';
import { type TUserSkill } from '@/entities/userSkill';
import { SeeMoreButton } from '@shared/ui/seeMoreButton';
import { Preloader } from '@/shared/ui/preloader';
import type { TSortSwapList } from './type';
import type { SkillCard } from '@/shared/lib/types';

export const SortSwapList:FC<TSortSwapList>= ({type
}) => {
  const [expanded, setExpanded] = useState(false);
  const swapCards = useAppSelector(selectSwapCards, shallowEqual);

  const finalResult = useMemo(() => {
    if (type === 'popular') {
      const sorted = [...swapCards].sort((a, b) => b.skill.likes - a.skill.likes);
      return sorted.slice(0, 6);
    }
    if (type === 'new') {
      const sorted = [...swapCards].sort((a, b) =>
        new Date(b.skill.createdAt).getTime() - new Date(a.skill.createdAt).getTime()
      );
      return sorted.slice(0, 6);
    }
    return [];
  }, [swapCards, type]);

  const renderCard = useCallback(
    ({ user, skill }: { user: TUser; skill: TUserSkill }) => (
      <UserCard key={`${user._id}-${skill._id}`} user={user} swap={skill} />
    ),
    []
  );

  const handleToggle = useCallback(() => setExpanded((prev) => !prev), []);

  // Кнопка в этом компоненте показывается всегда, если карточек больше трёх
  const showToggleButton = finalResult.length > 3;
  const button = showToggleButton ? (
    <SeeMoreButton showMore={handleToggle} expanded={expanded} />
  ) : undefined;

  if (!swapCards.length) return <Preloader />;

  return (
    <PaginatedCardList
      cards={finalResult}
      title={type === 'popular'?'Популярное':'Новое'}
      maxRows={expanded ? undefined : 1}
      button={button}
      cardRender={renderCard}
    />
  );
};
