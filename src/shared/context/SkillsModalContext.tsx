import { createContext } from 'react';

// Описываю тип данных в контексте
export type TSkillsModalContext = [
   boolean,  // isSkillModalVisible (буль из homeCatalog)
  (value: boolean) => void,  // setSkillModalVisible (меняет состояние)
]

// Создание контекста
export const SkillsModalContext = createContext<TSkillsModalContext>([
  false,
  () => {},  // пустая функция по-умолчанию
]);
