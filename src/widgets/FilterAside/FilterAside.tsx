import styles from './FilterAside.module.scss';
import { RadioButton, Checkbox, DropdownTrigger } from '@/shared/ui';
import type { FilterAsideUIProps } from './types';
import React from 'react';

const prefers = [
  { label: 'Всё', value: 'all' as const },
  { label: 'Хочу научиться', value: 'learn' as const },
  { label: 'Могу научить', value: 'teach' as const }
];

const genders = [
  { label: 'Не имеет значения', value: 'any' as const },
  { label: 'Мужской', value: 'male' as const },
  { label: 'Женский', value: 'female' as const }
];

const INITIAL_VISIBLE_CATEGORIES = 5;
const INITIAL_VISIBLE_CITIES = 5;

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M14.791 2C19.8418 2.00009 21.9999 4.15815 22 9.20898V14.791C21.9999 19.8418 19.8418 21.9999 14.791 22H9.20898C4.15815 21.9999 2.00009 19.8418 2 14.791V9.20898C2.00009 4.15816 4.15816 2.00009 9.20898 2H14.791ZM16.7803 8.62988C16.4903 8.33988 16.0097 8.33988 15.7197 8.62988L10.5801 13.7695L8.28027 11.4697C7.99028 11.1797 7.50973 11.1797 7.21973 11.4697C6.92973 11.7597 6.92973 12.2403 7.21973 12.5303L10.0498 15.3604C10.1898 15.5003 10.3801 15.5801 10.5801 15.5801C10.78 15.58 10.9704 15.5003 11.1104 15.3604L16.7803 9.69043C17.0702 9.40047 17.0702 8.9199 16.7803 8.62988Z'
      fill='#ABD27A'
    />
  </svg>
);

const IndeterminateIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M14.791 2C19.8418 2.00009 21.9999 4.15815 22 9.20898V14.791C21.9999 19.8418 19.8418 21.9999 14.791 22H9.20898C4.15815 21.9999 2.00009 19.8418 2 14.791V9.20898C2.00009 4.15816 4.15816 2.00009 9.20898 2H14.791ZM8 11.25C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25H8Z'
      fill='#ABD27A'
    />
  </svg>
);

export const FilterAside: React.FC<FilterAsideUIProps> = ({
  filters,
  selectedCount,
  cityArray,
  skillArray,
  openCategories,
  showAllCategories,
  showAllCities,
  onReset,
  onPreferenceChange,
  onGenderChange,
  onCityToggle,
  onSkillToggle,
  onCategoryToggle,
  onCategorySkillsToggle,
  onShowAllCategoriesToggle,
  onShowAllCitiesToggle,
  getCategoryCheckState
}: FilterAsideUIProps) => {
  const visibleCategories = showAllCategories
    ? skillArray
    : skillArray.slice(0, INITIAL_VISIBLE_CATEGORIES);

  const visibleCities = showAllCities
    ? cityArray
    : cityArray.slice(0, INITIAL_VISIBLE_CITIES);

  return (
    <aside className={styles.aside}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Фильтры {selectedCount > 0 ? `(${selectedCount})` : ''}
        </h2>
        {selectedCount > 0 && (
          <button
            type='button'
            className={styles.resetButton}
            onClick={onReset}
          >
            <span>Сбросить</span>
            <svg
              width='11'
              height='11'
              viewBox='0 0 11 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.0763 1.59192L1.59099 10.0772C1.30108 10.3671 0.820244 10.3671 0.53033 10.0772C0.240416 9.78729 0.240416 9.30646 0.53033 9.01654L9.01561 0.531262C9.30553 0.241349 9.78636 0.241349 10.0763 0.531262C10.3662 0.821176 10.3662 1.30201 10.0763 1.59192Z'
                fill='#508826'
              />
              <path
                d='M10.0763 10.0762C9.78636 10.3661 9.30553 10.3661 9.01561 10.0762L0.53033 1.59088C0.240416 1.30096 0.240416 0.820131 0.53033 0.530217C0.820244 0.240303 1.30108 0.240303 1.59099 0.530217L10.0763 9.0155C10.3662 9.30541 10.3662 9.78625 10.0763 10.0762Z'
                fill='#508826'
              />
            </svg>
          </button>
        )}
      </div>

      <section className={styles.section}>
        {prefers.map((pref) => (
          <RadioButton
            key={pref.value}
            name='preferences'
            label={pref.label}
            value={pref.value}
            checked={filters.preferenceFilter === pref.value}
            onChange={(value) => onPreferenceChange(value as typeof pref.value)}
          />
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Навыки</h3>

        {visibleCategories.map((category) => {
          const isOpen = openCategories.includes(category.id);
          const checkState = getCategoryCheckState(category);

          return (
            <div
              key={category.id}
              className={`${styles.category} ${isOpen ? styles.categoryOpen : ''}`}
            >
              <div className={styles.categoryHead}>
                <label className={styles.categoryLabel}>
                  <input
                    type='checkbox'
                    checked={checkState.checked}
                    ref={(el) => {
                      if (el) el.indeterminate = checkState.indeterminate;
                    }}
                    onChange={() => onCategorySkillsToggle(category)}
                  />
                  <span className={styles.checkboxIcon} aria-hidden='true'>
                    {checkState.indeterminate && <IndeterminateIcon />}
                    {!checkState.indeterminate && checkState.checked && (
                      <CheckIcon />
                    )}
                  </span>

                  <span>{category.category}</span>
                </label>
                <div className={styles.categoryTrigger}>
                  <DropdownTrigger
                    isOpen={isOpen}
                    onClick={() => onCategoryToggle(category.id)}
                  />
                </div>
              </div>

              {isOpen && (
                <div className={styles.categoryContent}>
                  {category.skills.map((skill) => (
                    <Checkbox
                      key={skill.id}
                      checked={filters.skillFilter.includes(skill.title)}
                      label={skill.title}
                      onChange={() => onSkillToggle(skill.title)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {skillArray.length > INITIAL_VISIBLE_CATEGORIES && (
          <div className={styles.unfoldRow}>
            <button
              type='button'
              className={styles.buttonUnfold}
              onClick={onShowAllCategoriesToggle}
            >
              Все категории
            </button>

            <DropdownTrigger
              isOpen={showAllCategories}
              onClick={onShowAllCategoriesToggle}
            />
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Пол автора</h3>
        {genders.map((gender) => (
          <RadioButton
            key={gender.value}
            name='authorGender'
            label={gender.label}
            value={gender.value}
            checked={filters.genderFilter === gender.value}
            onChange={(value) => onGenderChange(value as typeof gender.value)}
          />
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Город</h3>

        {visibleCities.map((city) => (
          <Checkbox
            key={city._id}
            checked={filters.cityFilter.includes(city.name)}
            label={city.name}
            onChange={() => onCityToggle(city.name)}
          />
        ))}

        {cityArray.length > INITIAL_VISIBLE_CITIES && (
          <div className={styles.unfoldRow}>
            <button
              type='button'
              className={styles.buttonUnfold}
              onClick={onShowAllCitiesToggle}
            >
              Все города
            </button>

            <DropdownTrigger
              isOpen={showAllCities}
              onClick={onShowAllCitiesToggle}
            />
          </div>
        )}
      </section>
    </aside>
  );
};
