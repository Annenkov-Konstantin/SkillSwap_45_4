import type { TUser } from '../../../src/entities/user';
import originalUsers from './users.json';

// Исходные данные для генерации
const maleNames = [
  'Александр',
  'Михаил',
  'Дмитрий',
  'Иван',
  'Алексей',
  'Сергей',
  'Андрей',
  'Максим',
  'Владимир',
  'Роман',
  'Николай',
  'Павел',
  'Константин',
  'Артем',
  'Евгений',
  'Василий',
  'Георгий',
  'Тимур',
  'Даниил',
  'Кирилл',
  'Виктор',
  'Олег',
  'Станислав',
  'Федор'
];

const femaleNames = [
  'Екатерина',
  'Анна',
  'Ольга',
  'Мария',
  'София',
  'Елена',
  'Наталья',
  'Ирина',
  'Татьяна',
  'Юлия',
  'Анастасия',
  'Виктория',
  'Евгения',
  'Ксения',
  'Алиса',
  'Дарья',
  'Валерия',
  'Полина',
  'Вероника',
  'Марина',
  'Светлана',
  'Людмила',
  'Галина',
  'Лариса'
];

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Краснодар',
  'Владивосток',
  'Ростов-на-Дону',
  'Уфа',
  'Нижний Новгород',
  'Красноярск',
  'Пермь',
  'Воронеж',
  'Волгоград',
  'Омск',
  'Самара',
  'Челябинск',
  'Иркутск',
  'Тюмень',
  'Барнаул',
  'Сочи',
  'Калининград',
  'Ярославль',
  'Томск',
  'Хабаровск',
  'Владимир',
  'Ставрополь',
  'Тверь'
];

const aboutMeTemplates = [
  'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
  'Фотограф-путешественник. Люблю запечатлевать моменты и делиться историями через объектив',
  'IT-специалист, увлекаюсь разработкой и менеджментом проектов. Люблю передавать знания',
  'Лингвист и преподаватель английского. Верю, что язык открывает новые миры',
  'Бизнес-тренер с 10-летним опытом. Помогаю командам расти и достигать целей',
  'Дизайнер и художник. Творчество - моя стихия, готова делиться им с другими',
  'Повар и ресторатор. Искусство кулинарии - это история, которую можно попробовать',
  'Студент, будущий психолог. Изучаю ментальное здоровье и практики осознанности',
  'Инженер и мастер на все руки. Люблю создавать вещи своими руками и учить этому других',
  'Фитнес-тренер и нутрициолог. Помогаю людям найти гармонию с телом и питанием',
  'Программист, люблю создавать удобные интерфейсы. В свободное время играю на гитаре',
  'Маркетолог и копирайтер. Умею находить общий язык с любой аудиторией',
  'Преподаватель йоги и медитации. Помогаю обрести внутренний баланс и гармонию',
  'Архитектор и дизайнер интерьеров. Превращаю пространства в уютные места для жизни',
  'Музыкант и звукорежиссер. Музыка - это универсальный язык, понятный каждому',
  'Спортсмен и тренер. Верю, что спорт меняет жизнь к лучшему',
  'Писатель и журналист. Рассказываю истории, которые вдохновляют',
  'Учитель и репетитор. Помогаю детям и взрослым находить радость в обучении',
  'Предприниматель и ментор. Делюсь опытом создания и развития бизнеса',
  'Эколог и волонтер. Забочусь о природе и учу этому других'
];

// Функция для транслитерации кириллицы в латиницу
const transliterateToLatin = (text: string): string => {
  const translitMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '.',
    '-': '-',
    _: '_'
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9._-]/g, ''); // Убираем все не-латинские символы
};

