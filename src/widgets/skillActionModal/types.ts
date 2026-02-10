export type skillActionModalProps = {
  image?: string;
  maintText: string;
  secondaryText: string;
  primaryBtnText: string;
  secondaryBtnText?: string;
  onClose: () => void;
  isOpen: boolean;
};