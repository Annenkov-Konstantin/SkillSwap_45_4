import type { THeaderProps } from "./type";
import { useState, type FC } from "react";
import { HeaderUI } from "./HeaderUI";


export const Header: FC<THeaderProps> = ({
        userPhoto,
        userName,
        isLogin,
        isSkillsOpen,
        setIsSkillsOpen
      }) => {
  const [ search, setSearch ]= useState('');
  const [ isOpen, setIsOPen ]= useState(false);

   // Создаем правильные обработчики
  const handleTriggerClick = () => {
    setIsSkillsOpen(!isSkillsOpen);  // toggle
  };


  return (
  <HeaderUI
  userName={userName}
  searchQuery={search}
  setSearchQuery={setSearch}
  handleTriggerClick={handleTriggerClick}
  userPhoto={userPhoto}
  isLogin={isLogin}
  isSkillsOpen={isSkillsOpen}
  />
  )
};
