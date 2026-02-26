import React, { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { type CitySelectProps } from './type';
import { CitySelectUI } from './CitySelectUI';
import { InputForDropdown } from '@shared/ui/inputForDropdown';
import { DropdownList } from '@shared/ui/dropdownList';
import { InputLabel } from '@shared/ui/inputLabel';
import { InputAndDropdownWrapper } from '@shared/ui/inputAndDropdownWrapper';
import { InputButton } from '@shared/ui/inputButton';

export const CitySelect: React.FC<CitySelectProps> = ({ cityList, value, onChange,  placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredList, setFilteredList] = useState(cityList);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value || '');
    }
  }, [value]);

  // Дебаунс для поиска
  const debouncedSearch = useDebounce(inputValue, 300);

  // Фильтрация городов
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilteredList(cityList);
      return;
    }

    const filtered = cityList.filter((value) =>
      value.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredList(filtered);
  }, [debouncedSearch, cityList]);

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Обработчик клавиши ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Прокрутка к выделенному элементу
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      items[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (onChange && !newValue) {
      onChange('');
    }
  };

  const handleValueSelect = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    setHighlightedIndex(-1);

    if (onChange) {
      const selectedCity = cityList.find(city => city.name === value)?.name || '';
      onChange(selectedCity);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(-1);

    if (onChange) {
      onChange('');
    }

    inputRef.current?.focus();
  };

  // Функция для открытия дропдауна
  const handleOpen = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredList.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredList.length) {
          handleValueSelect(filteredList[highlightedIndex].name);
        } else if (inputValue.trim() && filteredList.length === 0) {
          // Если город не найден, но пользователь что-то ввел
          handleValueSelect(inputValue);
        }
        break;

      case 'Tab':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const showNotFound = !!inputValue.trim() && filteredList.length === 0;

  const inputId = React.useId();

  return (
    <CitySelectUI>
      {/* Лейбл – ВНЕ рамки */}
      <InputLabel inputId={inputId} labelValue='Город' />
      {/* Контейнер с рамкой – только инпут + дропдаун */}
      <InputAndDropdownWrapper
        ref={containerRef}
        isOpen={isOpen}
        input={
          <InputForDropdown
            ref={inputRef}
            isOpen={isOpen}
            button={
              <InputButton
                isOpen={isOpen}
                hasValue={!!inputValue}
                onOpen={handleOpen}
                onClear={handleClear}
              />
            }
            inputId={inputId}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            setIsOpen={setIsOpen}
            placeholder={placeholder}
          />
        }
        dropdownList={
          isOpen &&
          (filteredList.length > 0 || showNotFound) && (
            <DropdownList
              filteredList={filteredList}
              showNotFound={showNotFound}
              highlightedIndex={highlightedIndex}
              inputValue={inputValue}
              handleValueSelect={handleValueSelect}
              setHighlightedIndex={setHighlightedIndex}
              ref={listRef}
            />
          )
        }
      />
    </CitySelectUI>
  );
};
