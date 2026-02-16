import { DropdownTrigger, RadioButton } from '@/shared/ui';
import { useCallback, useEffect, useState, useRef } from 'react';
import styles from './SkillSelect.module.scss';
import type { SkillSelectProps } from './types';

export const SkillSelect: React.FC<SkillSelectProps> = ({
  placeholderValue,
  optionsArr
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((option: string) => {
    setSelected(option);
    setOpen(false);
  }, []);


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
    className={`${styles.dropdown}`}
    ref={dropDownRef}
    >
      <div
        className={`${styles.button_wrapper} ${open ? styles.button_wrapper_open : ''} `}
        onClick={() => setOpen(!open)}
      >
        <button className={`${styles.dropbutton}`}>
          {selected ? selected : placeholderValue}
        </button>
        <DropdownTrigger
          isOpen={open}
          onClick={() => setOpen(!open)}
        ></DropdownTrigger>
      </div>

      <div
        className={
          open
            ? `${styles.dropdown_content_open}`
            : `${styles.dropdown_content}`
        }
      >
        {optionsArr.map((option) => (
          <li key={optionsArr.indexOf(option)}>
            <RadioButton
              label={option}
              value={`${optionsArr.indexOf(option)}`}
              checked={selected === option}
              onChange={() => handleSelect(option)}
              name={`${option}_radio`}
            ></RadioButton>
          </li>
        ))}
      </div>
    </div>
  );
};
