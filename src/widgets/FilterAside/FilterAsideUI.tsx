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
  onCheckSkillExist,
  onShowAllCategoriesToggle,
  onShowAllCitiesToggle,
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
            <Icon
              name='icon-cross'
              size={24}
              fill='#508826'
            />
          </button>
        )}
        {/*Пример отображения выбранных Предпочтений и Скиллов
           <PreferenceAndSkillWrapper
          //   preferenceResetButton={
          //     filters.preferenceFilter.value !== 'all' ? (
          //       <ResetPreferenceButton
          //         preference={filters.preferenceFilter} // объект
          //         onPreferenceChange={onPreferenceChange}
          //       />
          //     ) : null
          //   }
          //   skillResetButton={
          //     filters.skillFilter.length > 0 ? (
          //       <>
          //         {filters.skillFilter.map((skill) => (
          //           <ResetSkillButton
          //             key={skill.id}
          //             skill={skill}
          //             onSkillToggle={onSkillToggle}
          //           />
          //         ))}
          //       </>
          //     ) : null
          //   }
          // />
        // )}*/}
      </div>
        <div className={styles.filter_menu}>
      <section className={styles.section}>
        {PREFERENCE_OPTIONS.map((pref) => (
          <RadioButton
            key={pref.value}
            name='preferences'
            label={pref.label}
            value={pref.value}
            checked={false}
            onChange={(value) => onPreferenceChange(value as typeof pref.value)}
          />
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Навыки</h3>

        {visibleCategories.map((category) => {
          const isOpen = openCategories.includes(category.id);
          // const categoryFromFilter = filters.skillFilter[category.id]

          return (
            <div
              key={category.id}
              className={`${styles.category} ${isOpen ? styles.categoryOpen : ''}`}
            >
              <div
              className={styles.categoryHead}>
                <label
                  onClick={() => onCategoryToggle(category.id)}
                  className={styles.categoryLabel}
                >
                  <span
                  onClick={(e) => e.stopPropagation()}
                  className={styles.checkboxIcon} aria-hidden='true'>
                    {isOpen &&
                    <Icon
                      name='icon-checkbox-remove'
                      size={24}
                      fill='#abd27a'
                    />}
                    {!isOpen && (
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
                      checked={onCheckSkillExist(category.id, skill.id)}
                      label={skill.title}
                      onChange={()=>onSkillToggle(category.id, skill)}
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
            checked={false}
            onChange={(value) => onGenderChange(value as typeof gender.value)}
          />
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.titleFilter}>Город</h3>

        {visibleCities.map((city) => (
          <Checkbox
            key={city._id}
            checked={false}
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
      </div>
    </aside>
  );
};
