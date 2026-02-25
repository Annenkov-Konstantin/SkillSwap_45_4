import type { FC } from 'react';
import { Button, Input } from '@/shared/ui';
import { ImageDropzone } from '@/features/ImageDropzone';
import { SkillSelect } from '@/features/SkillSelect';
import styles from './formStepSkill.module.scss';

export type FormStepSkillUIProps = {
  skillNameValue: string;
  categoryValue: string;
  subcategoryValue: string;
  descriptionValue: string;
  categoryOptions: string[];
  subcategoryOptions: string[];
  onSkillNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onImageDelete: (file: File) => void;
  isContinueDisabled?: boolean;
};

export const FormStepSkillUI: FC<FormStepSkillUIProps> = ({
  skillNameValue,
  categoryValue,
  subcategoryValue,
  descriptionValue,
  categoryOptions,
  subcategoryOptions,
  onSkillNameChange,
  onCategoryChange,
  onSubcategoryChange,
  onDescriptionChange,
  onBack,
  onContinue,
  onImageDelete,
  isContinueDisabled = false
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor='skillName'>Название навыка</label>
        <Input
          name='skillName'
          placeholder='Введите название вашего навыка'
          value={skillNameValue}
          onChange={onSkillNameChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor='skillCategory'>Категория навыка</label>
        <SkillSelect
          placeholderValue='Выберите категорию навыка'
          optionsArr={categoryOptions}
          value={categoryValue}
          onChange={onCategoryChange}
          withScroll={false}
          className={styles.selectField}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor='skillSubcategory'>Подкатегория навыка</label>
        <SkillSelect
          placeholderValue='Выберите подкатегорию навыка'
          optionsArr={subcategoryOptions}
          value={subcategoryValue}
          onChange={onSubcategoryChange}
          disabled={subcategoryOptions.length === 0}
          withScroll={true}
          className={styles.selectField}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor='skillDescription'>Описание</label>
        <textarea
          id='skillDescription'
          className={styles.textarea}
          placeholder='Коротко опишите, чему можете научить'
          value={descriptionValue}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
      </div>

      <ImageDropzone handleDelete={onImageDelete} />

      <div className={styles.buttonContainer}>
        <Button status='secondary' onClick={onBack}>
          Назад
        </Button>
        <Button
          status={isContinueDisabled ? 'primary_disabled' : 'primary'}
          onClick={onContinue}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
