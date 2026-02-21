import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import error404Image from '@/assets/img/error404.svg';
import { ErrorPageLayout } from '@/widgets/ErrorPageLayout';

export const NotFound404: FC = () => {
  const navigate = useNavigate();

  const handleReportErrorClick = () => { };

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <ErrorPageLayout
      imageSrc={error404Image}
      imageAlt='Изображение ошибки 404'
      title='Страница не найдена'
      description={
        <>
          К сожалению, эта страница недоступна. Вернитесь
          <br />
          на главную страницу или попробуйте позже
        </>
      }
      onReportClick={handleReportErrorClick}
      onHomeClick={handleGoHomeClick}
    />
  );
};
