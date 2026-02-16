import type { THeaderProps } from "./type";
import { useState, type FC, useContext } from "react";
import { HeaderUI } from "./HeaderUI";
import { SkillsModalContext } from "@/shared/context/SkillsModalContext"; // сюда контекст

export const Header: FC<THeaderProps> = ({
        userPhoto,
        userName,
        isLogin,
      }) => {
  const [ search, setSearch ]= useState('');
  // юзаем контекст состояния модалки
  const [shouldModalRender, setShouldmodalRender] = useContext(SkillsModalContext);

  const handleSkillsOpen = () => {
    setShouldmodalRender(true);
  };


  return (
  <HeaderUI
  userName={userName}
  searchQuery={search}
  setSearchQuery={setSearch}
  userPhoto={userPhoto}
  isLogin={isLogin}
  handleModalOpen = {handleSkillsOpen}
  isModalOpen = {shouldModalRender}
  />
  )
};
