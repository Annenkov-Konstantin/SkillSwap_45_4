import styles from './modalOverlay.module.scss';
import clsx from 'clsx';

type TModalOverlayUI = {
  onClick: () => void;
  blur?: boolean;
  isVisible?: boolean;
  backdrop?:boolean;
};

export const ModalOverlayUI = ({
  onClick,
  isVisible,
  blur = true,
  backdrop = false
}: TModalOverlayUI) => (
  <div
    className={clsx(styles.overlay, {
      [styles.overlay_blur]: blur,
      [styles.overlay_visible]: isVisible,
      [styles.overlay_backdrop]: backdrop,
    })}
    onClick={onClick}
  ></div>
);
