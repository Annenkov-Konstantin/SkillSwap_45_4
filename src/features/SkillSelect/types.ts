export type SkillSelectProps = {
  placeholderValue: string;
  optionsArr: string[];
  value?: string | null;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
