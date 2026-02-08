import {
  Category,
  Subcategory,
  SUBCATEGORIES_BY_CATEGORY,
  SubcategoryByCategory,
  TSkill,
  TSkillStatus,
  CATEGORIES,
  ALL_SUBCATEGORIES
} from '../../../src/entities/skill';

// Функция для получения подкатегорий по категории
export function getSubcategoriesForCategory(category: Category): Subcategory[] {
  return SUBCATEGORIES_BY_CATEGORY[category]
}

// Валидатор соответствия категории и подкатегории
export function isValidSubcategoryForCategory(
  category: Category,
  subcategory: Subcategory
): boolean {
  return SUBCATEGORIES_BY_CATEGORY[category].includes(subcategory)
}

// Утилита для создания TSkill с проверкой
export function createTSkill<C extends Category>(
  skillData: Omit<TSkill, '_id' | 'createdAt' | 'updatedAt'> & {
    category: C
    subCategory: SubcategoryByCategory[C]
    _id?: string
    createdAt?: string
    updatedAt?: string
  }
): TSkill {
  if (
    !isValidSubcategoryForCategory(skillData.category, skillData.subCategory)
  ) {
    throw new Error(
      `Подкатегория "${skillData.subCategory}" не принадлежит категории "${skillData.category}"`
    )
  }

  return {
    _id: skillData._id || `skill_${Date.now()}`,
    createdAt: skillData.createdAt || new Date().toISOString(),
    updatedAt: skillData.updatedAt || new Date().toISOString(),
    ...skillData,
  } as TSkill
}

// Распределение 40 скиллов по категориям
const CATEGORY_DISTRIBUTION: Record<Category, number> = {
  [CATEGORIES.BUSINESS_AND_CAREER]: 7,      // 17.5% (7 из 40)
  [CATEGORIES.CREATIVITY_AND_ART]: 7,       // 17.5%
  [CATEGORIES.LANGUAGES]: 6,               // 15%
  [CATEGORIES.EDUCATION_AND_DEVELOPMENT]: 6, // 15%
  [CATEGORIES.HOME_COSINESS]: 7,           // 17.5%
  [CATEGORIES.HEALTH_AND_LIFESTYLE]: 7,     // 17.5%
};