// Функция для генерации email с транслитерацией
const generateEmailWithTranslit = (name: string, index: number): string => {
  const translitFirst = transliterateToLatin(name);
  const domains = ['example.com', 'testmail.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  // Форматы email
const formats = [
  `${translitFirst}@${randomDomain}`,
  `${translitFirst}.user${index}@${randomDomain}`,
  `user.${translitFirst}${index}@${randomDomain}`,
  `${translitFirst}${index}@${randomDomain}`
];

  return formats[Math.floor(Math.random() * formats.length)];
};

// Функция для удаления дубликатов из массива
const removeDuplicates = <T>(array: T[]): T[] => {
  const result: T[] = [];
  for (const item of array) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return result;
};

// Функция для генерации уникальных навыков
const generateUniqueSkills = (count: number): string[] => {
  const skills: string[] = [];
  const maxSkills = 40;

  // Создаем пул всех возможных навыков
  const allSkills: string[] = [];
  for (let i = 1; i <= maxSkills; i++) {
    allSkills.push(`skill_${i.toString().padStart(3, '0')}`);
  }

  // Перемешиваем навыки
  const shuffledSkills = [...allSkills].sort(() => Math.random() - 0.5);

  // Берем первые count уникальных навыков
  for (let i = 0; i < Math.min(count, maxSkills); i++) {
    skills.push(shuffledSkills[i]);
  }

  return skills;
};

// Функция для генерации одного пользователя
export const generateSingleUser = (index: number): TUser => {
  const isMale = Math.random() > 0.5;
  const name = isMale
    ? maleNames[Math.floor(Math.random() * maleNames.length)]
    : femaleNames[Math.floor(Math.random() * femaleNames.length)];

  const city = cities[Math.floor(Math.random() * cities.length)];
  const email = generateEmailWithTranslit(name, index);

  // Генерация даты рождения (18-65 лет)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - (18 + Math.floor(Math.random() * 47));
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const dateOfBirth = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;

  // Генерация дат (в течение последнего года)
  const now = new Date();
  const createdAt = new Date(
    now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
  );
  const updatedAt = new Date(
    createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  );

  // Генерация уникальных навыков для каждого массива
  const favoriteSkillsCount = 2 + Math.floor(Math.random() * 3); // 2-4 навыка
  const toLearnCount = 1 + Math.floor(Math.random() * 2); // 1-3 навыка
  const canTeachCount = 1 + Math.floor(Math.random() * 3); // 1-4 навыка

  return {
    _id: `user_${index}`,
    name: name, // Только имя
    location: city,
    dateOfBirth,
    gender: isMale ? 'мужской' : 'женский',
    avatarPic: `https://randomuser.me/api/portraits/${isMale ? 'men' : 'women'}/${Math.min(index, 99)}.jpg`,
    email,
    aboutMe:
      aboutMeTemplates[Math.floor(Math.random() * aboutMeTemplates.length)],
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    favoriteSkills: generateUniqueSkills(favoriteSkillsCount),
    toLearn: generateUniqueSkills(toLearnCount),
    canTeach: generateUniqueSkills(canTeachCount)
  };
};

// Функция для генерации нескольких пользователей
export const generateUsers = (startId: number, count: number): TUser[] => {
  const users: TUser[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateSingleUser(startId + i));
  }
  return users;
};

// Функция для получения уникальных городов (без Set)
const getUniqueCities = (users: TUser[]): string[] => {
  const cities: string[] = [];
  for (const user of users) {
    if (cities.indexOf(user.location) === -1) {
      cities.push(user.location);
    }
  }
  return cities;
};

// Функция для объединения существующих и новых пользователей
export const mergeUsers = (
  existingUsers: TUser[],
  newUsers: TUser[]
): TUser[] => {
  // Находим максимальный ID в существующих пользователях
  let maxExistingId = 0;
  for (const user of existingUsers) {
    const idNum = parseInt(user._id.split('_')[1]);
    if (!isNaN(idNum) && idNum > maxExistingId) {
      maxExistingId = idNum;
    }
  }

  // Переиндексируем новых пользователей, начиная с maxExistingId + 1
  const reindexedNewUsers: TUser[] = [];
  for (let i = 0; i < newUsers.length; i++) {
    reindexedNewUsers.push({
      ...newUsers[i],
      _id: `user_${maxExistingId + i + 1}`
    });
  }

  return [...existingUsers, ...reindexedNewUsers];
};

