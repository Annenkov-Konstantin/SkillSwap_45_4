import type { ReactNode } from 'react';

export type TErrorPageLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: ReactNode;
  reportButtonText?: string;
  homeButtonText?: string;
  onReportClick?: () => void;
  onHomeClick: () => void;
};
