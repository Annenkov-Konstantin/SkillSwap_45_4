// MultiSkillSelect.tsx
import { DropdownTrigger } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Checkbox } from '@/shared/ui';
import styles from './multySkillSelect.module.scss'

interface MultiSkillSelectProps {
  placeholderValue?: string;
  optionsArr: string[];
  value: string[]; // массив выбранных значений
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export const MultiSkillSelect: React.FC<MultiSkillSelectProps> = ({
  placeholderValue = 'Выберите варианты',
  optionsArr,
  value = [],
  onChange,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Синхронизируем внутреннее состояние с пропсом value
  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    let newSelected: string[];

    if (isChecked) {
      newSelected = [...selectedValues, option];
    } else {
      newSelected = selectedValues.filter(item => item !== option);
    }

    setSelectedValues(newSelected);
    onChange(newSelected);
  };

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

  // Формируем текст для отображения в кнопке
  const getButtonText = () => {
    if (selectedValues.length === 0) {
      return placeholderValue;
    }
    if (selectedValues.length === 1) {
      return selectedValues[0];
    }
    return `Выбрано: ${selectedValues.length}`;
  };

  return (
    <div
      className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`}
      ref={dropDownRef}
    >
      <div
        className={`${styles.button_wrapper} ${open ? styles.button_wrapper_open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggleOpen}
      >
        <button
          className={styles.dropbutton}
          disabled={disabled}
          type="button"
        >
          {getButtonText()}
        </button>
        <DropdownTrigger
          isOpen={open}
          onClick={handleToggleOpen}
        />
      </div>

      {open && !disabled && (
        <div className={styles.dropdown_content_open}>
          {optionsArr.map((option, index) => (
            <div key={`${option}_${index}`} className={styles.checkboxItem}>
              <Checkbox
                label={option}
                checked={selectedValues.includes(option)}
                onChange={(isChecked: boolean) => handleCheckboxChange(option, isChecked)}
                id={`skill_${option}_${index}`}
                name={`skill_${option}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
