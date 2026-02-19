import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import error500Image from '@/assets/img/error500.svg';
import { ErrorPageLayout } from '@/widgets/ErrorPageLayout';

export const ServerError500: FC = () => {
  const navigate = useNavigate();

  const handleReportErrorClick = () => {};

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <ErrorPageLayout
      imageSrc={error500Image}
      imageAlt='Изображение ошибки 500'
      title='На сервере произошла ошибка'
      description='Попробуйте позже или вернитесь на главную страницу'
      onReportClick={handleReportErrorClick}
      onHomeClick={handleGoHomeClick}
    />
  );
};
