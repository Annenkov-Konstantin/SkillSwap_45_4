import { useMemo, useState, type FC } from 'react';
import { useAppSelector } from '@store-hooks';
import { skillsSelectors } from '@slice/skills';
import type { TSkills } from '@/entities/skills';
import categoriesData from '../../../../public/db/skills/skills.json';
import { FormStepSkillUI } from './formStepSkillUI';

const normalizeLabel = (value: string): string =>
  value.replace(/\s+/g, ' ').trim().toLowerCase();

export type FormStepSkillValues = {
  skillName: string;
  categoryId: number | null;
  category: string;
  subcategoryId: number | null;
  subcategory: string;
  description: string;
};

type FormStepSkillProps = {
  categoryOptions?: string[];
  initialValues?: Partial<FormStepSkillValues>;
  onBack?: () => void;
  onContinue?: (values: FormStepSkillValues) => void;
  onImageDelete?: (file: File) => void;
};

export const FormStepSkill: FC<FormStepSkillProps> = ({
  categoryOptions,
  initialValues,
  onBack,
  onContinue,
  onImageDelete
}) => {
  const skills = useAppSelector(skillsSelectors.selectskills);

  const [skillName, setSkillName] = useState(initialValues?.skillName ?? '');
  const [categoryId, setCategoryId] = useState<number | null>(
    initialValues?.categoryId ?? null
  );
  const [category, setCategory] = useState(initialValues?.category ?? '');
  const [subcategoryId, setSubcategoryId] = useState<number | null>(
    initialValues?.subcategoryId ?? null
  );
  const [subcategory, setSubcategory] = useState(
    initialValues?.subcategory ?? ''
  );
  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  );

  const mergedSkills = useMemo<TSkills>(() => {
    const localSkills = categoriesData as TSkills;
    const storeSkills = skills ?? [];

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
  }, [skills]);

  const categoryOptionsFromStore = useMemo(() => {
    if (mergedSkills.length === 0) {
      return [];
    }

    return mergedSkills.map((item) => item.category);
  }, [mergedSkills]);

  const selectedCategoryFromValue = useMemo(() => {
    if (mergedSkills.length === 0 || !category) {
      return null;
    }

    const normalizedCategory = normalizeLabel(category);
    return (
      mergedSkills.find(
        (item) => normalizeLabel(item.category) === normalizedCategory
      ) ?? null
    );
  }, [mergedSkills, category]);

  const subcategoryOptionsFromStore = useMemo(() => {
    if (!selectedCategoryFromValue) {
      return [];
    }

    return selectedCategoryFromValue.skills.map((item) => item.title);
  }, [selectedCategoryFromValue]);

  const resolvedCategoryOptions = categoryOptions ?? categoryOptionsFromStore;
  const resolvedSubcategoryOptions = subcategoryOptionsFromStore;

  const isContinueDisabled =
    !skillName.trim() || !category || !subcategory || !description.trim();

  const handleCategoryChange = (value: string) => {
    const normalizedCategory = normalizeLabel(value);
    const nextCategory =
      mergedSkills.find(
        (item) => normalizeLabel(item.category) === normalizedCategory
      ) ?? null;

    setCategory(value);
    setCategoryId(nextCategory ? nextCategory.id : null);
    setSubcategoryId(null);
    setSubcategory('');
  };

  const handleSubcategoryChange = (value: string) => {
    if (!selectedCategoryFromValue) {
      setSubcategory('');
      setSubcategoryId(null);
      return;
    }

    const normalizedSubcategory = normalizeLabel(value);
    const nextSubcategory =
      selectedCategoryFromValue.skills.find(
        (item) => normalizeLabel(item.title) === normalizedSubcategory
      ) ?? null;

    setSubcategory(value);
    setSubcategoryId(nextSubcategory ? nextSubcategory.id : null);
  };

  const handleContinue = () => {
    if (isContinueDisabled) {
      return;
    }

    onContinue?.({
      skillName,
      categoryId,
      category,
      subcategoryId,
      subcategory,
      description
    });
  };

  return (
    <FormStepSkillUI
      skillNameValue={skillName}
      categoryValue={category}
      subcategoryValue={subcategory}
      descriptionValue={description}
      categoryOptions={resolvedCategoryOptions}
      subcategoryOptions={resolvedSubcategoryOptions}
      onSkillNameChange={setSkillName}
      onCategoryChange={handleCategoryChange}
      onSubcategoryChange={handleSubcategoryChange}
      onDescriptionChange={setDescription}
      onBack={() => onBack?.()}
      onContinue={handleContinue}
      onImageDelete={(file) => onImageDelete?.(file)}
      isContinueDisabled={isContinueDisabled}
    />
  );
};
