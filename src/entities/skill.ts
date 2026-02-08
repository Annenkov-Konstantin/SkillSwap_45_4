export type TSkillStatus =
  | 'inWishlist'
  | 'awaitingResponse'
  | 'accepted'
  | 'rejected'
  | 'completed';

export const CATEGORIES = {
  BUSINESS_AND_CAREER: 'Бизнес и карьера',
  CREATIVITY_AND_ART: 'Творчество и искусство',
  LANGUAGES: 'Иностранные языки',
  EDUCATION_AND_DEVELOPMENT: 'Образование и развитие',
  HOME_COSINESS: 'Дом и уют',
  HEALTH_AND_LIFESTYLE: 'Здоровье и лайфстайл'
} as const;

export const ALL_SUBCATEGORIES = {
  // Бизнес
  TEAM_MANAGEMENT: 'Управление командой',
  MARKETING_ADVERTISEMENT: 'Маркетинг и реклама',
  SALES_AND_NEGOTIATIONS: 'Продажи и переговоры',
  PERSONAL_BRAND: 'Личный бренд',
  RESUME_AND_INTERVIEW: 'Резюме и собеседование',
  TIME_MANAGEMENT: 'Тайм-менеджмент',

  // Творчество
  DRAWING_AND_ILLUSTRATION: 'Рисование и иллюстрация',
  PHOTOGRAPHY: 'Фотография',
  VIDEO_EDITING: 'Видеомонтаж',
  MUSIC_AND_SOUND: 'Музыка и звук',
  ACTING_SKILLS: 'Актёрское мастерство',
  CREATIVE_WRITING: 'Креативное письмо',
  ART_THERAPY: 'Арт-терапия',
  DECOR_AND_DIY: 'Декор и DIY',

  // Языки
  ENGLISH: 'Английский',
  FRENCH: 'Французский',
  SPANISH: 'Испанский',
  GERMAN: 'Немецкий',
  CHINESE: 'Китайский',
  JAPANESE: 'Японский',
  EXAM_PREPARATION: 'Подготовка к экзаменам (IELTS, TOEFL)',

  // Образование
  PERSONAL_GROWTH: 'Личностное развитие',
  LEARNING_SKILLS: 'Навыки обучения',
  COGNITIVE_TECHNIQUES: 'Когнитивные техники',
  FAST_READING: 'Скорочтение',
  TEACHING_SKILLS: 'Навыки преподавания',
  COACHING: 'Коучинг',

  // Дом
  CLEANING_AND_ORDER: 'Уборка и организация',
  HOUSEHOLD_FINANCES: 'Домашние финансы',
  COOKING: 'Приготовление еды',
  HOUSE_PLANTS: 'Домашние растения',
  RENOVATION: 'Ремонт',
  STORAGE_OF_THINGS: 'Хранение вещей',

  // Здоровье
  YOGA_AND_MEDITATION: 'Йога и медитация',
  NUTRITION_AND_HEALTHY_LIFESTYLE: 'Питание и ЗОЖ',
  MENTAL_HEALTH: 'Ментальное здоровье',
  AWARENESS: 'Осознанность',
  PHYSICAL_TRAINING: 'Физические тренировки',
  SLEEP_AND_RECOVERY: 'Сон и восстановление',
  WORK_LIFE_BALANCE: 'Баланс жизни и работы'
} as const;

// Типы на основе констант
export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];
export type Subcategory =
  (typeof ALL_SUBCATEGORIES)[keyof typeof ALL_SUBCATEGORIES];

// Маппинг категорий к подкатегориям
export const SUBCATEGORIES_BY_CATEGORY: Record<Category, Subcategory[]> = {
  [CATEGORIES.BUSINESS_AND_CAREER]: [
    ALL_SUBCATEGORIES.TEAM_MANAGEMENT,
    ALL_SUBCATEGORIES.MARKETING_ADVERTISEMENT,
    ALL_SUBCATEGORIES.SALES_AND_NEGOTIATIONS,
    ALL_SUBCATEGORIES.PERSONAL_BRAND,
    ALL_SUBCATEGORIES.RESUME_AND_INTERVIEW,
    ALL_SUBCATEGORIES.TIME_MANAGEMENT
  ],
  [CATEGORIES.CREATIVITY_AND_ART]: [
    ALL_SUBCATEGORIES.DRAWING_AND_ILLUSTRATION,
    ALL_SUBCATEGORIES.PHOTOGRAPHY,
    ALL_SUBCATEGORIES.VIDEO_EDITING,
    ALL_SUBCATEGORIES.MUSIC_AND_SOUND,
    ALL_SUBCATEGORIES.ACTING_SKILLS,
    ALL_SUBCATEGORIES.CREATIVE_WRITING,
    ALL_SUBCATEGORIES.ART_THERAPY,
    ALL_SUBCATEGORIES.DECOR_AND_DIY
  ],
  [CATEGORIES.LANGUAGES]: [
    ALL_SUBCATEGORIES.ENGLISH,
    ALL_SUBCATEGORIES.FRENCH,
    ALL_SUBCATEGORIES.SPANISH,
    ALL_SUBCATEGORIES.GERMAN,
    ALL_SUBCATEGORIES.CHINESE,
    ALL_SUBCATEGORIES.JAPANESE,
    ALL_SUBCATEGORIES.EXAM_PREPARATION
  ],
  [CATEGORIES.EDUCATION_AND_DEVELOPMENT]: [
    ALL_SUBCATEGORIES.PERSONAL_GROWTH,
    ALL_SUBCATEGORIES.LEARNING_SKILLS,
    ALL_SUBCATEGORIES.COGNITIVE_TECHNIQUES,
    ALL_SUBCATEGORIES.FAST_READING,
    ALL_SUBCATEGORIES.TEACHING_SKILLS,
    ALL_SUBCATEGORIES.COACHING
  ],
  [CATEGORIES.HOME_COSINESS]: [
    ALL_SUBCATEGORIES.CLEANING_AND_ORDER,
    ALL_SUBCATEGORIES.HOUSEHOLD_FINANCES,
    ALL_SUBCATEGORIES.COOKING,
    ALL_SUBCATEGORIES.HOUSE_PLANTS,
    ALL_SUBCATEGORIES.RENOVATION,
    ALL_SUBCATEGORIES.STORAGE_OF_THINGS
  ],
  [CATEGORIES.HEALTH_AND_LIFESTYLE]: [
    ALL_SUBCATEGORIES.YOGA_AND_MEDITATION,
    ALL_SUBCATEGORIES.NUTRITION_AND_HEALTHY_LIFESTYLE,
    ALL_SUBCATEGORIES.MENTAL_HEALTH,
    ALL_SUBCATEGORIES.AWARENESS,
    ALL_SUBCATEGORIES.PHYSICAL_TRAINING,
    ALL_SUBCATEGORIES.SLEEP_AND_RECOVERY,
    ALL_SUBCATEGORIES.WORK_LIFE_BALANCE
  ]
} as const;

// Тип для связанных подкатегорий по категориям
export type SubcategoryByCategory = {
  [K in Category]: (typeof SUBCATEGORIES_BY_CATEGORY)[K][number];
};

// Тип TSkill с гарантированной согласованностью через условные типы
export type TSkill = {
  _id: string;
  skillTitle: string;
  skillDescription: string;
  skillImages: string[];
  skillLikes: number;
  skillTagging: string[];
  skillStatus: TSkillStatus;
  skillMentorId: string;
  skillCreatedAt: string;
  skillUpdatedAt: string;
} & {
  [K in Category]: {
    skillCategory: K;
    skillSubCategory: SubcategoryByCategory[K];
  };
}[Category];
