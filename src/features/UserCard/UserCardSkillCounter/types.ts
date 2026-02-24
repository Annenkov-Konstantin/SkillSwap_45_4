import type { TSkillAdapter } from "../UserCardSkill/type";

export type TUserCardSkillCounterProps = {
  counter: number;
  skills?:TSkillAdapter[];
  visibleSkills?:TSkillAdapter[];
};
