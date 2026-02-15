import type { TSkills } from "@/entities/skills";
import type { Dispatch, SetStateAction } from "react";

export type THeaderUIProps = {
  userName: string;
  userPhoto: string;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleTriggerClick: () => void;
  isSkillsOpen: boolean;
  isLogin: boolean;
};

export type THeaderProps = Pick<THeaderUIProps,
  'userName'
  |'userPhoto'
  |'isLogin'
  > & {
    isSkillsOpen: boolean;
    setIsSkillsOpen:(value:boolean)=>void;
  }
