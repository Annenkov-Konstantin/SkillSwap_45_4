import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { SkillCard } from '@/shared/lib/types';


const selectUserList = (state: RootState) => state.userList.userList;
const selectUserSkillList = (state: RootState) => state.userSkillList.userSkillList;

  export const selectSwapCards = createSelector(
    [selectUserList, selectUserSkillList],
    (users, userSkills) => {

    if (!Array.isArray(users) || !Array.isArray(userSkills) ){
      return [];
    }

    if (users.length === 0 || userSkills.length === 0) {
      return [];
    }

    const userMap = new Map(users!.map(user => [user._id, user]));

    const skillSwapList = userSkills!.reduce<SkillCard[]>((acc , skill) => {
      const user = userMap.get(skill.userId);
      if (user) acc.push({
        user, skill
      })
      return acc;
    },[])

    return skillSwapList

  })
