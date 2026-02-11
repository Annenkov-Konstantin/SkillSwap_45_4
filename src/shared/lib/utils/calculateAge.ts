export const calculateAge = (birthDate: Date | string): number => {
  const today = new Date();
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;

  // Проверка валидности даты
  if (isNaN(birth.getTime())) {
    throw new Error('Invalid birth date');
  }

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return Math.max(0, age);
};
