import type { TSkills } from "@/entities/skills";
import type { Dispatch, SetStateAction } from "react";

export type THeaderUIProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleModalOpen:()=>void;
  isModalOpen:boolean;
};
