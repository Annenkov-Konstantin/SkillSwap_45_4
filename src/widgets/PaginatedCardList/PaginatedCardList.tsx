import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '@store-hooks';
import { selectSwapCards } from '@/services/selectors/swapCardSelector';
import { shallowEqual } from 'react-redux';
import { skillsListAdapter } from '@shared/lib/utils/skillsListAdapter';
import { skillsSelectors } from '@slice/skills';
import { PaginatedCardListUI } from './PaginatedCardListUI';
import { UserCard } from '@widgets/UserCard';
import { type TUser } from '@entities/user';
import { type PaginatedCardListProps } from './type';
import { SeeMoreButton } from '@shared/ui/seeMoreButton';

export const PaginatedCardList: React.FC<PaginatedCardListProps> = ({
  title,
  showViewAllButton: externalShowViewAllButton,
  onViewAll: externalOnViewAll = () => {}
}) => {
  const [expanded, setExpanded] = useState(false);
  const swapCards = useAppSelector(selectSwapCards, shallowEqual);
  const allSkills = useAppSelector(skillsSelectors.selectskills);

  // Map навыков пользователя
  const userSkillsMap = useMemo(() => {
    const map = new Map<
      string,
      {
        teach: (typeof swapCards)[0]['skill'][];
        learn: (typeof swapCards)[0]['skill'][];
      }
    >();
    swapCards.forEach(({ user, skill }) => {
      if (!map.has(user._id)) {
        map.set(user._id, { teach: [], learn: [] });
      }
      const entry = map.get(user._id)!;
      if (skill.type === 'teach') {
        entry.teach.push(skill);
      } else {
        entry.learn.push(skill);
      }
    });
    return map;
  }, [swapCards]);

  // Функция получения отформатированных навыков
  const getUserSkills = useCallback(
    (userId: string, type: 'teach' | 'learn') => {
      const skills = userSkillsMap.get(userId)?.[type] ?? [];
      const categories = skills.map((skill) => ({
        category: skill.category,
        subcategory: [skill.subCategory]
      }));
      return skillsListAdapter(categories, allSkills);
    },
    [userSkillsMap, allSkills]
  );

  // Уникальные пользователи (без сортировки)
  const uniqueUsers = useMemo(() => {
    const seen = new Set();
    return swapCards
      .map((item) => item.user)
      .filter((user) => {
        if (seen.has(user._id)) return false;
        seen.add(user._id);
        return true;
      });
  }, [swapCards]);

  // **Сортировка по сумме лайков**
  const sortedUsers = useMemo(() => {
    // 1. Считаем сумму лайков для каждого пользователя
    const likesSumMap = new Map<string, number>();
    swapCards.forEach(({ user, skill }) => {
      const current = likesSumMap.get(user._id) || 0;
      likesSumMap.set(user._id, current + skill.likes);
    });

    // 2. Сортируем копию uniqueUsers по убыванию суммы лайков
    return [...uniqueUsers].sort((a, b) => {
      const likesA = likesSumMap.get(a._id) || 0;
      const likesB = likesSumMap.get(b._id) || 0;
      return likesB - likesA; // по убыванию (больше → выше)
    });
  }, [swapCards, uniqueUsers]);

  // Мемоизированная функция рендера карточки
  const renderUserCard = useCallback(
    (user: TUser) => (
      <UserCard
        key={user._id}
        user={user}
        skillsToLearn={getUserSkills(user._id, 'learn')}
        skillsCanTeach={getUserSkills(user._id, 'teach')}
      />
    ),
    [getUserSkills]
  );
  // Определяем, показывать ли кнопку "Смотреть все"
  const effectiveShowViewAllButton =
    externalShowViewAllButton ?? (sortedUsers.length > 3 && !expanded);

  // Обработчик переключения (развернуть/свернуть)
  const handleToggle = useCallback(() => {
    setExpanded((prev) => {
      const newExpanded = !prev;
      if (newExpanded) {
        externalOnViewAll(); // вызываем внешний обработчик только при раскрытии
      }
      return newExpanded;
    });
  }, [externalOnViewAll]);

  // Мемоизируем кнопку
  const toggleButton = useMemo(() => {
    if (!effectiveShowViewAllButton) return undefined;
    return <SeeMoreButton showMore={handleToggle} expanded={expanded} />;
  }, [effectiveShowViewAllButton, handleToggle, expanded]);

  if (!swapCards.length) {
    return <div>Загрузка...</div>;
  }

  return (
    <PaginatedCardListUI
      cards={sortedUsers}
      title={title}
      maxRows={expanded ? undefined : 1}
      button={toggleButton}
      cardRender={renderUserCard}
    />
  );
};
