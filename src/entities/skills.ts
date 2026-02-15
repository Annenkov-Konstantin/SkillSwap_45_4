
export type TSkill = {
  id: number;
  title: string;
}

export type TCategory = {
  id: number;
  category: string;
  skills: TSkill[];
}

export type TSkills = TCategory[];
