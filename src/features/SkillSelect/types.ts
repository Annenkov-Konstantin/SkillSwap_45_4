export type CategoryOption = {
  id: number;
  category: string;
};

export type SkillSelectProps = {
  placeholderValue: string;
  optionsArr: CategoryOption[]; // Теперь массив объектов
  value?: number | null; // value теперь число (id) или null
  onChange?: (id: number | null) => void; // onChange передает id
  disabled?: boolean;
}
