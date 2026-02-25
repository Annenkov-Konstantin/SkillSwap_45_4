export type SkillSelectProps = {
  placeholderValue: string;
  optionsArr: string[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  withScroll?: boolean;
};
