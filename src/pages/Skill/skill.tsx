import { useAppSelector } from "@/services/hooks";
import {  userSkillListSlice } from "@/services/slices";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import { SkillUI } from "./skillUI";
import { selectSwapCards } from "@/services/selectors/swapCardSelector";
import { Preloader } from "@/shared/ui/preloader";

export const Skill: FC = () => {
  const { id } = useParams();

  const cards = useAppSelector(selectSwapCards);

  const skills = useAppSelector(userSkillListSlice.selectors.selectSkillUserList);
  const skill = skills?.find((skill) => skill._id === id);

  const userCard = cards?.find((card) => card.user._id === skill?.userId);

  const userSkill = userCard?.skill;
  const user = userCard?.user;

  //сортировка по похожим предложениям

  const targetSuggestion = userCard?.skill.category;

  const matching = cards.filter(item => item.skill.category=== targetSuggestion);
  const nonMatching = cards.filter(item => item.skill.category !== targetSuggestion);
  const suggestionCards = [...matching, ...nonMatching];


  if (!user || !userSkill) {
    return <Preloader />;
  }

  return (
    <SkillUI
      user={user}
      skill={userSkill}
      suggestionCards={suggestionCards}
    />
  );
};
