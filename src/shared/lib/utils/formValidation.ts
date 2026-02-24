// Простая валидация email через регулярное выражение
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Проверка длины пароля с тремя статусами
export const checkPasswordLengthStatus = (
  password: string
): 'empty' | 'short' | 'strong' => {
  if (!password) return 'empty';
  if (password.length < 8) return 'short';
  return 'strong';
};
