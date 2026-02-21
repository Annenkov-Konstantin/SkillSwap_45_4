import type { PayloadAction } from '@reduxjs/toolkit';
import type { TFilters, TSkillFilter } from '@/widgets/FilterAside/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '@constants';
import type { TSkill } from '@/entities/skills';

export const initialState: TFilters = {
  preferenceFilter: {label:'Всё', value: 'all'},
  skillFilter:[],
  genderFilter: {label:'Не имеет значения', value:'any'},
  cityFilter: []

};

export const filterSlice = createSlice({
  name: SLICE_NAMES.FILTER,
  initialState,
  reducers: {
    toggleSkill:(state, action: PayloadAction<{ categoryId: number; skill: TSkill }>) => {
      const { categoryId, skill } = action.payload;
      const categoryIndex = state.skillFilter.findIndex(
        item => item.categoryId === categoryId
      );

      if (categoryIndex === -1) {
        state.skillFilter.push({
          categoryId,
          skills: [skill]
        });
      } else {
        const category = state.skillFilter[categoryIndex];
        const skillIndex = category.skills.findIndex(s => s.id === skill.id);

        if (skillIndex === -1) {
          category.skills.push(skill);
        } else {
          category.skills.splice(skillIndex, 1);
          // Если после удаления в категории не осталось навыков - удаляем категорию тоже
          if (category.skills.length === 0) {
            state.skillFilter.splice(categoryIndex, 1);
          }
        }
      }
    },
    removeSkill: (state, action: PayloadAction<{ categoryId: number; skillId: number }>) => {
      const { categoryId, skillId } = action.payload;

      const categoryIndex = state.skillFilter.findIndex(
        item => item.categoryId === categoryId
      );

      if (categoryIndex !== -1) {
        const category = state.skillFilter[categoryIndex];
        const skillIndex = category.skills.findIndex(s => s.id === skillId);

        if (skillIndex !== -1) {
          category.skills.splice(skillIndex, 1);

          // Если после удаления в категории не осталось навыков - удаляем категорию
          if (category.skills.length === 0) {
            state.skillFilter.splice(categoryIndex, 1);
          }
        }
      }
    },
  },
  selectors: {
    selectFilter: (state) => state,
  }
});

export default filterSlice;
