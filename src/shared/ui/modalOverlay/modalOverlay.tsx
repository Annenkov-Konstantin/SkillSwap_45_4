import styles from './modalOverlay.module.css';
import clsx from 'clsx';

type TModalOverlayUI = {
  onClick: () => void;
  blur?:boolean;
  isVisible?: boolean;
}

export const ModalOverlayUI = ( {onClick, isVisible, blur = true}: TModalOverlayUI ) => (
  <div
    className= {clsx(styles.overlay, {
      [styles.overlay_blur]: blur,
      [styles.overlay_visible]: isVisible,
    })}
    onClick={onClick}
  >
  </div>
)
