import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';
import { ImageDropzone } from '@/features/ImageDropzone';
import { SkillSelect } from '@/features/SkillSelect';
import { MultiSkillSelect } from '@/shared/ui/multySkillSelect';
import type { TSkill } from '@/entities/skills';
import styles from './formStepSkill.module.scss';
import type { TCategoryOption } from '../FormStepPersonal/types';
import { SkillSwapModal } from '@/widgets/SkillSwapModal';

export type FormStepSkillUIProps = {
  // Значения полей
  skillName: string;
  skillImages: string[];
  selectedCategory: TCategoryOption | null;
  selectedSubcategoryIds: number[];
  selectedSubcategories: TSkill[];
  description: string;
  showModal:boolean;

  // Опции для селектов
  categoryOptions: TCategoryOption[];
  subcategoryOptions: TSkill[];

  // Обработчики
  closeModal:()=>void;
  onSkillNameChange: (value: string) => void;
  onCategoryChange: (category: TCategoryOption | null) => void;
  onSubcategoryChange: (subcategoryIds: number[]) => void;
  onDescriptionChange: (value: string) => void;
  onForwardClick: () => void;
  onBackClick: () => void;
  isFormValid: boolean;
  buttonStatus: 'primary' | 'primary_disabled';

  // Пропсы для фото - ИСПРАВЛЕНО
  onImagesAdded?: (files: File[]) => void;      // для добавления фото
  onImageRemoved?: (index: number) => void;     // для удаления по индексу
};

export const FormStepSkillUI: FC<FormStepSkillUIProps> = ({
  skillName,
  selectedCategory,
  selectedSubcategoryIds,
  selectedSubcategories,
  description,
  categoryOptions,
  subcategoryOptions,
  buttonStatus,
  showModal,
  skillImages,
  onSkillNameChange,
  onCategoryChange,
  onSubcategoryChange,
  onDescriptionChange,
  onForwardClick,
  onBackClick,
  onImagesAdded,
  onImageRemoved,
  closeModal,
}) => {
  return (

    <div className={styles.formContainer}>
      {showModal && <SkillSwapModal onClose={closeModal}/>}

      <div className={styles.formSection}>
        <div className={styles.fieldGroup}>
          <label htmlFor='skillName'>Название навыка</label>
          <Input
            name='skillName'
            placeholder='Введите название вашего навыка'
            value={skillName}
            onChange={onSkillNameChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor='skillCategory'>Категория навыка</label>
          <SkillSelect
            placeholderValue='Выберите категорию навыка'
            optionsArr={categoryOptions}
            value={selectedCategory?.id || null}
            onChange={(id: number | null) => {
              const category = categoryOptions.find(c => c.id === id) || null;
              onCategoryChange(category);
            }}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Подкатегории навыка</label>
          <MultiSkillSelect
            placeholderValue={selectedCategory ? 'Выберите подкатегории' : 'Сначала выберите категорию'}
            optionsArr={subcategoryOptions}
            value={selectedSubcategoryIds}
            onChange={onSubcategoryChange}
            disabled={!selectedCategory}
          />

          {selectedSubcategories.length > 0 && (
            <div className={styles.selectedItems}>
              <small>Выбрано: {selectedSubcategories.map(s => s.title).join(', ')}</small>
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor='skillDescription'>Описание</label>
          <textarea
            id='skillDescription'
            className={styles.textarea}
            placeholder='Коротко опишите, чему можете научить'
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            rows={4}
          />
        </div>

        {/* ImageDropzone - ИСПРАВЛЕНО */}
        <ImageDropzone
          onImagesAdded={onImagesAdded}
          onImageRemoved={onImageRemoved}
          images={skillImages}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button status='secondary' onClick={onBackClick}>
          Назад
        </Button>
        <Button
          status={buttonStatus}
          onClick={onForwardClick}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
