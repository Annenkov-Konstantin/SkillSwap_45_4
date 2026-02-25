import { DropdownTrigger, RadioButton } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import styles from './SkillSelect.module.scss';
import type { SkillSelectProps } from './types';

export const SkillSelect: React.FC<SkillSelectProps> = ({
  placeholderValue,
  optionsArr,
  value,
  onChange,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Синхронизируем внутреннее состояние с пропсом value
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = useCallback((option: string) => {
    if (disabled) return;

    setSelected(option);
    setOpen(false);

    if (onChange) {
      onChange(option);
    }
  }, [onChange, disabled]);


 // Исправленный обработчик клика вне div контейнера что скрыть список
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
    className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`}
    ref={dropDownRef}
    >
      <div
        className={`${styles.button_wrapper} ${open ? styles.button_wrapper_open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <button
          className={`${styles.dropbutton}`}
          disabled={disabled}
        >
          {selected ? selected : placeholderValue}
        </button>
        <DropdownTrigger
          isOpen={open}
          onClick={() => !disabled && setOpen(!open)}
        ></DropdownTrigger>
      </div>

      {open && !disabled && (
        <div className={styles.dropdown_content_open}>
          {optionsArr.map((option) => (
            <li key={optionsArr.indexOf(option)}>
              <RadioButton
                label={option}
                value={`${optionsArr.indexOf(option)}`}
                checked={selected === option}
                onChange={() => handleSelect(option)}
                name={`${option}_radio`}
              />
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
