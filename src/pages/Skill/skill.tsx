import { useAppSelector } from "@/services/hooks";
import {  userSkillListSlice } from "@/services/slices";
import { useState, type FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SkillUI } from "./skillUI";
import { selectSwapCards } from "@/services/selectors/swapCardSelector";
import { Preloader } from "@/shared/ui/preloader";
import { userSelectors } from "@/services/slices/user";
import { AppRoutes } from "@/shared/lib/constants";
import { SkillActionModal } from "@/widgets/skillActionModal";
import { Icon } from "@/shared/ui/Icon";

export const Skill: FC = () => {
  const [showModal, setShowModal ] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const { id } = useParams();
  const currentUser = useAppSelector(userSelectors.selectUser);

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

  const handleOnClose = ()=>{
    setShowModal(false);
  }

   const handleOnOpen = ()=>{
    setShowModal(true);
  }

  const onSwapClick =()=>{
    if(!currentUser){
      navigate(AppRoutes.Login,{state: { from: location.pathname}})
    }else{
      handleOnOpen()
    }
  }

  return (
    <>
    {showModal &&
      <SkillActionModal
        image={<Icon name='icon-notification' fill={'none'} size={100}/>}
        maintText={'Вы предложили обмен'}
        secondaryText={'Теперь дождитесь подтверждения. Вам придёт уведомление'}
        primaryBtnText={"Готово"}
        onClose={handleOnClose}
        isOpen={showModal}
      />
    }
      <SkillUI
        user={user}
        skill={userSkill}
        suggestionCards={suggestionCards}
        onSwapClick={onSwapClick}
      />
    </>
  );
};
