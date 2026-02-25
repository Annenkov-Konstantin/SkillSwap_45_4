import { DropdownTrigger, RadioButton } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import styles from './SkillSelect.module.scss';
import type { SkillSelectProps } from './types';

export const SkillSelect: React.FC<SkillSelectProps> = ({
  placeholderValue,
  optionsArr,
  value,
  onChange,
  disabled = false,
  className = '',
  withScroll = false
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const selectedValue =
    isControlled && value && optionsArr.includes(value) ? value : isControlled ? null : selected;

  // Исправленный обработчик клика вне div контейнера что скрыть список
  const handleSelect = useCallback(
    (option: string) => {
      if (!isControlled) {
        setSelected(option);
      }
      onChange?.(option);
      setOpen(false);
    },
    [isControlled, onChange]
  );

  const handleToggleOpen = useCallback(() => {
    if (disabled || optionsArr.length === 0) {
      return;
    }

    setOpen((prevOpen) => !prevOpen);
  }, [disabled, optionsArr.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropDownRef}>
      <div
        className={`${styles.button_wrapper} ${open ? styles.button_wrapper_open : ''} ${disabled ? styles.button_wrapper_disabled : ''}`}
      >
        <button
          type='button'
          className={styles.dropbutton}
          disabled={disabled}
          onClick={handleToggleOpen}
        >
          {selectedValue || placeholderValue}
        </button>
        <div className={styles.trigger}>
          <DropdownTrigger
            isOpen={open}
            onClick={handleToggleOpen}
          ></DropdownTrigger>
        </div>
      </div>

      <div
        className={
          open
            ? `${styles.dropdown_content_open} ${withScroll ? styles.dropdown_content_open_scrollable : ''}`
            : `${styles.dropdown_content}`
        }
      >
        {optionsArr.map((option, index) => (
          <li key={`${option}-${index}`}>
            <RadioButton
              label={option}
              value={`${index}`}
              checked={selectedValue === option}
              onChange={() => handleSelect(option)}
              name={`${option}_radio`}
              shape='square'
            ></RadioButton>
          </li>
        ))}
      </div>
    </div>
  );
};
