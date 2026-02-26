import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { DropdownTrigger } from '@/shared/ui/dropdownTrigger';
import { InputLabel } from '@/shared/ui/inputLabel';
import type { TSelectProps } from './types';
import styles from './select.module.scss';

export const Select: React.FC<TSelectProps> = ({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Не указан',
  label,
  id,
  disabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;
  const listboxId = `${selectId}-listbox`;

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const hasSelection = selectedValue !== '';

  const selectedOption = useMemo(() => {
    if (!hasSelection) {
      return undefined;
    }
    return options.find((option) => option.value === selectedValue);
  }, [options, selectedValue, hasSelection]);

  const closeDropdown = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const openDropdown = () => {
    if (disabled || options.length === 0) {
      return;
    }

    setIsOpen(true);
    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue
    );
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const toggleDropdown = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (disabled) {
      return;
    }
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  };

  const handleSelect = (nextValue: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
    closeDropdown();
    controlRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled || options.length === 0) {
      return;
    }

    switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      event.stopPropagation();
      if (!isOpen) {
        openDropdown();
        return;
      }
      setHighlightedIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : prev
      );
      break;
    case 'ArrowUp':
      event.preventDefault();
      event.stopPropagation();
      if (!isOpen) {
        openDropdown();
        return;
      }
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      event.stopPropagation();
      if (!isOpen) {
        openDropdown();
        return;
      }
      if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        handleSelect(options[highlightedIndex].value);
      }
      break;
    case 'Escape':
      if (isOpen) {
        event.preventDefault();
        event.stopPropagation();
        closeDropdown();
      }
      break;
    case 'Tab':
      closeDropdown();
      break;
    }
  };

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

  const isDropdownOpen = isOpen && !disabled;

  useEffect(() => {
    if (!isDropdownOpen || highlightedIndex < 0 || !listRef.current) {
      return;
    }

    const highlightedElement = listRef.current.children.item(highlightedIndex);
    if (highlightedElement instanceof HTMLElement) {
      highlightedElement.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [highlightedIndex, isDropdownOpen]);

  const handleControlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown(e);
  };

  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown(e);
  };

  const handleOptionClick = (optionValue: string, e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelect(optionValue, e);
  };

  return (
    <div
      className={clsx(styles.container, className)}
      ref={containerRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {label && <InputLabel inputId={selectId} labelValue={label} />}

      <div
        className={clsx(styles.controlWrapper, {
          [styles.controlWrapperOpen]: isDropdownOpen,
          [styles.controlWrapperDisabled]: disabled
        })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          type='button'
          id={selectId}
          className={clsx(styles.control, {
            [styles.placeholder]: !selectedOption
          })}
          aria-expanded={isDropdownOpen}
          aria-controls={listboxId}
          aria-haspopup='listbox'
          aria-label={label ?? placeholder}
          disabled={disabled}
          onClick={handleControlClick}
          onKeyDown={handleKeyDown}
          ref={controlRef}
        >
          {selectedOption?.label ?? placeholder}
        </button>

        <div
          className={styles.trigger}
          onClick={handleTriggerClick}
        >
          <DropdownTrigger
            isOpen={isDropdownOpen}
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {isDropdownOpen && options.length > 0 && (
        <ul
          id={listboxId}
          ref={listRef}
          className={styles.list}
          role='listbox'
          aria-labelledby={selectId}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role='option'
              aria-selected={selectedValue === option.value}
              className={clsx(styles.option, {
                [styles.optionHighlighted]: highlightedIndex === index,
                [styles.optionSelected]: selectedValue === option.value
              })}
              onClick={(e) => handleOptionClick(option.value, e)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
