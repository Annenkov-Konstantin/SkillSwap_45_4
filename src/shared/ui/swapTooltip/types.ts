export interface SwapTooltipUIProps {
  id: string;
  text: string;
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
}
