import type { TUser } from "@/entities/user";
import { requestStatus } from "./constants";
import type { TUserSkill } from "@/entities/userSkill";

export type TRequestStatus = typeof requestStatus[keyof typeof requestStatus];


export type SkillCard = {
  user:TUser;
  skill:TUserSkill;
}

export type TSetfirstStepForm = {
  email: string;
  password: string;
}
