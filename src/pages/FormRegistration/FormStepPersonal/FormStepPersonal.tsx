import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FormStepPersonalUI } from "./FormStepPersonalUI"
import { useAppSelector, useDispatchedActions } from "@/services/hooks";
import { cityActions, citySelectors } from "@/services/slices/city";
import { skillsActions, skillsSelectors } from "@/services/slices/skills";
import type { TCity } from "@/entities/city";
import type { TSkills } from "@/entities/skills";
import styles from './formStepPersonal.module.scss';
import { AppRoutes } from "@/shared/lib/constants";
import type { ButtonStatus } from "@/shared/ui/button/types";

export const FormStepPersonal: FC = () => {
  const [nameValue, setNameValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [cityValue, setCityValue] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // массив
  const [valuedLengthStatus, setValueLengthStatus] = useState<'empty' | 'short' | 'strong'>('empty');
  const [showNameError, setShowNameError] = useState(false);

  //PhotoAvatar
   const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

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


  const navigate = useNavigate();

  const cityArray: TCity[] | null = useAppSelector(citySelectors.selectCity);
  const skillsData: TSkills | null = useAppSelector(skillsSelectors.selectskills);

  // загрузка сохраненных данных при монтировании из localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('registrationPersonalData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setNameValue(parsedData.name || '');
        setBirthValue(parsedData.dateOfBirth || '');
        setGenderValue(parsedData.gender || '');
        setCityValue(parsedData.location || null);

         // Загружаем фото аватара
        if (parsedData.avatarPic) {
        setAvatarPreview(parsedData.avatarPic);
        }

        // Загружаем массив навыков
        if (parsedData.toLearn && Array.isArray(parsedData.toLearn)) {
          setSelectedSkills(parsedData.toLearn);

          // Если есть выбранные навыки, пытаемся восстановить категорию по первому навыку
          if (parsedData.toLearn.length > 0 && skillsData) {
            const firstSkill = parsedData.toLearn[0];
            const skillCategory = skillsData.find(category =>
              category.skills.some(skill => skill.title === firstSkill)
            );
            if (skillCategory) {
              setSelectedCategory(skillCategory.category);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных из localStorage:', error);
      }
    }
  }, [skillsData]);

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

  // Функция для проверки возможности перехода на следующий шаг
  const canProceedToNextStep = (): boolean => {
    return validateName(nameValue);
  };

  //массив категорий
  const categoryArray = skillsData
    ? [...new Set(skillsData.map(item => item.category))]
    : [];

  //id выбранной категории
  const selectedCategoryId = skillsData?.find(
    item => item.category === selectedCategory
  )?.id;

  //массив навыков
  const skillArray = skillsData && selectedCategoryId
    ? skillsData
        .find(item => item.id === selectedCategoryId)
        ?.skills.map(skill => skill.title) || []
    : [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Очищаем выбранные навыки при смене категории
    setSelectedSkills([]);
  };

  // Обработчик для множественного выбора
  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
  };



  const onNameChange = (name: string) => {
    setNameValue(name);
    if (showNameError && validateName(name)) {
      setShowNameError(false);
    }
  };

  const onBirthChange = (birth: string) => {
    setBirthValue(birth);
  }

  const onGenderChange = (gender: string) => {
    setGenderValue(gender);
  }

  const onCityChange = (city: string | null) => {
    setCityValue(city);
  }

  const onForwardClick = () => {
    if (!canProceedToNextStep()) {
      setShowNameError(true);
      return;
    }
    collectFormData(); // Сохраняем данные перед переходом
    navigate(AppRoutes.RegSkill);
  }

  const onBackClick = () => {
    collectFormData(); // Сохраняем данные перед переходом
    navigate(AppRoutes.RegAccount);
  }

  //сбор данных
  const collectFormData = () => {
    const formData = {
      avatarPic: avatarPreview || '',
      name: nameValue,
      location: cityValue || '',
      dateOfBirth: birthValue || '',
      gender: genderValue || '',
      toLearn: selectedSkills, // Теперь это массив
    };

    // Сохраняем в localStorage
    localStorage.setItem('registrationPersonalData', JSON.stringify(formData));
    console.log('Данные сохранены:', formData); // Для отладки

    return formData;
  };

  // Определяем какую подсказку показать для имени в режиме регистрации
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

  //Проверка полей перед отпракой

  const areAllFieldsFilled = (): boolean => {
    const isNameValid = nameValue.trim().length >= 2;
    const isBirthValid = birthValue.trim() !== '';
    const isGenderValid = genderValue.trim() !== '';
    const isCityValid = cityValue !== null && cityValue.trim() !== '';
    const areSkillsValid = selectedSkills.length > 0;
    return isNameValid && isBirthValid && isGenderValid && isCityValid && areSkillsValid;
  };

  // Функция для проверки возможности перехода на следующий шаг
  const getButtonStatus = (): ButtonStatus => {
  return areAllFieldsFilled() ? 'primary' : 'primary_disabled';
};

  //отправка формы (для текущего шага)
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
     const formData = collectFormData();
     console.log(getButtonStatus())
    onForwardClick();
  };

  return (
    <FormStepPersonalUI
      avatarPreview={avatarPreview}
      nameValue={nameValue}
      birthValue={birthValue}
      skillArray={skillArray}
      categoryArray={categoryArray}
      cityArray={cityArray || []}
      cityValue={cityValue}
      genderValue={genderValue}
      handleSubmit={handleSubmit}
      profilePhotoAdd={profilePhotoAdd}
      onNameChange={onNameChange}
      onBirthChange={onBirthChange}
      onGenderChange={onGenderChange}
      onCityChange={onCityChange}
      selectedCategory={selectedCategory}
      selectedSkills={selectedSkills} // Изменено: теперь массив
      onCategoryChange={handleCategoryChange}
      onSkillsChange={handleSkillsChange} // Изменено: новый обработчик
      onForwardClick={onForwardClick}
      onBackClick={onBackClick}
      showNameError={showNameError}
      getValueHint={getValueHint}
      buttonStatus={getButtonStatus()}
    />
  )
}
