export type TSkillActionModalProps = {
  image?:  React.ReactNode;
  maintText: string;
  secondaryText: string;
  primaryBtnText: string;
  secondaryBtnText?: string;
  onClose: () => void;
  isOpen: boolean;
};
