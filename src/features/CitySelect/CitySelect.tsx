// src/features/CitySelect/CitySelect.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { type CitySelectProps } from './type';
import { CitySelectUI } from './CitySelectUI';
import { InputForDropdown } from '../../shared/ui/inputForDropdown/index';
import { DropdownList } from '../../shared/ui/dropdownList/index';

export const CitySelect: React.FC<CitySelectProps> = ({ someList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredList, setFilteredList] = useState(someList);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Дебаунс для поиска
  const debouncedSearch = useDebounce(inputValue, 300);

  // Фильтрация городов
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilteredList(someList);
      return;
    }

    const filtered = someList.filter((value) =>
      value.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredList(filtered);
  }, [debouncedSearch, someList]);

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
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleValueSelect = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(-1);
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

  // Функция для открытия дропдауна
  const handleOpen = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <CitySelectUI ref={containerRef} isOpen={isOpen}>
      <InputForDropdown
        ref={inputRef}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        setIsOpen={setIsOpen}
        placeholder='Не указан'
        labelValue='Город'
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClear={handleClear}
      />
      {isOpen && (filteredList.length > 0 || showNotFound) && (
        <DropdownList
          filteredList={filteredList}
          showNotFound={showNotFound}
          highlightedIndex={highlightedIndex}
          inputValue={inputValue}
          handleValueSelect={handleValueSelect}
          setHighlightedIndex={setHighlightedIndex}
          ref={listRef}
        />
      )}
    </CitySelectUI>
  );
};
