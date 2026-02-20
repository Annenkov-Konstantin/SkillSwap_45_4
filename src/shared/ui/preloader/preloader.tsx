import styles from './preloader.module.scss'
import { type FC } from 'react';

export type TPreloaderProps ={
  radius?: number;
  strokeWidth?: number;
  color_1?: string;
  color_2?: string;
}

export const Preloader: FC<TPreloaderProps> = ({
  radius = 50,
  strokeWidth = 5,
  color_1 = '#508826',
  color_2 = '#f9faf7'
  }) => {
  // Конвертируем числа в строки с пикселями для CSS переменных
   const style = {
    '--radius': `${radius}px`,
    '--stroke-width': `${strokeWidth}px`,
    '--color-1': color_1,
    '--color-2': color_2,
  } as React.CSSProperties;


  return (
    <div className={styles.container}>
        <div className={styles.spinner} style={style}>
           <div className={styles.inner}></div>
        </div>
   </div>
  );
};
