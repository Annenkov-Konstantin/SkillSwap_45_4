import { type FC } from 'react';
import { CalendarInput, Input } from '@/shared/ui';
import { Select } from '@/shared/ui';
import { CitySelect } from '@/features';
import { SkillSelect } from '@/features/SkillSelect';
import { Button } from '@/shared/ui';
import styles from './formStepPersonal.module.scss';
import { optionsGender } from './types';
import type { FormStepPersonalUIProps } from './types';
import { Icon } from '@/shared/ui/Icon';
import { MultiSkillSelect } from '@/shared/ui/multySkillSelect';
import type { TSkill } from '@/entities/skills';

export const FormStepPersonalUI: FC<FormStepPersonalUIProps> = ({
  avatarPreview,
  nameValue,
  birthValue,
  skillArray,
  categoryArray,
  cityArray,
  genderValue,
  cityValue,
  selectedCategory,
  aboutMe,
  onAboutMeChange,
  handleSubmit,
  profilePhotoAdd,
  onNameChange,
  onBirthChange,
  onGenderChange,
  onCityChange,
  onCategoryChange,
  onSkillsChange,
  onForwardClick,
  onBackClick,
  showNameError,
  getValueHint,
  buttonStatus,
  selectedSkills, // это TSkill[] от родителя
}: FormStepPersonalUIProps) => {

  // ИСПРАВЛЕНО: Преобразуем TSkill[] в number[] для MultiSkillSelect
const selectedSkillIds = selectedSkills.map(skill => skill.id);

// ИСПРАВЛЕНО: Обработчик для MultiSkillSelect (получает ID, преобразует в TSkill[])
const handleMultiSkillChange = (ids: number[]) => {
  // Преобразуем ID обратно в объекты TSkill
  const selectedSkillObjects = ids
    .map(id => skillArray.find(skill => skill.id === id))
    .filter((skill): skill is TSkill => skill !== undefined);

  // ИСПРАВЛЕНО: Преобразуем объекты обратно в ID для onSkillsChange
  const selectedIds = selectedSkillObjects.map(skill => skill.id);

  // Вызываем onSkillsChange с number[] как он ожидает
  onSkillsChange(selectedIds);
};

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.profilePhotoContainer}>
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            className={styles.avatarImage}
            width={72}
            height={72}
          />
        ) : (
          <Icon name='icon-user-circle' size={72} fill='none' />
        )}
        <button
          type='button'
          className={styles.buttonAdd}
          onClick={profilePhotoAdd}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='16' height='16' rx='8' fill='#ABD27A' />
            <path
              d='M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z'
              fill='white'
            />
            <path
              d='M8 12.5C7.72667 12.5 7.5 12.2733 7.5 12V4C7.5 3.72667 7.72667 3.5 8 3.5C8.27333 3.5 8.5 3.72667 8.5 4V12C8.5 12.2733 8.27333 12.5 8 12.5Z'
              fill='white'
            />
          </svg>
        </button>
      </div>

      <div className={styles.nameContainer}>
        <label htmlFor='userName'>Имя</label>
        <Input
          placeholder='Введите ваше имя'
          value={nameValue}
          onChange={onNameChange}
          name='userName'
          className={`${styles.nameInput} ${showNameError ? styles.inputError : ''}`}
        />
        {getValueHint && getValueHint()}
      </div>

      <div className={styles.personalDataContainer}>
        <div className={styles.dateBirthContainer}>
          <label htmlFor='dateBirth'>Дата рождения</label>
          <CalendarInput
            value={birthValue}
            onChange={onBirthChange}
            name='dateBirth'
          />
        </div>
        <Select
          label='Пол'
          options={[optionsGender[1], optionsGender[2]]}
          value={genderValue}
          onChange={onGenderChange}
        />
      </div>

      <CitySelect
        placeholder='Выберите город'
        cityList={cityArray}
        value={cityValue}
        onChange={onCityChange}
      />

      <div className={styles.skillContainer}>
        <label>Категория навыка, которому хотите научиться</label>
        <SkillSelect
          placeholderValue='Выберите категорию'
          optionsArr={categoryArray}
          value={selectedCategory?.id || null}
          onChange={(id: number | null) => {
            const category = categoryArray.find(cat => cat.id === id) || null;
            onCategoryChange(category);
          }}
        />
      </div>

      <div className={styles.skillContainer}>
        <label className={styles.lable_subCategory}>
          Подкатегория навыка, которому хотите научиться
        </label>
        <MultiSkillSelect
          placeholderValue={selectedCategory ? 'Выберите подкатегории' : 'Сначала выберите категорию'}
          optionsArr={skillArray}
          value={selectedSkillIds} // ИСПРАВЛЕНО: передаем number[]
          onChange={handleMultiSkillChange} // ИСПРАВЛЕНО: используем адаптированный обработчик
          disabled={!selectedCategory}
        />
      </div>
       {/* ДОБАВЛЕНО: поле "О себе" */}
      <div className={styles.fieldGroup}>
          <label htmlFor='skillDescription'>О себе</label>
          <textarea
            id='skillDescription'
            className={styles.textarea}
            placeholder='Коротко расскажите о себе... '
            value={aboutMe}
             onChange={(event) => onAboutMeChange(event.target.value)}
            rows={4}
          />
        </div>

      <div className={styles.buttonContainer}>
        <Button
          type="button"
          status='secondary'
          children='Назад'
          onClick={onBackClick}
        />
        <Button
          type="submit"
          status={buttonStatus}
          children='Продолжить'
          onClick={onForwardClick}
        />
      </div>
    </form>
  );
};
