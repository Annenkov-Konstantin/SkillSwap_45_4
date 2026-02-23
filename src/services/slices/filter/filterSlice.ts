import type { PayloadAction } from '@reduxjs/toolkit';
import type { GenderOption, PreferenceOption, TFilters, TSkillFilter } from '@/widgets/FilterAside/types';
import { GENDER_OPTIONS, PREFERENCE_OPTIONS} from '@/widgets/FilterAside/types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '@constants';
import type { TSkill } from '@/entities/skills';
import type { TCity } from '@/entities/city';

export const initialState: TFilters = {
  preferenceFilter: PREFERENCE_OPTIONS[0],
  skillFilter:[],
  genderFilter: GENDER_OPTIONS[0],
  cityFilter:[]
};

export const filterSlice = createSlice({
  name: SLICE_NAMES.FILTER,
  initialState,
  reducers: {
    clearFilter:(state) =>{
      state.preferenceFilter= PREFERENCE_OPTIONS[0];
      state.skillFilter= [];
      state.genderFilter= GENDER_OPTIONS[0];
      state.cityFilter= [];
    },
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
    preferenceChange: (state, action: PayloadAction<PreferenceOption>) => {
      const value = action.payload;
      state.preferenceFilter = value;
    },
    genderChange: (state, action: PayloadAction<GenderOption>) => {
      const value = action.payload;
      state.genderFilter = value;
    },
    cityChange: (state, action: PayloadAction<TCity>) => {
      const value = action.payload;
      const index = state.cityFilter.findIndex(s=> s._id === value._id)
      if(index === -1){
        state.cityFilter.push(value)
      } else {
        state.cityFilter.splice(index,1)
      }
    },
    removeCity:(state, action: PayloadAction<TCity>)=>{
      const city = action.payload
      const index = state.cityFilter.findIndex(s=> s._id === city._id)
      if (index !== -1){
        state.cityFilter.splice(index, 1);
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
    removePreferenceChange:(state) => {
      state.preferenceFilter = PREFERENCE_OPTIONS[0];
    },
    removeGenderChange:(state) => {
      state.genderFilter = GENDER_OPTIONS[0];
    }
  },
  selectors: {
    selectFilter: (state) => state,
  }
});

export default filterSlice;