// Типизированные данные для генерации навыков
const skillTemplates: Record<Subcategory, {
  baseTitles: string[];
  baseDescriptions: string[];
  tags: string[];
}> = {
  // Бизнес и карьера
  [ALL_SUBCATEGORIES.TEAM_MANAGEMENT]: {
    baseTitles: [
      "Эффективное управление командой",
      "Лидерство и мотивация сотрудников",
      "Управление распределёнными командами"
    ],
    baseDescriptions: [
      "Научу выстраивать процессы управления командой, делегированию задач и повышению эффективности работы.",
      "Практические техники мотивации, проведения совещаний и разрешения конфликтов в команде.",
      "Методологии управления проектами и повышения продуктивности команды."
    ],
    tags: ["management", "leadership", "team", "productivity"]
  },
  
  [ALL_SUBCATEGORIES.MARKETING_ADVERTISEMENT]: {
    baseTitles: [
      "Современный маркетинг в digital",
      "SMM и продвижение в соцсетях",
      "Контекстная реклама с нуля"
    ],
    baseDescriptions: [
      "Научу строить маркетинговые стратегии для digital-проектов.",
      "Продвижение бренда в социальных сетях: от контента до таргетинга.",
      "Настройка и оптимизация рекламных кампаний в Яндекс.Директ и Google Ads."
    ],
    tags: ["marketing", "smm", "advertising", "digital"]
  },
  
  [ALL_SUBCATEGORIES.SALES_AND_NEGOTIATIONS]: {
    baseTitles: [
      "Искусство продаж и переговоров",
      "Техники холодных звонков",
      "Закрытие сделок и работа с возражениями"
    ],
    baseDescriptions: [
      "Научу эффективным техникам продаж и ведения переговоров.",
      "Преодоление страха холодных звонков и повышение конверсии.",
      "Методики работы с возражениями и завершения сделок."
    ],
    tags: ["sales", "negotiations", "business", "communication"]
  },
  
  [ALL_SUBCATEGORIES.PERSONAL_BRAND]: {
    baseTitles: [
      "Создание личного бренда",
      "Позиционирование эксперта в отрасли",
      "Личный бренд для карьерного роста"
    ],
    baseDescriptions: [
      "Научу создавать и развивать сильный личный бренд.",
      "Стратегии позиционирования себя как эксперта в своей области.",
      "Использование личного бренда для карьерного продвижения."
    ],
    tags: ["personal-brand", "branding", "career", "expert"]
  },
  
  [ALL_SUBCATEGORIES.RESUME_AND_INTERVIEW]: {
    baseTitles: [
      "Создание идеального резюме",
      "Подготовка к собеседованию",
      "Карьерный коучинг"
    ],
    baseDescriptions: [
      "Научу писать резюме, которое заметят рекрутеры.",
      "Полная подготовка к техническим и HR-собеседованиям.",
      "Помощь в планировании карьеры и профессиональном развитии."
    ],
    tags: ["resume", "interview", "career", "coaching"]
  },
  
  [ALL_SUBCATEGORIES.TIME_MANAGEMENT]: {
    baseTitles: [
      "Тайм-менеджмент для эффективности",
      "Приоритизация задач",
      "Борьба с прокрастинацией"
    ],
    baseDescriptions: [
      "Научу управлять временем и повышать личную эффективность.",
      "Методы расстановки приоритетов и планирования дня.",
      "Техники борьбы с прокрастинацией и поддержания фокуса."
    ],
    tags: ["time-management", "productivity", "efficiency", "planning"]
  },
  
  // Творчество и искусство
  [ALL_SUBCATEGORIES.DRAWING_AND_ILLUSTRATION]: {
    baseTitles: [
      "Основы рисунка и скетчинга",
      "Цифровая иллюстрация в Procreate",
      "Академический рисунок"
    ],
    baseDescriptions: [
      "Научу основам рисунка, композиции и работе с материалами.",
      "Создание цифровых иллюстраций на iPad в Procreate.",
      "Классические техники академического рисунка."
    ],
    tags: ["drawing", "illustration", "art", "creative"]
  },
  
  [ALL_SUBCATEGORIES.PHOTOGRAPHY]: {
    baseTitles: [
      "Профессиональная фотография с нуля",
      "Обработка фотографий в Lightroom",
      "Портретная фотография и работа со светом"
    ],
    baseDescriptions: [
      "Научу основам композиции, работе с настройками камеры и созданию качественных снимков.",
      "Полный цикл от съёмки до постобработки. Работа с естественным и студийным светом.",
      "Секреты профессиональных фотографов и создание портфолио."
    ],
    tags: ["photography", "camera", "lightroom", "creative"]
  },
  
  [ALL_SUBCATEGORIES.VIDEO_EDITING]: {
    baseTitles: [
      "Видеомонтаж в Adobe Premiere Pro",
      "Создание видео для YouTube",
      "Цветокоррекция и анимация"
    ],
    baseDescriptions: [
      "Научу монтировать видео от простых роликов до сложных проектов.",
      "Создание контента для YouTube: от идеи до публикации.",
      "Профессиональная цветокоррекция и основы моушн-дизайна."
    ],
    tags: ["video", "editing", "premiere", "youtube"]
  },
  
  [ALL_SUBCATEGORIES.MUSIC_AND_SOUND]: {
    baseTitles: [
      "Основы звукорежиссуры",
      "Создание музыки в FL Studio",
      "Подкастинг и озвучка"
    ],
    baseDescriptions: [
      "Научу основам работы со звуком, сведению и мастерингу.",
      "Создание музыки с нуля в цифровых аудио рабочих станциях.",
      "Запись и обработка подкастов, профессиональная озвучка."
    ],
    tags: ["music", "sound", "audio", "production"]
  },
  
  [ALL_SUBCATEGORIES.ACTING_SKILLS]: {
    baseTitles: [
      "Основы актёрского мастерства",
      "Сценическая речь и движение",
      "Импровизация в жизни и на сцене"
    ],
    baseDescriptions: [
      "Развитие актёрских способностей для сцены и жизни.",
      "Техники сценической речи, пластики и выразительности тела.",
      "Искусство импровизации и спонтанности в общении."
    ],
    tags: ["acting", "theater", "improvisation", "communication"]
  },
  
  [ALL_SUBCATEGORIES.CREATIVE_WRITING]: {
    baseTitles: [
      "Креативное письмо",
      "Создание сценариев",
      "Литературное мастерство"
    ],
    baseDescriptions: [
      "Научу писать художественные тексты, рассказы и эссе.",
      "Создание сценариев для видео, подкастов и рекламы.",
      "Развитие литературного стиля и писательских навыков."
    ],
    tags: ["writing", "creative", "literature", "storytelling"]
  },
  
  [ALL_SUBCATEGORIES.ART_THERAPY]: {
    baseTitles: [
      "Арт-терапия для снятия стресса",
      "Творчество как самопознание",
      "Рисование для релаксации"
    ],
    baseDescriptions: [
      "Использование творчества для психологической разгрузки и самопознания.",
      "Техники арт-терапии для работы с эмоциями и стрессом.",
      "Рисование как медитация и способ восстановления энергии."
    ],
    tags: ["art-therapy", "creativity", "relaxation", "self-care"]
  },
  
  [ALL_SUBCATEGORIES.DECOR_AND_DIY]: {
    baseTitles: [
      "Создание предметов интерьера",
      "Роспись мебели и декор",
      "DIY проекты для дома"
    ],
    baseDescriptions: [
      "Научу создавать уникальные предметы декора своими руками.",
      "Техники росписи мебели и создания домашнего уюта.",
      "DIY проекты от простых до сложных для украшения дома."
    ],
    tags: ["diy", "decor", "home", "crafts"]
  },
  
  // Языки
  [ALL_SUBCATEGORIES.ENGLISH]: {
    baseTitles: [
      "Английский для IT-специалистов",
      "Деловой английский для переговоров",
      "Подготовка к IELTS/TOEFL"
    ],
    baseDescriptions: [
      "Специализированный курс технического английского для программистов и IT-специалистов.",
      "Ведение деловой переписки, проведение презентаций и переговоров на английском.",
      "Эффективная подготовка к международным экзаменам с гарантией результата."
    ],
    tags: ["english", "language", "it", "business"]
  },
  
  [ALL_SUBCATEGORIES.FRENCH]: {
    baseTitles: [
      "Французский с нуля",
      "Разговорный французский",
      "Французский для путешествий"
    ],
    baseDescriptions: [
      "Изучение французского языка с основ до свободного общения.",
      "Развитие разговорных навыков и понимания на слух.",
      "Французский для комфортных путешествий по франкоговорящим странам."
    ],
    tags: ["french", "language", "travel", "communication"]
  },
  
  [ALL_SUBCATEGORIES.SPANISH]: {
    baseTitles: [
      "Испанский для начинающих",
      "Испанский разговорный клуб",
      "Испанский язык и культура"
    ],
    baseDescriptions: [
      "Быстрый старт в изучении испанского языка.",
      "Практика разговорной речи в неформальной обстановке.",
      "Погружение в испанскую культуру через изучение языка."
    ],
    tags: ["spanish", "language", "culture", "communication"]
  },
  
  [ALL_SUBCATEGORIES.GERMAN]: {
    baseTitles: [
      "Немецкий для работы",
      "Интенсивный курс немецкого",
      "Немецкий для иммиграции"
    ],
    baseDescriptions: [
      "Немецкий язык для делового общения и работы в Германии.",
      "Быстрое освоение немецкого языка по интенсивной методике.",
      "Подготовка к переезду в Германию: язык, культура, документы."
    ],
    tags: ["german", "language", "work", "immigration"]
  },
  
  [ALL_SUBCATEGORIES.CHINESE]: {
    baseTitles: [
      "Китайский язык с нуля",
      "Деловой китайский",
      "Китайская иероглифика"
    ],
    baseDescriptions: [
      "Изучение китайского языка, тонов и основ иероглифики.",
      "Китайский для ведения бизнеса с китайскими партнерами.",
      "Освоение системы китайских иероглифов и каллиграфии."
    ],
    tags: ["chinese", "language", "business", "characters"]
  },
  
  [ALL_SUBCATEGORIES.JAPANESE]: {
    baseTitles: [
      "Японский язык для аниме-фанатов",
      "Японский для туристов",
      "Изучение каны и кандзи"
    ],
    baseDescriptions: [
      "Изучение японского через аниме, мангу и поп-культуру.",
      "Базовый японский для комфортного путешествия по Японии.",
      "Освоение японских азбук (хирагана, катакана) и иероглифов."
    ],
    tags: ["japanese", "language", "anime", "travel"]
  },
  
  [ALL_SUBCATEGORIES.EXAM_PREPARATION]: {
    baseTitles: [
      "Подготовка к IELTS",
      "Сдача TOEFL на высокий балл",
      "Экзамены по иностранным языкам"
    ],
    baseDescriptions: [
      "Эффективная подготовка к IELTS с опытным преподавателем.",
      "Стратегии сдачи TOEFL и достижения высоких результатов.",
      "Подготовка к международным языковым экзаменам любого уровня."
    ],
    tags: ["exam", "ielts", "toefl", "preparation"]
  },
  
  // Образование и развитие
  [ALL_SUBCATEGORIES.PERSONAL_GROWTH]: {
    baseTitles: [
      "Личностный рост и саморазвитие",
      "Постановка и достижение целей",
      "Развитие эмоционального интеллекта"
    ],
    baseDescriptions: [
      "Системный подход к личностному росту и самосовершенствованию.",
      "Методы постановки целей и их эффективного достижения.",
      "Развитие EQ для успеха в карьере и личной жизни."
    ],
    tags: ["personal-growth", "development", "goals", "eq"]
  },
  
  [ALL_SUBCATEGORIES.LEARNING_SKILLS]: {
    baseTitles: [
      "Эффективные методы обучения",
      "Как учиться быстрее и лучше",
      "Развитие памяти и внимания"
    ],
    baseDescriptions: [
      "Научу учиться эффективно, экономя время и силы.",
      "Методы ускоренного обучения и усвоения информации.",
      "Техники развития памяти, концентрации и когнитивных способностей."
    ],
    tags: ["learning", "study", "memory", "cognitive"]
  },
  
  [ALL_SUBCATEGORIES.COGNITIVE_TECHNIQUES]: {
    baseTitles: [
      "Когнитивные техники для мышления",
      "Развитие критического мышления",
      "Ментальные модели для успеха"
    ],
    baseDescriptions: [
      "Техники улучшения мышления и решения сложных задач.",
      "Развитие критического мышления для анализа информации.",
      "Использование ментальных моделей для принятия решений."
    ],
    tags: ["cognitive", "thinking", "critical-thinking", "mental-models"]
  },
  
  [ALL_SUBCATEGORIES.FAST_READING]: {
    baseTitles: [
      "Скорочтение и понимание текста",
      "Увеличение скорости чтения",
      "Эффективная работа с информацией"
    ],
    baseDescriptions: [
      "Научу читать быстрее без потери понимания.",
      "Техники увеличения скорости чтения в 2-3 раза.",
      "Методы быстрой обработки больших объемов информации."
    ],
    tags: ["reading", "speed-reading", "information", "learning"]
  },
  
  [ALL_SUBCATEGORIES.TEACHING_SKILLS]: {
    baseTitles: [
      "Навыки преподавания",
      "Как стать эффективным преподавателем",
      "Методика обучения взрослых"
    ],
    baseDescriptions: [
      "Развитие педагогических навыков для преподавания любой дисциплины.",
      "Станьте преподавателем, которого слушают и понимают.",
      "Особенности обучения взрослых и методика андрагогики."
    ],
    tags: ["teaching", "education", "pedagogy", "adult-learning"]
  },
  
  [ALL_SUBCATEGORIES.COACHING]: {
    baseTitles: [
      "Основы коучинга",
      "Коучинг для личного развития",
      "Профессиональный коучинг"
    ],
    baseDescriptions: [
      "Базовые принципы и техники коучинга.",
      "Использование коучинга для личного роста и развития.",
      "Становление профессиональным коучем с клиентской базой."
    ],
    tags: ["coaching", "development", "professional", "guidance"]
  },
  
  // Дом и уют
  [ALL_SUBCATEGORIES.CLEANING_AND_ORDER]: {
    baseTitles: [
      "Система поддержания порядка",
      "Эффективная уборка дома",
      "Организация пространства"
    ],
    baseDescriptions: [
      "Создание системы для поддержания чистоты и порядка в доме.",
      "Техники быстрой и эффективной уборки без стресса.",
      "Организация пространства для комфортной жизни."
    ],
    tags: ["cleaning", "organization", "home", "order"]
  },
  
  [ALL_SUBCATEGORIES.HOUSEHOLD_FINANCES]: {
    baseTitles: [
      "Управление семейным бюджетом",
      "Финансовая грамотность для дома",
      "Экономия на бытовых расходах"
    ],
    baseDescriptions: [
      "Научу вести семейный бюджет и планировать расходы.",
      "Основы финансовой грамотности для управления домашними финансами.",
      "Способы экономии на коммунальных услугах и бытовых расходах."
    ],
    tags: ["finance", "budget", "home", "saving"]
  },
  
  [ALL_SUBCATEGORIES.COOKING]: {
    baseTitles: [
      "Итальянская кухня: от пасты до ризотто",
      "Здоровое питание и ПП",
      "Выпечка и десерты для начинающих"
    ],
    baseDescriptions: [
      "Научу готовить настоящую итальянскую пасту, соусы и традиционные блюда Италии.",
      "Принципы сбалансированного питания, составление меню и приготовление полезных блюд.",
      "Освоим базовые техники выпечки, работа с тестом и создание вкусных десертов."
    ],
    tags: ["cooking", "food", "recipes", "healthy"]
  },
  
  [ALL_SUBCATEGORIES.HOUSE_PLANTS]: {
    baseTitles: [
      "Уход за комнатными растениями",
      "Создание домашнего сада",
      "Размножение растений"
    ],
    baseDescriptions: [
      "Научу правильно ухаживать за комнатными растениями.",
      "Создание зеленого уголка в квартире или доме.",
      "Техники размножения растений и создания композиций."
    ],
    tags: ["plants", "gardening", "home", "greenery"]
  },
  
  [ALL_SUBCATEGORIES.RENOVATION]: {
    baseTitles: [
      "Ремонт квартиры своими руками",
      "Дизайн интерьера на бюджет",
      "Отделочные работы для начинающих"
    ],
    baseDescriptions: [
      "Планирование и выполнение ремонта без привлечения бригады.",
      "Создание красивого интерьера с минимальным бюджетом.",
      "Освоение основных отделочных работ: покраска, поклейка обоев, укладка плитки."
    ],
    tags: ["renovation", "diy", "home", "interior"]
  },
  
  [ALL_SUBCATEGORIES.STORAGE_OF_THINGS]: {
    baseTitles: [
      "Системы хранения вещей",
      "Оптимизация пространства",
      "Избавление от хлама"
    ],
    baseDescriptions: [
      "Создание эффективных систем хранения для любого пространства.",
      "Максимальное использование доступного пространства для хранения.",
      "Методы избавления от ненужных вещей и организации оставшихся."
    ],
    tags: ["storage", "organization", "minimalism", "space"]
  },
  
  // Здоровье и лайфстайл
  [ALL_SUBCATEGORIES.YOGA_AND_MEDITATION]: {
    baseTitles: [
      "Йога для начинающих",
      "Медитация и управление стрессом",
      "Утренние практики для энергии"
    ],
    baseDescriptions: [
      "Базовые асаны, правильное дыхание и последовательности для домашней практики.",
      "Техники медитации для снижения стресса, улучшения концентрации и качества сна.",
      "Комплекс утренних упражнений для заряда энергии на весь день."
    ],
    tags: ["yoga", "meditation", "health", "wellness"]
  },
  
  [ALL_SUBCATEGORIES.NUTRITION_AND_HEALTHY_LIFESTYLE]: {
    baseTitles: [
      "Основы правильного питания",
      "Здоровый образ жизни",
      "Детокс и очищение организма"
    ],
    baseDescriptions: [
      "Принципы сбалансированного питания для здоровья и энергии.",
      "Комплексный подход к здоровому образу жизни.",
      "Методы безопасного очищения организма и детокса."
    ],
    tags: ["nutrition", "health", "lifestyle", "detox"]
  },
  
  [ALL_SUBCATEGORIES.MENTAL_HEALTH]: {
    baseTitles: [
      "Забота о ментальном здоровье",
      "Управление тревогой и стрессом",
      "Психологическая саморегуляция"
    ],
    baseDescriptions: [
      "Практики поддержания и улучшения ментального здоровья.",
      "Техники работы с тревогой, страхами и стрессовыми состояниями.",
      "Методы саморегуляции эмоционального состояния."
    ],
    tags: ["mental-health", "psychology", "stress", "wellbeing"]
  },
  
  [ALL_SUBCATEGORIES.AWARENESS]: {
    baseTitles: [
      "Практика осознанности",
      "Mindfulness в повседневной жизни",
      "Развитие внимательности"
    ],
    baseDescriptions: [
      "Техники развития осознанности и присутствия в моменте.",
      "Интеграция mindfulness в повседневную жизнь.",
      "Развитие внимательности к себе, своим мыслям и эмоциям."
    ],
    tags: ["mindfulness", "awareness", "meditation", "presence"]
  },
  
  [ALL_SUBCATEGORIES.PHYSICAL_TRAINING]: {
    baseTitles: [
      "Домашние тренировки без оборудования",
      "Функциональный тренинг",
      "Силовые упражнения для всех"
    ],
    baseDescriptions: [
      "Эффективные тренировки дома без специального оборудования.",
      "Развитие функциональной силы для повседневной жизни.",
      "Силовые тренировки для любого уровня подготовки."
    ],
    tags: ["fitness", "training", "workout", "strength"]
  },
  
  [ALL_SUBCATEGORIES.SLEEP_AND_RECOVERY]: {
    baseTitles: [
      "Качественный сон и восстановление",
      "Гигиена сна",
      "Техники быстрого засыпания"
    ],
    baseDescriptions: [
      "Научу налаживать режим сна для полноценного восстановления.",
      "Правила гигиены сна для улучшения его качества.",
      "Техники расслабления для быстрого засыпания и крепкого сна."
    ],
    tags: ["sleep", "recovery", "health", "rest"]
  },
  
  [ALL_SUBCATEGORIES.WORK_LIFE_BALANCE]: {
    baseTitles: [
      "Баланс работы и личной жизни",
      "Предотвращение выгорания",
      "Гармония в разных сферах жизни"
    ],
    baseDescriptions: [
      "Научу находить баланс между работой, семьей и личными интересами.",
      "Стратегии профилактики профессионального выгорания.",
      "Создание гармоничной жизни с вниманием ко всем важным сферам."
    ],
    tags: ["work-life-balance", "burnout", "harmony", "life"]
  }
};

