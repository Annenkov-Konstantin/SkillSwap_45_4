import React, { useState } from 'react';
import { TertiaryButtonUI } from './tertiaryButtonUI';
import { type ITertiaryButton } from './types';

export const TertiaryButton: React.FC<ITertiaryButton> = ({
  firstIcon,
  label,
  onClickButton,
  secondIcon,
  hasIcons,
  ...rest
}) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  if (!label) return null;

  // const hasIcons = Boolean(firstIcon || secondIcon);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(true);
      onClickButton?.();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      setIsKeyPressed(false);
    }
  };

  const handleBlur = () => setIsKeyPressed(false);

  const handleIconClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onClickButton?.();
  };

  return (
    <TertiaryButtonUI
      firstIcon={firstIcon}
      label={label}
      secondIcon={secondIcon}
      hasIcons={hasIcons}
      isKeyPressed={isKeyPressed}
      onButtonClick={onClickButton}
      onIconClick={handleIconClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
