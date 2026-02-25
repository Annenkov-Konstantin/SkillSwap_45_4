import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FormStepPersonalUI } from "./FormStepPersonalUI"
import { useAppSelector, useDispatchedActions } from "@/services/hooks";
import { cityActions, citySelectors } from "@/services/slices/city";
import { skillsActions, skillsSelectors } from "@/services/slices/skills";
import type { TCity } from "@/entities/city";
import type { TSkills } from "@/entities/skills";
import styles from './formStepPersonal.module.scss';

export const FormStepPersonal: FC = () => {
  const [nameValue, setNameValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [cityValue, setCityValue] = useState<string | null>(null);;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [valuedLengthStatus, setValueLengthStatus] = useState<'empty' | 'short' | 'strong'>('empty');
  const [showNameError, setShowNameError] = useState(false);
  const navigate = useNavigate();

  const { fetchCity } = useDispatchedActions(cityActions);
  const { fetchSkills } = useDispatchedActions(skillsActions);

  const cityArray: TCity[] | null = useAppSelector(citySelectors.selectCity);
  const skillsData: TSkills | null = useAppSelector(skillsSelectors.selectskills);

  useEffect(() => {
   Promise.all([
    fetchCity(),
    fetchSkills()
  ]).catch(error => {
    console.error('Один из запросов упал:', error);
  });
  }, [])

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
        setSelectedSkill(parsedData.toLearn?.[0] || null);

        // Если есть выбранный навык, пытаемся восстановить категорию
        if (parsedData.toLearn?.[0] && skillsData) {
          const skillCategory = skillsData.find(category =>
            category.skills.some(skill => skill.title === parsedData.toLearn[0])
          );
          if (skillCategory) {
            setSelectedCategory(skillCategory.category);
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
    setSelectedSkill(null);
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
  };

  const profilePhotoAdd = () => {
  }

    const onNameChange = (name: string) => {
    setNameValue(name);
    if (showNameError && validateName(name)) {
      setShowNameError(false); // Сбрасываем ошибку, если имя стало валидным
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
    collectFormData();
    if (!canProceedToNextStep()) {
      setShowNameError(true);
      return;
    }
    navigate('/register/skill');
  }

  const onBackClick = () => {
    collectFormData();
    navigate('/register/account');
  }

  //сбор данных
  const collectFormData = () => {
    const formData = {
      name: nameValue,
      location: cityValue || '',
      dateOfBirth: birthValue || '',
      gender: genderValue || '',
      avatarPic: '', //TODO: доделать подгрузку фото
      toLearn: selectedSkill ? [selectedSkill] : [],
    };

    // Сохраняем в localStorage
    localStorage.setItem('registrationPersonalData', JSON.stringify(formData));

    return formData;
  };

  // Определяем какую подсказку показать для имени в режиме регистрации
  const getValueHint = () => {
    // Если showNameError true, всегда показываем ошибку
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
          </p>
        );
      default:
        return null;
    }
  };

  //отправка формы (для текущего шага)
  const handleSubmit = (e: SyntheticEvent) => {
    if (e) e.preventDefault();
    onForwardClick();
  };

  return (
    <FormStepPersonalUI
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
      selectedSkill={selectedSkill}
      onCategoryChange={handleCategoryChange}
      onSkillChange={handleSkillChange}
      onForwardClick={onForwardClick}
      onBackClick={onBackClick}
      showNameError={showNameError}
      getValueHint={getValueHint}
    />
  )
}