// Общий шаблон для подкатегорий без специального шаблона
const getDefaultTemplate = (subCategory: Subcategory) => ({
  baseTitles: [
    `${subCategory} - профессиональный курс`,
    `Изучение ${subCategory.toLowerCase()}`,
    `Мастер-класс по ${subCategory.toLowerCase()}`
  ],
  baseDescriptions: [
    `Комплексное обучение ${subCategory.toLowerCase()}. Теория и практика с обратной связью.`,
    `Освойте ${subCategory.toLowerCase()} с нуля до профессионального уровня.`,
    `Практический курс по ${subCategory.toLowerCase()} с индивидуальным подходом.`
  ],
  tags: [subCategory.toLowerCase().replace(/\s+/g, '-'), 'learning', 'course', 'skill']
});

export const generateSkills = (count: number): TSkill[] => {
  const skills: TSkill[] = [];
  const statuses: TSkillStatus[] = ['inWishlist', 'awaitingResponse', 'accepted', 'rejected', 'completed'];
  
  // Создаем пул категорий согласно распределению
  const categoryPool: Category[] = [];
  
  Object.entries(CATEGORY_DISTRIBUTION).forEach(([category, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      categoryPool.push(category as Category);
    }
  });
  
  // Перемешиваем пул категорий
  const shuffledCategories = [...categoryPool].sort(() => Math.random() - 0.5);
  
  // Для каждого скилла
  for (let i = 0; i < count && i < shuffledCategories.length; i++) {
    const category = shuffledCategories[i];
    
    // Получаем подкатегории для выбранной категории
    const subcategoriesForCategory = SUBCATEGORIES_BY_CATEGORY[category];
    
    // Случайный выбор подкатегории
    const randomSubcategoryIndex = Math.floor(Math.random() * subcategoriesForCategory.length);
    const subCategory = subcategoriesForCategory[randomSubcategoryIndex];
    
    // Генерируем 4 уникальных изображения
    const images = Array.from({ length: 4 }, (_, j) => {
      // Уникальный ID для каждого изображения
      const imageId = i * 10 + j;
      return `https://picsum.photos/id/${imageId}/600/400`;
    });
    
    // Выбираем или получаем шаблон для подкатегории
    const template = skillTemplates[subCategory] || getDefaultTemplate(subCategory);
    const titleIndex = Math.floor(Math.random() * template.baseTitles.length);
    const descIndex = Math.floor(Math.random() * template.baseDescriptions.length);
    
    const title = template.baseTitles[titleIndex];
    const description = template.baseDescriptions[descIndex];
    const baseTags = template.tags;
    
    // Генерируем ID категории для тегов (например, "business" для "Бизнес и карьера")
    const categoryTag = Object.entries(CATEGORIES).find(([_, value]) => value === category)?.[0]?.toLowerCase() || 'general';
    
    // Создаём объект навыка с помощью createTSkill
    try {
      const skill = createTSkill({
        _id: `skill_${(i + 1).toString().padStart(3, '0')}`,
        title,
        description,
        category,
        subCategory,
        images,
        likes: Math.floor(Math.random() * 100) + 20, // Минимум 20 лайков
        tagging: [...baseTags, `skill${i + 1}`, categoryTag],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        mentorId: `user_${Math.floor(Math.random() * 10) + 1}`.padStart(6, '0'),
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      skills.push(skill);
    } catch (error) {
      console.error(`Ошибка при создании навыка ${i + 1}:`, error);
    }
  }
  
  return skills;
};

// Экспортируем готовые данные (40 скиллов)
export const SKILLS_DATA = generateSkills(40);

// Функция для получения смешанных данных: базовые + сгенерированные
export const getMixedSkillsData = (baseSkills: TSkill[]): TSkill[] => {
  const baseCount = baseSkills.length;
  const generatedCount = 40 - baseCount;
  
  if (generatedCount <= 0) {
    return baseSkills.slice(0, 40);
  }
  
  const generatedSkills = generateSkills(generatedCount);
  
  // Обновляем ID сгенерированных скиллов, чтобы они продолжались после базовых
  generatedSkills.forEach((skill, index) => {
    skill._id = `skill_${(baseCount + index + 1).toString().padStart(3, '0')}`;
  });
  
  return [...baseSkills, ...generatedSkills];
};

// Вспомогательная функция для проверки распределения
export const getCategoryDistributionStats = (skills: TSkill[]): Record<Category, number> => {
  const stats: Record<Category, number> = {} as Record<Category, number>;
  
  Object.values(CATEGORIES).forEach(category => {
    stats[category] = 0;
  });
  
  skills.forEach(skill => {
    stats[skill.category]++;
  });
  
  return stats;
};