import type { THeaderProps } from "./type";
import { useState, type FC, useContext, useEffect } from "react";
import { HeaderUI } from "./HeaderUI";
import { SkillsModalContext } from "@/shared/context/SkillsModalContext"; // сюда контекст
import { useDispatchedActions } from "@/services/hooks";
import { filterActions } from "@/services/slices/filter";
import { capitalizeFirstChar } from "@/shared/lib/utils/capitalizeFirstChar";

export const Header: FC<THeaderProps> = ({
        userPhoto,
        userName,
        isLogin,
      }) => {
  const [ search, setSearch ]= useState('');
  // юзаем контекст состояния модалки
  const [shouldModalRender, setShouldmodalRender] = useContext(SkillsModalContext);
  const { searchChange } = useDispatchedActions(filterActions);

  const handleSkillsOpen = () => {
    setShouldmodalRender(true);
  };

   useEffect(() => {
    const timer = setTimeout(() => {
      const targetSearchString = capitalizeFirstChar(search)
      searchChange(targetSearchString.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);



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
