import styles from './FilterAside.module.scss';
import { RadioButton, Checkbox, DropdownTrigger } from '@/shared/ui';
import type { FilterAsideUIProps } from './types';
import { PREFERENCE_OPTIONS, GENDER_OPTIONS } from './types';
import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { ResetSkillButton } from '@/shared/ui/resetSkillButton/index';
import { ResetPreferenceButton } from '@shared/ui/resetPreferenceButton/index';
import { PreferenceAndSkillWrapper } from '@shared/ui/preferenceAndSkillWrapper/index';

const INITIAL_VISIBLE_CATEGORIES = 5;
const INITIAL_VISIBLE_CITIES = 5;

export const FilterAsideUI: React.FC<FilterAsideUIProps> = ({
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
        {/*Пример отображения выбранных Предпочтений и Скиллов*/}
        {(filters.preferenceFilter.value !== 'all' ||
          filters.skillFilter.length > 0) && (
          <PreferenceAndSkillWrapper
            preferenceResetButton={
              filters.preferenceFilter.value !== 'all' ? (
                <ResetPreferenceButton
                  preference={filters.preferenceFilter} // объект
                  onPreferenceChange={onPreferenceChange}
                />
              ) : null
            }
            skillResetButton={
              filters.skillFilter.length > 0 ? (
                <>
                  {filters.skillFilter.map((skill) => (
                    <ResetSkillButton
                      key={skill.id}
                      skill={skill}
                      onSkillToggle={onSkillToggle}
                    />
                  ))}
                </>
              ) : null
            }
          />
        )}
      </div>
      <section className={styles.section}>
        {PREFERENCE_OPTIONS.map((pref) => (
          <RadioButton
            key={pref.value}
            name='preferences'
            label={pref.label}
            value={pref.value}
            checked={filters.preferenceFilter.value === pref.value}
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
                    {checkState.indeterminate && (
                      <Icon
                        name='icon-checkbox-remove'
                        size={24}
                        fill='#abd27a'
                      />
                    )}
                    {!checkState.indeterminate && checkState.checked && (
                      <Icon
                        name='icon-checkbox-done'
                        size={24}
                        fill='#abd27a'
                      />
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
                      // Проверяем, есть ли навык в массиве по id
                      checked={filters.skillFilter.some(
                        (s) => s.id === skill.id
                      )}
                      label={skill.title}
                      // Передаём id навыка, как требует onSkillToggle
                      onChange={() => onSkillToggle(skill)}
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
        {GENDER_OPTIONS.map((gender) => (
          <RadioButton
            key={gender.value}
            name='authorGender'
            label={gender.label}
            value={gender.value}
            checked={filters.genderFilter.value === gender.value}
            onChange={(value) => onGenderChange(value as typeof gender.value)}
          />
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Город</h3>

        {visibleCities.map((city) => (
          <Checkbox
            key={city._id}
            checked={filters.cityFilter.some((c) => c.name === city.name)} // или c._id === city._id
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
