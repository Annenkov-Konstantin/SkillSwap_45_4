import styles from './SkillsDropdown.module.scss';
import { memo } from 'react';
import type { FC } from 'react';
import type { TModalProps } from './type';
import { categoryIcon } from './type';
import { ModalOverlayUI } from '@/shared/ui';

export const SkillsDropdownUI: FC<TModalProps> = memo(
  ({ onClose, skills, isVisible }) => (
    <>
      <div className= {`${styles.skills_container} ${
        isVisible? styles.visible : ''
      }`}>
        <ul className={styles.content}>
          { skills.map(category => {
            const iconClassName = categoryIcon[category.id]  ;
            return (
              <li
                key={category.id}
                className={`${styles.category_item} ${styles[iconClassName]}`}
              >
                <h2 className={styles.category_title}>{category.category}</h2>
                <ul className={styles.category}>
                  {category.skills.map((skill, index) => (
                    <li key={index}>{skill.title}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <ModalOverlayUI onClick={onClose} blur={true} isVisible={isVisible} />
    </>
  )
);
