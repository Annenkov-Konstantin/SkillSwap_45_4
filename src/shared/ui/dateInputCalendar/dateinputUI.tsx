import DatePicker, { registerLocale } from 'react-datepicker';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import clsx from 'clsx';
import { CalendarHeader } from './dateinputHeader';
import { Button } from '../button';
import styles from './DateInputCalendar.module.scss';
import { Icon } from '../Icon';

registerLocale('ru', ru);

const DISPLAY_FORMAT = 'dd.MM.yyyy';

const toDate = (iso: string): Date | null => {
  if (!iso) {
    return null;
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const formatDisplay = (date: Date | null): string => {
  if (!date) {
    return '';
  }
  return format(date, DISPLAY_FORMAT);
};

const toIsoString = (date: Date | null): string => {
  if (!date) {
    return '';
  }
  return format(date, 'yyyy-MM-dd');
};

const parseDisplayValue = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!match) return null;

  const [, dayStr, monthStr, yearStr] = match;
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900)
    return null;

  const date = new Date(year, month - 1, day);
  // Дополнительная проверка: создаётся ли корректная дата
  if (
    date.getFullYear() !== year ||
    date.getDate() !== day ||
    date.getMonth() !== month - 1
  ) {
    return null;
  }
  return date;
};

export interface CalendarInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  value?: string;
  onChange?: (value: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const CalendarInput = forwardRef<HTMLInputElement, CalendarInputProps>(
  (
    {
      value,
      onChange,
      placeholder = 'дд.мм.гггг',
      disabled = false,
      minDate,
      maxDate,
      onBlur,
      onFocus,
      className,
      ...rest
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(() => {
      const date = toDate(value ?? '');
      return formatDisplay(date);
    });
    const parsedValue = useMemo(() => toDate(value ?? ''), [value]);
    const [tempDate, setTempDate] = useState<Date | null>(parsedValue);

    useEffect(() => {
      setInputValue(formatDisplay(parsedValue));
      setTempDate(parsedValue);
    }, [parsedValue]);

    useEffect(() => {
      if (isOpen && tempDate) {
        setInputValue(formatDisplay(tempDate));
      }
    }, [isOpen, tempDate]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;

        if (
          !containerRef.current?.contains(target) &&
          !target.closest('[data-calendar-dropdown="true"]')
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside, true);
      return () =>
        document.removeEventListener('click', handleClickOutside, true);
    }, [isOpen]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);

      const inputValue = event.target.value.trim();
      if (!inputValue) {
        onChange?.('');
        setInputValue('');
        return;
      }

      const parsed = parseDisplayValue(inputValue);
      if (!onChange || !parsed) return;

      onChange(toIsoString(parsed));
      setInputValue(formatDisplay(parsed));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;

      event.preventDefault(); // предотвращаем стандартное поведение

      const parsed = parseDisplayValue(inputValue);
      if (!onChange) return;

      if (!parsed) {
        onChange('');
        setInputValue('');
      } else {
        onChange(toIsoString(parsed));
        setInputValue(formatDisplay(parsed));
        setTempDate(parsed);
        setIsOpen(false);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    };

    const handleToggle = () => {
      if (disabled) {
        return;
      }

      setTempDate(parsedValue);
      setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
      setTempDate(parsedValue);
      setIsOpen(false);
    };

    const handleConfirm = () => {
      if (!onChange) {
        setIsOpen(false);
        return;
      }

      const iso = toIsoString(tempDate);
      onChange(iso);
      setInputValue(formatDisplay(tempDate ?? null));
      setIsOpen(false);
    };

    return (
      <div
        ref={containerRef}
        className={clsx(styles.calendarField, className, {
          [styles.calendarFieldDisabled]: disabled,
          [styles.calendarFieldOpen]: isOpen
        })}
      >
        <input
          ref={ref}
          className={styles.calendarInput}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete='off'
          aria-label='Дата рождения'
          {...rest}
        />

        <button
          type='button'
          className={styles.calendarTrigger}
          onClick={handleToggle}
          aria-label={isOpen ? 'Скрыть календарь' : 'Выбрать дату'}
          disabled={disabled}
        >
          <Icon name='icon-calendar' size={24} aria-hidden />
        </button>

        {isOpen ? (
          <div
            className={styles.calendarPopover}
            role='dialog'
            aria-modal='true'
          >
            <DatePicker
              inline
              locale='ru'
              selected={tempDate}
              onChange={(date: Date | null) => setTempDate(date)}
              minDate={minDate}
              maxDate={maxDate}
              calendarStartDay={1}
              formatWeekDay={(name: string) => {
                // Маппинг полных названий дней на сокращения
                const dayMap: Record<string, string> = {
                  понедельник: 'Пн',
                  вторник: 'Вт',
                  среда: 'Ср',
                  четверг: 'Чт',
                  пятница: 'Пт',
                  суббота: 'Сб',
                  воскресенье: 'Вс',
                  monday: 'Пн',
                  tuesday: 'Вт',
                  wednesday: 'Ср',
                  thursday: 'Чт',
                  friday: 'Пт',
                  saturday: 'Сб',
                  sunday: 'Вс'
                };
                const normalizedName = name.toLowerCase().trim();
                return dayMap[normalizedName] || name.slice(0, 2);
              }}
              renderCustomHeader={({
                date,
                changeMonth,
                changeYear,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => {
                const handleMonthChange = (month: number) => {
                  changeMonth(month);
                  // Обновляем tempDate на первый день нового месяца, если дата не выбрана
                  if (!tempDate) {
                    setTempDate(new Date(date.getFullYear(), month, 1));
                  } else {
                    // Обновляем месяц в существующей дате
                    const newDate = new Date(tempDate);
                    newDate.setMonth(month);
                    setTempDate(newDate);
                  }
                };

                const handleYearChange = (year: number) => {
                  changeYear(year);
                  // Обновляем tempDate на первый день нового года, если дата не выбрана
                  if (!tempDate) {
                    setTempDate(new Date(year, date.getMonth(), 1));
                  } else {
                    // Обновляем год в существующей дате
                    const newDate = new Date(tempDate);
                    newDate.setFullYear(year);
                    setTempDate(newDate);
                  }
                };

                return (
                  <CalendarHeader
                    date={date}
                    changeMonth={handleMonthChange}
                    changeYear={handleYearChange}
                    decreaseMonth={decreaseMonth}
                    increaseMonth={increaseMonth}
                    prevMonthButtonDisabled={prevMonthButtonDisabled}
                    nextMonthButtonDisabled={nextMonthButtonDisabled}
                  />
                );
              }}
            />

            <div className={styles.calendarActions}>
              <Button status='secondary' onClick={handleCancel}>
                Отменить
              </Button>
              <Button status='primary' onClick={handleConfirm}>
                Выбрать
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

CalendarInput.displayName = 'CalendarInput';
