import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './TextArea.module.scss';
import { Icon } from '../Icon';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showIcon?: boolean;
  onEditClick?: () => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, containerClassName, showIcon = false, onEditClick, ...rest },
    ref
  ) => {
    const hasTrailingElement = showIcon;

    return (
      <div
        className={clsx(
          styles.textAreaContainer,
          {
            [styles.withTrailingContent]: hasTrailingElement,
            [styles.disabled]: rest.disabled
          },
          containerClassName
        )}
      >
        <textarea
          ref={ref}
          className={clsx(styles.textArea, className)}
          {...rest}
        />

        {showIcon && onEditClick && (
          <button
            type='button'
            onClick={onEditClick}
            className={styles.editIconButton}
            aria-label='Редактировать'
          >
            <Icon name='icon-edit' size={24} aria-hidden />
          </button>
        )}
      </div>
    );
  }
)

TextArea.displayName = 'TextArea';
