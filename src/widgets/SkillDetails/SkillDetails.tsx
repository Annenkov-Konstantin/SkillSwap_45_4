import { SkillGallery } from "@/features";
import { UserSkillDescription } from "@/features/UserSkillDescription";
import { Button, Favourites } from "@/shared/ui";
import type { SkillDetailsProps } from "./type";
import shareIcon from '@assets/icons/share.svg';
import moreIcon from '@assets/icons/more-square.svg';
import styles from "./SkillDetails.module.scss";

export const SkillDetails:React.FC<SkillDetailsProps> = ({
  title,
  images,
  categoryId,
  skillId,
  description,
  onSwapClick
}) => {
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
            title={title}
            categoryId={categoryId}
            skillId={skillId}
            description={description}
          />
          <Button
            status='primary'
            children='Предложить обмен'
            onClick={onSwapClick}
          />
        </div>
        <SkillGallery
          images={images}
          title={title}
        />
      </div>
    </div>
  );
};
