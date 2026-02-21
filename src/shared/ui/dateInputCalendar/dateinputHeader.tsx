import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';
import { Icon } from '../Icon';
import styles from './DateInputCalendar.module.scss';

interface CalendarHeaderProps {
  date: Date;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

export const CalendarHeader = ({
  date,
  changeMonth,
  changeYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: CalendarHeaderProps) => {
  const monthSelectRef = useRef<HTMLButtonElement>(null);
  const yearSelectRef = useRef<HTMLButtonElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement | null>(null);
  const yearDropdownRef = useRef<HTMLDivElement | null>(null);

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const [monthDropdownRect, setMonthDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const [yearDropdownRect, setYearDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const months = useMemo(() => {
    if (!date) return [];

    const year = date.getFullYear();
    return Array.from({ length: 12 }, (_, index) => ({
      value: index,
      label: format(new Date(year, index, 1), 'LLLL', {
        locale: ru
      })
    }));
  }, [date]);

  const years = useMemo(() => {
    if (!date) return [];

    const currentYear = date.getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const yearValue = startYear + index;
      return {
        value: yearValue,
        label: yearValue.toString()
      };
    });
  }, [date?.getFullYear()]);

  const updateMonthDropdownPosition = useCallback(() => {
    if (!monthSelectRef.current) return;
    const rect = monthSelectRef.current.getBoundingClientRect();
    setMonthDropdownRect({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width
    });
  }, [monthSelectRef]);

  const updateYearDropdownPosition = useCallback(() => {
    if (!yearSelectRef.current) return;
    const rect = yearSelectRef.current.getBoundingClientRect();
    setYearDropdownRect({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width
    });
  }, [yearSelectRef]);

  // Переключение списка месяцев
  const handleMonthToggle = () => {
    const newIsOpen = !isMonthOpen;
    setIsMonthOpen(newIsOpen);
    if (newIsOpen) updateMonthDropdownPosition();
    setIsYearOpen(false); // Закрываем год при открытии месяца
  };

  // Переключение списка лет
  const handleYearToggle = () => {
    const newIsOpen = !isYearOpen;
    setIsYearOpen(newIsOpen);
    if (newIsOpen) updateYearDropdownPosition();
    setIsMonthOpen(false); // Закрываем месяц при открытии года
  };

  // Выбор месяца
  const handleMonthSelect = (monthIndex: number) => {
    changeMonth(monthIndex);
    setIsMonthOpen(false);
  };

  // Выбор года
  const handleYearSelect = (year: number) => {
    changeYear(year);
    setIsYearOpen(false);
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isClickInMonthDropdown =
        monthDropdownRef.current?.contains(target) ?? false;
      const isClickInYearDropdown =
        yearDropdownRef.current?.contains(target) ?? false;
      const isClickInMonthSelect =
        monthSelectRef.current?.contains(target) ?? false;
      const isClickInYearSelect =
        yearSelectRef.current?.contains(target) ?? false;

      if (isMonthOpen && !isClickInMonthDropdown && !isClickInMonthSelect) {
        setIsMonthOpen(false);
      }
      if (isYearOpen && !isClickInYearDropdown && !isClickInYearSelect) {
        setIsYearOpen(false);
      }
    };

    if (isMonthOpen || isYearOpen) {
      document.addEventListener('click', handleClickOutside, true);
      return () =>
        document.removeEventListener('click', handleClickOutside, true);
    }
  }, [
    isMonthOpen,
    isYearOpen,
    monthDropdownRef,
    yearDropdownRef,
    monthSelectRef,
    yearSelectRef
  ]);

  return (
    <>
      <div className={styles.calendarHeader}>
        <button
          type='button'
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className={styles.calendarNavButton}
          aria-label='Предыдущий месяц'
        >
          ‹
        </button>

        <div className={styles.calendarSelectors}>
          <div
            className={clsx(styles.calendarSelectWrapper, {
              [styles.calendarSelectWrapperOpen]: isMonthOpen
            })}
            data-open={isMonthOpen}
          >
            <button
              type='button'
              onClick={handleMonthToggle}
              className={styles.calendarSelect}
              aria-label='Выберите месяц'
              aria-expanded={isMonthOpen}
              ref={monthSelectRef}
            >
              {format(
                new Date(date.getFullYear(), date.getMonth(), 1),
                'LLLL',
                { locale: ru }
              )}

              <Icon
                name='icon-chevron-down'
                size={24}
                className={styles.calendarSelectIcon}
                aria-hidden
              />
            </button>
          </div>

          <div
            className={clsx(styles.calendarSelectWrapper, {
              [styles.calendarSelectWrapperOpen]: isYearOpen
            })}
            data-open={isYearOpen}
          >
            <button
              type='button'
              onClick={handleYearToggle}
              className={styles.calendarSelect}
              aria-label='Выберите год'
              aria-expanded={isYearOpen}
              ref={yearSelectRef}
            >
              {date.getFullYear()}

            <Icon
              name='icon-chevron-down'
              size={24}
              className={styles.calendarSelectIcon}
              aria-hidden
            /></button>
          </div>
        </div>

        <button
          type='button'
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className={styles.calendarNavButton}
          aria-label='Следующий месяц'
        >
          ›
        </button>
      </div>
      {isMonthOpen &&
        monthDropdownRect &&
        createPortal(
          <div
            ref={monthDropdownRef}
            className={styles.calendarSelectDropdown}
            data-calendar-dropdown='true'
            style={{
              top: monthDropdownRect.top,
              left: monthDropdownRect.left,
              width: monthDropdownRect.width
            }}
            role='listbox'
            aria-activedescendant={months
              .find((m) => m.value === date.getMonth())
              ?.value?.toString()}
          >
            {months.map((month) => (
              <button
                key={month.value}
                type='button'
                className={clsx(styles.calendarSelectOption, {
                  [styles.calendarSelectOptionSelected]:
                    month.value === date.getMonth()
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMonthSelect(month.value);
                }}
                role='option'
                aria-selected={month.value === date.getMonth()}
              >
                {month.label}
              </button>
            ))}
          </div>,
          document.body
        )}
      {isYearOpen &&
        yearDropdownRect &&
        createPortal(
          <div
            ref={yearDropdownRef}
            className={styles.calendarSelectDropdown}
            data-calendar-dropdown='true'
            style={{
              top: yearDropdownRect.top,
              left: yearDropdownRect.left,
              width: yearDropdownRect.width,
              maxHeight: '200px'
            }}
            role='listbox'
          >
            {years.map((year) => (
              <button
                key={year.value}
                type='button'
                className={clsx(styles.calendarSelectOption, {
                  [styles.calendarSelectOptionSelected]:
                    year.value === date.getFullYear()
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  handleYearSelect(year.value);
                }}
                role='option'
                aria-selected={year.value === date.getFullYear()}
              >
                {year.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};
