import React, { useState, useCallback, useMemo } from 'react';
import { PaginatedCardList } from '@widgets/PaginatedCardList';
import { UserCard } from '@widgets/UserCard';
import { useAppSelector } from '@store-hooks';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { shallowEqual } from 'react-redux';
import { type TUser } from '@entities/user';
import { type TUserSkill } from '@/entities/userSkill';
import styles from './MainRecomendationList.module.scss';

export const MainRecommendationList: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6); // сначала 6 карточек
  const [isLoading, setIsLoading] = useState(false);
  const swapCards = useAppSelector(selectSwapCards, shallowEqual);

  const visibleCards = useMemo(
    () => swapCards.slice(0, visibleCount),
    [swapCards, visibleCount]
  );
  const hasMore = visibleCount < swapCards.length;

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    // !!! Для демонстрации работы
    // Имитация загрузки
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, swapCards.length)); // подгружаем ещё 3
      setIsLoading(false);
    }, 500);

    // !!! Для рабочего варианта
    // Счётчик увеличивается синхронно, после рендера флаг сбрасывается
    /*     setVisibleCount(prev => Math.min(prev + 6, swapCards.length));
    requestAnimationFrame(() => setIsLoading(false)); */
  }, [hasMore, isLoading, swapCards.length]);

  const renderCard = useCallback(
    ({ user, skill }: { user: TUser; skill: TUserSkill }) => (
      <UserCard key={`${user._id}-${skill._id}`} user={user} swap={skill} />
    ),
    []
  );

  if (!swapCards.length) {
    return (
      <div>
        <p className={styles.text}>Нет рекомендаций</p>
      </div>
    );
  }

  return (
    <PaginatedCardList
      cards={visibleCards}
      title='Рекомендуем'
      maxRows={undefined}
      cardRender={renderCard}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};
