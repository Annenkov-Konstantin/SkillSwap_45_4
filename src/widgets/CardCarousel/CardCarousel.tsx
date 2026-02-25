import { useRef, type FC } from "react";
import styles from './CardCarousel.module.scss';
import type { CardCarouselProps } from "./type";
import { UserCard } from "../UserCard";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";

import { useState } from 'react';

export const CardCarouselUI: FC<CardCarouselProps> = ({ cards, title }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.swiper_container}>
        <Swiper
          spaceBetween={24}
          slidesPerView={4}
          className={styles.swiper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {cards.map((card, cardIndex) => (
            <SwiperSlide key={cardIndex}>
              <UserCard user={card.user} swap={card.skill} />
            </SwiperSlide>
          ))}
        </Swiper>

        {(cards.length > 4) && (
          <>
            {!isBeginning && (
              <button className={styles.buttonPrev} onClick={() => swiperRef.current?.slidePrev()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" fill="none">
                  <path fill="#69735d" d="M4.83 10.667a.46.46 0 0 0 .326-.136.464.464 0 0 0 0-.652L1.144 5.868a.76.76 0 0 1 0-1.07L5.156.785a.464.464 0 0 0 0-.652.464.464 0 0 0-.652 0L.492 4.145A1.68 1.68 0 0 0 0 5.333c0 .449.172.873.492 1.187l4.012 4.011c.092.086.209.136.326.136"/>
                </svg>
              </button>
            )}

            {!isEnd && (
              <button className={styles.buttonNext} onClick={() => swiperRef.current?.slideNext()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" fill="none">
                  <path fill="#69735d" d="M.46 10.667a.46.46 0 0 1-.326-.136.464.464 0 0 1 0-.652l4.011-4.011a.76.76 0 0 0 0-1.07L.134.785a.464.464 0 0 1 0-.652.464.464 0 0 1 .652 0l4.011 4.011c.314.314.493.738.493 1.188s-.173.873-.493 1.187L.786 10.531a.48.48 0 0 1-.326.136"/>
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// export const CardCarouselUI: FC<CardCarouselProps> = ({ cards, title }) => {
//   const swiperRef = useRef<SwiperClass | null>(null);
//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(false);

//   return (
//     <section className={styles.container}>
//       <h2>{title}</h2>
//       <div className={styles.swiper_container}>
//         <Swiper
//           spaceBetween={24}
//           slidesPerView={4}
//           className={styles.swiper}
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//           onSlideChange={(swiper) => {
//             setIsBeginning(swiper.isBeginning);
//             setIsEnd(swiper.isEnd);
//           }}
//         >
//           {cards.map((card, cardIndex) => (
//             <SwiperSlide key={cardIndex}>
//               <UserCard user={card.user} swap={card.skill} />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {!isBeginning && (
//           <button className={styles.buttonPrev} onClick={() => swiperRef.current?.slidePrev()}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" fill="none">
//               <path fill="#69735d" d="M4.83 10.667a.46.46 0 0 0 .326-.136.464.464 0 0 0 0-.652L1.144 5.868a.76.76 0 0 1 0-1.07L5.156.785a.464.464 0 0 0 0-.652.464.464 0 0 0-.652 0L.492 4.145A1.68 1.68 0 0 0 0 5.333c0 .449.172.873.492 1.187l4.012 4.011c.092.086.209.136.326.136"/>
//             </svg>
//           </button>
//         )}

//         {!isEnd && (
//           <button className={styles.buttonNext} onClick={() => swiperRef.current?.slideNext()}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" fill="none">
//               <path fill="#69735d" d="M.46 10.667a.46.46 0 0 1-.326-.136.464.464 0 0 1 0-.652l4.011-4.011a.76.76 0 0 0 0-1.07L.134.785a.464.464 0 0 1 0-.652.464.464 0 0 1 .652 0l4.011 4.011c.314.314.493.738.493 1.188s-.173.873-.493 1.187L.786 10.531a.48.48 0 0 1-.326.136"/>
//             </svg>
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };
