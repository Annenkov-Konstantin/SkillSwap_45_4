import { DropdownTrigger } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Checkbox } from '@/shared/ui';
import styles from './multySkillSelect.module.scss'
import type { TSkill } from '@/entities/skills';

interface MultiSkillSelectProps {
  placeholderValue?: string;
  optionsArr: TSkill[]; // массив объектов навыков
  value: number[]; // массив выбранных ID (числа)
  onChange: (selectedIds: number[]) => void; // возвращает массив ID
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
  const [selectedIds, setSelectedIds] = useState<number[]>(value);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Синхронизируем внутреннее состояние с пропсом value
  useEffect(() => {
    setSelectedIds(value);
  }, [value]);

  const handleCheckboxChange = (skill: TSkill, isChecked: boolean) => {
    let newSelected: number[];

    if (isChecked) {
      newSelected = [...selectedIds, skill.id]; // добавляем ID
    } else {
      newSelected = selectedIds.filter(id => id !== skill.id); // удаляем по ID
    }

    setSelectedIds(newSelected);
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
    if (selectedIds.length === 0) {
      return placeholderValue;
    }
    if (selectedIds.length === 1) {
      // Находим название выбранного навыка по ID
      const selectedSkill = optionsArr.find(skill => skill.id === selectedIds[0]);
      return selectedSkill?.title || placeholderValue;
    }
    return `Выбрано: ${selectedIds.length}`;
  };

  // Проверяем, выбран ли навык по ID
  const isSkillSelected = (skillId: number): boolean => {
    return selectedIds.includes(skillId);
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
          {optionsArr.map((skill) => (
            <div key={skill.id} className={styles.checkboxItem}>
              <Checkbox
                label={skill.title} // Показываем название навыка
                checked={isSkillSelected(skill.id)} // Проверяем по ID
                onChange={(isChecked: boolean) => handleCheckboxChange(skill, isChecked)}
                id={`skill_${skill.id}`}
                name={`skill_${skill.id}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
