import React from 'react';

export type IconProps = {
  name: string;
  size?: number | string;
  title?: string;
  className?: string;
  fill?: string;
  stroke?: string;
  svgProps?: React.SVGAttributes<SVGSVGElement>;
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  title,
  className,
  fill = 'currentColor',
  stroke,
  svgProps
}) => {
  // Валидация входных данных
  if (!name) {
    console.warn('Имя иконки не указано');
    return null;
  }

  const sizeValue = String(size);
  const ariaHidden = title ? undefined : true;
  const role = title ? 'img' : 'presentation';

  // Функция для объединения классов
  const getClassName = () => {
    const classes = ['icon'];
    if (className) {
      classes.push(className);
    }
    return classes.join(' ').trim();
  };

  return (
    <svg
      {...svgProps}
      width={sizeValue}
      height={sizeValue}
      role={role}
      aria-hidden={ariaHidden}
      aria-label={title}
      className={getClassName()}
      fill={fill}
      stroke={stroke}
    >
      {title && <title>{title}</title>}
      <use href={`#${name}`} />
    </svg>
  );
};

export default Icon;
