import type { FC } from "react";
import styles from './CardCarousel.module.scss';
import type { CardCarouselProps } from "./type";
import { UserCard } from "../UserCard";

export const CardCarouselUI: FC<CardCarouselProps> = ({ cards }) => {

  return (
    <section className={styles.container}>
      <h2>Похожие предложения</h2>
      <ul className={styles.card_list}>
        {cards.slice(3).map((card) => (
          <UserCard user={card.user} swap={card.skill} />
        ))}
      </ul>
    </section>
  );
};
