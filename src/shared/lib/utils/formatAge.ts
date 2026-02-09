/**
 * Возвращает правильную форму слова "год" для указанного возраста
 * @param age - возраст
 * @returns строку "год", "года" или "лет"
 */
export const formatAge = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  // Исключения 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет';
  }

  if (lastDigit === 1) {
    return 'год';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }

  return 'лет';
};

/**
 * Форматирует возраст с правильным словом
 * @param age - возраст
 * @returns строку вида "25 лет"
 */
export const formatAgeWithWord = (age: number): string => {
  return `${age} ${formatAge(age)}`;
};