// Функция для добавления новых пользователей к существующим
export const addUsersToExisting = (
  existingUsers: TUser[],
  count: number
): TUser[] => {
  // Находим максимальный ID в существующих пользователях
  let maxExistingId = 0;
  for (const user of existingUsers) {
    const idNum = parseInt(user._id.split('_')[1]);
    if (!isNaN(idNum) && idNum > maxExistingId) {
      maxExistingId = idNum;
    }
  }

  // Генерируем новых пользователей, начиная со следующего ID
  const newUsers = generateUsers(maxExistingId + 1, count);

  return [...existingUsers, ...newUsers];
};

// Функция для получения статистики пользователей
export const getUsersStats = (users: TUser[]) => {
  const stats = {
    total: users.length,
    male: 0,
    female: 0,
    uniqueCities: 0,
    cities: {} as Record<string, number>,
    ageGroups: {
      teens: 0,
      twenties: 0,
      thirties: 0,
      forties: 0,
      fiftiesPlus: 0
    },
    skills: {
      totalFavorite: 0,
      totalToLearn: 0,
      totalCanTeach: 0
    }
  };

  // Статистика по полу и городам
  const cityMap: Record<string, number> = {};

  for (const user of users) {
    // Статистика по полу
    if (user.gender === 'мужской') {
      stats.male++;
    } else if (user.gender === 'женский') {
      stats.female++;
    }

    // Статистика по городам
    cityMap[user.location] = (cityMap[user.location] || 0) + 1;

    // Статистика по возрасту
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(user.dateOfBirth.split('-')[0]);
    const age = currentYear - birthYear;

    if (age < 20) stats.ageGroups.teens++;
    else if (age < 30) stats.ageGroups.twenties++;
    else if (age < 40) stats.ageGroups.thirties++;
    else if (age < 50) stats.ageGroups.forties++;
    else stats.ageGroups.fiftiesPlus++;

    // Статистика по навыкам
    stats.skills.totalFavorite += user.favoriteSkills.length;
    stats.skills.totalToLearn += user.toLearn.length;
    stats.skills.totalCanTeach += user.canTeach.length;
  }

  // Подсчитываем уникальные города
  stats.uniqueCities = Object.keys(cityMap).length;
  stats.cities = cityMap;

  return stats;
};

// Функция для поиска пользователей по навыкам
export const findUsersBySkill = (users: TUser[], skillId: string): TUser[] => {
  const result: TUser[] = [];

  for (const user of users) {
    // Проверяем все три массива навыков
    let found = false;

    // Проверяем favoriteSkills
    for (const skill of user.favoriteSkills) {
      if (skill === skillId) {
        found = true;
        break;
      }
    }

    // Если не нашли, проверяем toLearn
    if (!found) {
      for (const skill of user.toLearn) {
        if (skill === skillId) {
          found = true;
          break;
        }
      }
    }

    // Если не нашли, проверяем canTeach
    if (!found) {
      for (const skill of user.canTeach) {
        if (skill === skillId) {
          found = true;
          break;
        }
      }
    }

    if (found) {
      result.push(user);
    }
  }

  return result;
};

// Функция для получения пользователей по городу
export const getUsersByCity = (users: TUser[], city: string): TUser[] => {
  const result: TUser[] = [];

  for (const user of users) {
    if (user.location === city) {
      result.push(user);
    }
  }

  return result;
};

// Генерация 40 новых пользователей, начиная с ID 11
export const newUsers = generateUsers(11, 40);

// Объединение всех пользователей (50 всего)
const allUsers = mergeUsers(originalUsers, newUsers);

// Экспорт для использования в других файлах
export const USERS_DATA = allUsers; // Массив из 50 пользователей (10 исходных + 40 новых)

// Экспорт всех функций и данных
export default {
  generateSingleUser,
  generateUsers,
  mergeUsers,
  addUsersToExisting,
  getUsersStats,
  findUsersBySkill,
  getUsersByCity,
  USERS_DATA
};
