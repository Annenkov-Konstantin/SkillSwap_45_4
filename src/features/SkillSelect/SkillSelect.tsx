import { DropdownTrigger, RadioButton } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import styles from './SkillSelect.module.scss';
import type { SkillSelectProps, CategoryOption } from './types';

export const SkillSelect: React.FC<SkillSelectProps> = ({
  placeholderValue,
  optionsArr,
  value,
  onChange,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(value || null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;

  // Находим выбранный объект по id
  const selectedOption = optionsArr.find(opt => opt.id === selectedId);
  const displayValue = selectedOption ? selectedOption.category : '';

  // Синхронизируем внутреннее состояние с пропсом value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedId(value);
    }
  }, [value]);

  const handleSelect = useCallback((option: CategoryOption) => {
    if (disabled) return;

    setSelectedId(option.id);
    setOpen(false);

    if (onChange) {
      onChange(option.id);
    }
  }, [onChange, disabled]);

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
    <div
      className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`}
      ref={dropDownRef}
    >
      <div
        className={`${styles.button_wrapper} ${open ? styles.button_wrapper_open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <button
          type='button'
          className={`${styles.dropbutton}`}
          disabled={disabled}
        >
          {displayValue || placeholderValue}
        </button>
        <DropdownTrigger
          isOpen={open}
          onClick={() => !disabled && setOpen(!open)}
        />
      </div>

      {open && !disabled && (
        <div className={styles.dropdown_content_open}>
          {optionsArr.map((option) => (
            <li key={option.id}>
              <RadioButton
                label={option.category}
                value={String(option.id)}
                checked={selectedId === option.id}
                onChange={() => handleSelect(option)}
                name={`category_${option.id}`}
              />
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
