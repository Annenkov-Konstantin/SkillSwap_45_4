import { Swiper as SwiperType } from 'swiper';

export type SkillGalleryProps = {
  images: string[];
  title: string;
}

export type SkillGalleryUIProps = {
  thumbsSwiper: SwiperType | null;
  setThumbsSwiper: (swiper: SwiperType | null) => void;
  hiddenCount: number;
  handleMainSlideChange: (swiper: SwiperType) => void;
  images: string[];
  title: string;
  handleThumbsSlideChange: (swiper: SwiperType) => void;
  shouldShowCounter: boolean;
}
