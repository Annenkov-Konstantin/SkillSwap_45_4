import { Button, ModalOverlayUI } from '@/shared/ui';
import type React from 'react';
import styles from './skillActionModal.module.scss';
import { useEffect } from 'react';
import type { TSkillActionModalProps } from './types';

export const SkillActionModal: React.FC<TSkillActionModalProps> = ({
  image,
  maintText,
  secondaryText,
  primaryBtnText,
  secondaryBtnText,
  onClose,
  isOpen
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: { key: string }) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen)
    return <ModalOverlayUI onClick={onClose} blur={false} isVisible={false} />;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ModalOverlayUI onClick={onClose} blur={true} isVisible={true} />
      <dialog className={styles.modal}>
        {image && (
          <img
            className={styles.modal_icon}
            src={image}
            alt={'Иконка модалки'}
          />
        )}
        <h2>{maintText}</h2>
        <p className={styles.modal_secondary_text}>{secondaryText}</p>
        <div
          className={`${secondaryBtnText ? styles.modal_two_button_container : styles.modal_one_button_container}`}
        >
          {secondaryBtnText && (
            <Button
              onClick={onClose}
              status={'secondary'}
              children={secondaryBtnText}
            />
          )}
          <Button
            onClick={onClose}
            status={'primary'}
            children={primaryBtnText}
          />
        </div>
      </dialog>
    </div>
  );
};
