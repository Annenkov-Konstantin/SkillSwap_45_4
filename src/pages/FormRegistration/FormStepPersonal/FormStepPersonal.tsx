import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FormStepPersonalUI } from "./FormStepPersonalUI"
import { useAppSelector, useDispatchedActions } from "@/services/hooks";
import { cityActions, citySelectors } from "@/services/slices/city";
import { skillsActions, skillsSelectors } from "@/services/slices/skills";
import type { TCity } from "@/entities/city";
import type { TCategory, TSkills, TSkill } from "@/entities/skills";
import styles from './formStepPersonal.module.scss';
import { AppRoutes } from "@/shared/lib/constants";
import type { ButtonStatus } from "@/shared/ui/button/types";
import type { TGenderConvert, TSetSecondStepForm } from "@/shared/lib/types";
import { formActions, formSelectors } from "@/services/slices/form";

// Тип для категории без навыков
type TCategoryOption = {
  id: number;
  category: string;
};

export const FormStepPersonal: FC = () => {
  const [nameValue, setNameValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategoryOption | null>(null);
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [valuedLengthStatus, setValueLengthStatus] = useState<'empty' | 'short' | 'strong'>('empty');
  const [showNameError, setShowNameError] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const isFirstStepTrue = useAppSelector(formSelectors.selectIsFirstStepTrue);
  const { setSecondStepForm } = useDispatchedActions(formActions)

  // флаг для отслеживания первоначальной загрузки
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  //PhotoAvatar
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const navigate = useNavigate();

  //При прямом переходе без пароля тут делать нечего!
  if (!isFirstStepTrue) {
      navigate(AppRoutes.RegAccount, { replace: true });
  }
  const cityArray: TCity[] | null = useAppSelector(citySelectors.selectCity);
  const skillsData: TSkills | null = useAppSelector(skillsSelectors.selectskills);

  const genderConvert: TGenderConvert = {
    male: 'мужской',
    female: 'женский'
  };

  // Обратный словарь для конвертации из русского в английский
  const genderConvertReverse: Record<string, 'male' | 'female'> = {
    'мужской': 'male',
    'женский': 'female'
  };

  // обработка фото
  const profilePhotoAdd = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Файл слишком большой. Максимальный размер 5MB');
          return;
        }

        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  // Массив категорий для селекта
  const categoryOptions: TCategoryOption[] = skillsData
    ? skillsData.map(item => ({
        id: item.id,
        category: item.category
      }))
    : [];

  // Массив навыков для выбранной категории
  const skillArray: TSkill[] = skillsData && selectedCategory
    ? skillsData
        .find(item => item.id === selectedCategory.id)
        ?.skills || []
    : [];

  // загрузка сохраненных данных только при первом монтировании компонента
  useEffect(() => {
    if (isInitialLoad) {
      const savedData = localStorage.getItem('registrationPersonalData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);

          // Загружаем все поля
          setNameValue(parsedData.name || '');
          setCityValue(parsedData.location || '');
          setBirthValue(parsedData.dateOfBirth || '');

          // Конвертируем гендер обратно в английский
          if (parsedData.gender) {
            const englishGender = genderConvertReverse[parsedData.gender];
            setGenderValue(englishGender || 'male');
          }

          setAboutMe(parsedData.aboutMe || '');
          setAvatarPreview(parsedData.avatarPic || '');

          // Загружаем категорию и навыки
          if (parsedData.toLearn && parsedData.toLearn.length > 0) {
            const toLearnData = parsedData.toLearn[0];

            // Находим категорию по ID
            if (toLearnData.category && skillsData) {
              const category = skillsData.find(cat => cat.id === toLearnData.category);
              if (category) {
                setSelectedCategory({
                  id: category.id,
                  category: category.category
                });
              }
            }

            // Загружаем ID навыков
            if (toLearnData.subcategory && Array.isArray(toLearnData.subcategory)) {
              setSelectedSkillIds(toLearnData.subcategory);
            }
          }

        } catch (error) {
          console.error('Ошибка при загрузке данных из localStorage:', error);
        }
      }
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, skillsData]); // Добавляем skillsData в зависимости

  // Добавим эффект для синхронизации selectedSkills с selectedSkillIds при изменении skillArray
  useEffect(() => {
    // Этот эффект сработает когда загрузится категория и обновится skillArray
    if (selectedCategory && selectedSkillIds.length > 0) {
      const validIds = selectedSkillIds.filter(id =>
        skillArray.some(skill => skill.id === id)
      );

      if (validIds.length !== selectedSkillIds.length) {
        // Оставил комментарий вместо warn, чтобы не терять логику проверки
      }
    }
  }, [skillArray, selectedCategory, selectedSkillIds]);

  // Эффект для очистки выбранных навыков при смене категории
  useEffect(() => {
    if (selectedCategory) {
      // Проверяем, все ли выбранные навыки принадлежат текущей категории
      const validIds = selectedSkillIds.filter(id =>
        skillArray.some(skill => skill.id === id)
      );

      if (validIds.length !== selectedSkillIds.length) {
        setSelectedSkillIds(validIds);
      }
    }
  }, [selectedCategory, skillArray]);

  // Проверяем длину имени при каждом изменении
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  useEffect(() => {
    if (!nameValue) {
      setValueLengthStatus('empty');
    } else if (!validateName(nameValue)) {
      setValueLengthStatus('short');
    } else {
      setValueLengthStatus('strong');
      setShowNameError(false);
    }
  }, [nameValue]);


  const handleCategoryChange = (category: TCategoryOption | null) => {
    setSelectedCategory(category);
    // Очищаем выбранные навыки при смене категории
    setSelectedSkillIds([]);
  };

  // Обработчик для множественного выбора навыков (получает массив ID)
  const handleSkillsChange = (skillIds: number[]) => {
    setSelectedSkillIds(skillIds);
  };

  const onNameChange = (name: string) => {
    setNameValue(name);
    if (showNameError && validateName(name)) {
      setShowNameError(false);
    }
  };

  const onBirthChange = (birth: string) => {
    setBirthValue(birth);
  };

  const onGenderChange = (gender: string) => {
    setGenderValue(gender);
  };

  const onCityChange = (city: string) => {
    setCityValue(city);
  };

  const onAboutMeChange = (text: string) => {
    setAboutMe(text);
  };

  const onForwardClick = () => {
    if (!canProceedToNextStep()) {
      setShowNameError(true);
      return;
    }
    collectFormData(); // Сохраняем данные перед переходом
    navigate(AppRoutes.RegSkill);
  };

  const onBackClick = () => {
    collectFormData(); // Сохраняем данные перед переходом
    navigate(AppRoutes.RegAccount);
  };

  // Функция для проверки возможности перехода
  const canProceedToNextStep = (): boolean => {
    return areAllFieldsFilled();
  };

  // сбор данных в слайс
  const collectFormData = (): TSetSecondStepForm => {
    // Получаем ID выбранной категории
    const categoryId = selectedCategory?.id || 0;

    const formData = {
      avatarPic: avatarPreview,
      name: nameValue,
      location: cityValue || '',
      dateOfBirth: birthValue,
      gender: genderConvert[genderValue as keyof typeof genderConvert] || 'мужской',
      aboutMe: aboutMe,
      toLearn: [{
        category: categoryId,
        subcategory: selectedSkillIds
      }]
    };

    // Сохраняем в localStorage
    localStorage.setItem('registrationPersonalData', JSON.stringify(formData));
    return formData;
  };

  // Определяем какую подсказку показать для имени
  const getValueHint = () => {
    if (showNameError) {
      return (
        <p className={styles.hintError}>
          Имя должно содержать не менее 2 символов
        </p>
      );
    }

    switch (valuedLengthStatus) {
      case 'empty':
        return (
          <p className={styles.hintNormal}>
            Имя должно содержать не менее 2 символов
          </p>
        );
      case 'short':
        return (
          <p className={styles.hintError}>
            Имя должно содержать не менее 2 символов
          </p>
        );
      case 'strong':
        return (
          <p className={styles.hintSuccess}>
            {/* Можно добавить иконку успеха */}
          </p>
        );
      default:
        return null;
    }
  };

  // Проверка всех полей перед отправкой
  const areAllFieldsFilled = (): boolean => {
    const isNameValid = nameValue.trim().length >= 2;
    const isBirthValid = birthValue.trim() !== '';
    const isGenderValid = genderValue !== undefined && genderValue.trim() !== '';
    const isCityValid = cityValue !== null && cityValue.trim() !== '';
    const isCategoryValid = selectedCategory !== null;
    const areSkillsValid = selectedSkillIds.length > 0;
    const isAboutMeValid = aboutMe.trim() !== '';
    return isNameValid && isCategoryValid && isBirthValid &&
      isGenderValid && isCityValid && areSkillsValid && isAboutMeValid;
  };
  // Функция для определения статуса кнопки
  const getButtonStatus = (): ButtonStatus => {
    return areAllFieldsFilled() ? 'primary' : 'primary_disabled';
  };

  // отправка формы (для текущего шага)
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = collectFormData();
    setSecondStepForm(data);
    onForwardClick();
  };

  return (
    <FormStepPersonalUI
      avatarPreview={avatarPreview}
      nameValue={nameValue}
      birthValue={birthValue}
      skillArray={skillArray}
      categoryArray={categoryOptions}
      cityArray={cityArray || []}
      cityValue={cityValue}
      genderValue={genderValue}
      aboutMe={aboutMe}
      onAboutMeChange={onAboutMeChange}
      handleSubmit={handleSubmit}
      profilePhotoAdd={profilePhotoAdd}
      onNameChange={onNameChange}
      onBirthChange={onBirthChange}
      onGenderChange={onGenderChange}
      onCityChange={onCityChange}
      selectedCategory={selectedCategory}
      selectedSkillIds={selectedSkillIds}
      onCategoryChange={handleCategoryChange}
      onSkillsChange={handleSkillsChange}
      onForwardClick={onForwardClick}
      onBackClick={onBackClick}
      showNameError={showNameError}
      getValueHint={getValueHint}
      buttonStatus={getButtonStatus()}
      selectedSkills={skillArray.filter(skill => selectedSkillIds.includes(skill.id))}
    />
  );
};
