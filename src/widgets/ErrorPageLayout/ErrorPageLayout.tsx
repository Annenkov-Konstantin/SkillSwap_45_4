import type { FC } from 'react';
import { Button } from '@/shared/ui';
import styles from './ErrorPageLayout.module.scss';
import type { TErrorPageLayoutProps } from './types';

export const ErrorPageLayout: FC<TErrorPageLayoutProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  reportButtonText = 'Сообщить об ошибке',
  homeButtonText = 'На главную',
  onReportClick,
  onHomeClick
}) => {
  return (
    <main className={styles.errorPage} aria-labelledby='error-page-title'>
      <img className={styles.image} src={imageSrc} alt={imageAlt} />

      <div className={styles.textBlock}>
        <h1 id='error-page-title' className={styles.title}>
          {title}
        </h1>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.action}>
          <Button status='secondary' onClick={onReportClick}>
            {reportButtonText}
          </Button>
        </div>

        <div className={styles.action}>
          <Button status='primary' onClick={onHomeClick}>
            {homeButtonText}
          </Button>
        </div>
      </div>
    </main>
  );
};
