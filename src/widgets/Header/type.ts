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
