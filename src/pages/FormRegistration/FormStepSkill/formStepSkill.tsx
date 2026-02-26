import { useEffect, useState, useMemo, type FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStepSkillUI } from './formStepSkillUI';
import { useAppSelector, useDispatchedActions } from '@/services/hooks';
import { skillsSelectors } from '@/services/slices/skills';
import type { TSkills, TSkill } from '@/entities/skills';
import { AppRoutes } from '@/shared/lib/constants';
import type { ButtonStatus } from '@/shared/ui/button/types';
import categoriesData from '../../../../public/db/skills/skills.json';
import { formActions, formSelectors } from '@/services/slices/form';
import type { TCategoryOption, TFormSkill } from '@/shared/lib/types';



const normalizeLabel = (value: string): string =>
  value.replace(/\s+/g, ' ').trim().toLowerCase();

export const FormStepSkill: FC = () => {
  const navigate = useNavigate()
  const isSecondStepTrue = useAppSelector(formSelectors.selectIsFirstStepTrue);
  const { setThirdStepForm } = useDispatchedActions(formActions);
  const [skillImages, setSkillImages] = useState<string[]>([]);
   //При прямом переходе без заполненных полей 2 формыы на выход!

    if (!isSecondStepTrue) {
      navigate(AppRoutes.RegPersonal, { replace: true });
    }


  const skillsData: TSkills | null = useAppSelector(skillsSelectors.selectskills);

  // Состояния формы
  const [skillName, setSkillName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategoryOption | null>(null);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [showModal, setShowModal]=useState(false);

  // Флаг для первоначальной загрузки
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  // Обработчик добавления фото - ВЫНЕСЕН НАВЕРХ
  const handleImagesAdded = async (files: File[]) => {
    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const base64Images = await Promise.all(files.map(convertFileToBase64));
    setSkillImages(prev => [...prev, ...base64Images]);
  };

  const handleImageRemoved = (index: number) => {
    setSkillImages(prev => prev.filter((_, i) => i !== index));
  };

  // Объединяем данные из store и локального файла
  const mergedSkills = useMemo<TSkills>(() => {
    const localSkills = categoriesData as TSkills;
    const storeSkills = skillsData ?? [];

    const categoryMap = new Map<
      string,
      {
        id: number;
        category: string;
        skillsMap: Map<string, { id: number; title: string }>;
      }
    >();

    const appendSource = (source: TSkills) => {
      source.forEach((categoryItem) => {
        const normalizedCategory = normalizeLabel(categoryItem.category);
        const existing = categoryMap.get(normalizedCategory);

        if (!existing) {
          const skillsMap = new Map<string, { id: number; title: string }>();

          categoryItem.skills.forEach((skillItem) => {
            const normalizedSkill = normalizeLabel(skillItem.title);
            skillsMap.set(normalizedSkill, {
              id: skillItem.id,
              title: skillItem.title
            });
          });

          categoryMap.set(normalizedCategory, {
            id: categoryItem.id,
            category: categoryItem.category,
            skillsMap
          });
          return;
        }

        categoryItem.skills.forEach((skillItem) => {
          const normalizedSkill = normalizeLabel(skillItem.title);

          if (!existing.skillsMap.has(normalizedSkill)) {
            existing.skillsMap.set(normalizedSkill, {
              id: skillItem.id,
              title: skillItem.title
            });
          }
        });
      });
    };

    appendSource(localSkills);
    appendSource(storeSkills);

    return Array.from(categoryMap.values()).map((categoryItem) => ({
      id: categoryItem.id,
      category: categoryItem.category,
      skills: Array.from(categoryItem.skillsMap.values())
    }));
  }, [skillsData]);

  // Массив категорий для селекта
  const categoryOptions: TCategoryOption[] = mergedSkills.map(item => ({
    id: item.id,
    category: item.category
  }));

  // Массив подкатегорий для выбранной категории
  const subcategoryOptions: TSkill[] = selectedCategory
    ? mergedSkills.find(cat => cat.id === selectedCategory.id)?.skills || []
    : [];

  // Загрузка сохраненных данных
  useEffect(() => {
    if (isInitialLoad) {
      const savedData = localStorage.getItem('registrationTeachData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // Загружаем данные в форму
          setSkillName(parsedData.skillName || '');
          setDescription(parsedData.description || '');
          // Категорию и подкатегории нужно восстановить по ID
          if (parsedData.categoryId) {
            const category = categoryOptions.find(c => c.id === parsedData.categoryId);
            setSelectedCategory(category || null);
          }
          if (parsedData.subcategoryIds) {
            setSelectedSubcategoryIds(parsedData.subcategoryIds);
          }
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      }
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, categoryOptions]);

  //Модалка
   const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);
  //  обработчик клавиши ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal, handleCloseModal]);

  // Обработчики
  const handleCategoryChange = (category: TCategoryOption | null) => {
    setSelectedCategory(category);
    setSelectedSubcategoryIds([]);
  };

  const handleSubcategoryChange = (subcategoryIds: number[]) => {
    setSelectedSubcategoryIds(subcategoryIds);
  };

  const handleForwardClick = () => {
    if (!skillName || !selectedCategory || selectedSubcategoryIds.length === 0 || !description) {
      console.log('Заполните все поля');
      return;
    }

    // Получаем названия выбранных подкатегорий
    const selectedSubcategoryNames = selectedSubcategoryIds
      .map(id => subcategoryOptions.find(s => s.id === id)?.title || '')
      .filter(name => name !== '');

    // Собираем данные формы
    const formData: TFormSkill = {
      skillName,
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.category,
      subcategoryIds: selectedSubcategoryIds,
      subcategoryNames: selectedSubcategoryNames,
      description:description
    };

    // Подготавливаем данные для API (только ID)
    const apiData = {
      toTeach: [{
        category: selectedCategory.id,
        subcategory: selectedSubcategoryIds
      }]
    };

    setThirdStepForm(
      {
        skillName: formData.skillName,
        categoryId: formData.categoryId,
        description: formData.description,
        toTeach: [
          {
            category: selectedCategory.id,
            subcategory: selectedSubcategoryIds
          }
        ],
        skillImages:skillImages
      }
    )

    console.log('Данные формы:', formData);
    console.log('Данные для API:', apiData);

    // Сохраняем в localStorage
    localStorage.setItem('registrationTeachData', JSON.stringify({
      ...formData,
      toTeach: apiData.toTeach
    }));

    setShowModal(true);

  };

  const handleBackClick = () => {
    navigate(AppRoutes.RegPersonal);
  };

  // Проверка валидности формы
  const isFormValid = (): boolean => {
    return !!(skillName && selectedCategory && selectedSubcategoryIds.length > 0 && description);
  };

  const getButtonStatus = (): 'primary' | 'primary_disabled' => {
    return isFormValid() ? 'primary' : 'primary_disabled';
  };

  // Получаем объекты выбранных подкатегорий для отображения
  const selectedSubcategories = subcategoryOptions.filter(
    sub => selectedSubcategoryIds.includes(sub.id)
  );


  return (
    <FormStepSkillUI
      skillImages={skillImages}
      showModal={showModal}
      skillName={skillName}
      selectedCategory={selectedCategory}
      selectedSubcategoryIds={selectedSubcategoryIds}
      selectedSubcategories={selectedSubcategories}
      description={description}
      categoryOptions={categoryOptions}
      subcategoryOptions={subcategoryOptions}
      onSkillNameChange={setSkillName}
      onCategoryChange={handleCategoryChange}
      onSubcategoryChange={handleSubcategoryChange}
      onDescriptionChange={setDescription}
      onForwardClick={handleForwardClick}
      onBackClick={handleBackClick}
      isFormValid={isFormValid()}
      buttonStatus={getButtonStatus()}
      onImagesAdded={handleImagesAdded}
      onImageRemoved={handleImageRemoved}
      closeModal={handleCloseModal}
    />
  );
};
