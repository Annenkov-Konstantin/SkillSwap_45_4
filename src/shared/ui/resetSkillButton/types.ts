import type { TSkill } from '@entities/skills';

export interface IResetSkillButtonProps {
  skill: TSkill;
  onSkillToggle: (skill:TSkill) => void;
}
