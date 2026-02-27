import type { TUserSkill } from "@/entities/userSkill";


export type SkillDetailsProps = {
  skill:TUserSkill;
  onSwapClick?:()=>void;
}


// export type SkillDetailsProps = {
//   title: string;
//   images: string[];
//   categoryId: number;
//   skillId: number;
//   description: string;
//   onSwapClick?:()=>void;
// }
