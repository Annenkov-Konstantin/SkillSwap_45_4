import {type IInputWrapper} from './types';
import styles from './inputLabel.module.scss';


export const InputLabel = ({inputId, labelValue}: IInputWrapper) => {
 return (
    <>
      {/* Лейбл – ВНЕ рамки */}
      {labelValue && (
        <label htmlFor={inputId} className={styles.label}>
          {labelValue}
        </label>
      )}
    </>
 );
}