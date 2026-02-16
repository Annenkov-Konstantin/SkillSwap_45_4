import type { TSkills } from "@/entities/skills";
import type { Dispatch, SetStateAction } from "react";

export type THeaderUIProps = {
  userName: string;
  userPhoto: string;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLogin: boolean;
  handleModalOpen:()=>void;
  isModalOpen:boolean;
};

export type THeaderProps = Pick<THeaderUIProps,
  'userName'
  |'userPhoto'
  |'isLogin'
  >
