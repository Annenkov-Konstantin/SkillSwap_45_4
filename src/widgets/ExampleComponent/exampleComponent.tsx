import { Input } from '../../shared/ui/input/input';
import type { FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.css';

export const ExampleComponent: FC = () => {
  const [value, setValue] = useState(''); // email
  const [password, setPassword] = useState(''); // пароль
  const [name, setName] = useState(''); // имя
  const [search, setSearch] = useState(''); // поиск

  // Отдельные состояния ошибок для каждого поля
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const handleEmailChange = (newValue: string) => {
    setValue(newValue);
    // Валидация email: минимум 3 символа
    setEmailError(newValue.length < 3 && newValue.length > 0);
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    // Валидация пароля: минимум 6 символов
    setPasswordError(newPassword.length < 6);
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    // Валидация имени: минимум 2 символа
    setNameError(newName.length < 2 && newName.length > 0);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    // Валидация поиска: минимум 2 символа
    setSearchError(newSearch.length < 2 && newSearch.length > 0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Тестирование Input в контексте</h2>

      {/* Инпут для email */}
      <Input
        type='email'
        pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        placeholder='Введите email'
        value={value}
        onChange={handleEmailChange}
        error={emailError}
        errorText='Слишком коротко (минимум 3 символа)'
        name='email-input'
      />

      {/* Инпут для пароля */}
      <Input
        type='password'
        placeholder='Введите ваш пароль'
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
        errorText='Пароль слишком короткий (минимум 6 символов)'
        name='password-input'
      />

      {/* Инпут для имени */}
      <Input
        type='text'
        placeholder='Введите ваше имя'
        value={name}
        onChange={handleNameChange}
        error={nameError}
        errorText='Имя должно быть не короче 2 символов'
        name='name-input'
      />

      {/* Инпут для поиска */}
      <Input
        type='text'
        placeholder='Искать навык'
        value={search}
        onChange={handleSearchChange}
        error={searchError}
        errorText='Поиск должен быть не короче 2 символов'
        name='search-input'
        isSearch={true}
      />
    </div>
  );
};
