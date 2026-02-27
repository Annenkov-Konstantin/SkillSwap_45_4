import { SkillGallery } from "@/features";
import { UserSkillDescription } from "@/features/UserSkillDescription";
import { Button, Favourites } from "@/shared/ui";
import type { SkillDetailsProps } from "./type";
import shareIcon from '@assets/icons/share.svg';
import moreIcon from '@assets/icons/more-square.svg';
import styles from "./SkillDetails.module.scss";
import { useAppSelector } from "@/services/hooks";
import { userSelectors } from "@/services/slices/user";
import { useRef, useState } from "react";
import { Icon } from "@/shared/ui/Icon";

export const SkillDetails:React.FC<SkillDetailsProps> = ({
  skill,
  onSwapClick
}) => {
  const currentUser = useAppSelector(userSelectors.selectUser);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef(null);
  const isSwapAvailable = () =>{
    if (!currentUser) return false;
    if(currentUser){
      if (skill.type === 'learn')
        return currentUser.canTeach[0].category === skill.category
      if (skill.type === 'teach')
        return currentUser.toLearn[0].category === skill.category
    }
  }
  const handleMouseEnter = () => {
    setShowMessage(true);
  };
  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <Favourites />
        <button
          className={styles.button}
          aria-label="Поделиться карточкой навыков пользователя в социальных сетях">
          <img
            src={shareIcon}
            alt=""
          />
        </button>
        <button
          className={styles.button}
          aria-label="Дополнительные действия">
          <img
            src={moreIcon}
            alt=""
          />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <UserSkillDescription
            title={skill.title}
            categoryId={skill.category}
            skillId={skill.subCategory}
            description={skill.description}
          />
          <Button
            status={isSwapAvailable()?'primary':'primary_disabled' }
            children='Предложить обмен'
            onClick={onSwapClick}
          />
        </div>
        <div className={styles.message_container}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
            {!isSwapAvailable() && (
              <>
                <Icon name={'icon-more-square'} fill={'#bf3920'} size={40} />
                {showMessage && (
                  <p className={styles.not_available} ref={messageRef}>
                    {currentUser
                      ? 'К сожалению Ваши навыки не совпадают'
                      : 'Сначала войдите или зарегистрируйтесь'
                    }
                  </p>
                )}
              </>
            )}
        </div>
        <SkillGallery
          images={skill.images}
          title={skill.title}
        />
      </div>
    </div>
  );
};
