import React from 'react';
import { type IDropdownList } from './types';
import styles from './dropdownList.module.scss';
import clsx from 'clsx';

export const DropdownList = React.forwardRef<HTMLUListElement, IDropdownList>(
  (
    {
      filteredList,
      showNotFound,
      highlightedIndex,
      inputValue,
      handleValueSelect,
      setHighlightedIndex
    },
    listRef
  ) => {
    return (
      <div className={styles.dropdown}>
        <ul ref={listRef} className={styles.list}>
          {filteredList.slice(0, 50).map((value, index) => (
            <li
              key={value._id}
              className={clsx(
                styles.item,
                highlightedIndex === index && styles.highlighted
              )}
              onClick={() => handleValueSelect(value.name)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {value.name}
            </li>
          ))}

          {showNotFound && (
            <li
              className={clsx(styles.item, styles.notFound)}
              onClick={() => handleValueSelect(inputValue)}
              onMouseEnter={() => setHighlightedIndex(-1)}
            >
              <span className={styles.notFoundText}>
                Город не найден. Добавить "{inputValue}"?
              </span>
            </li>
          )}
        </ul>
      </div>
    );
  }
);
