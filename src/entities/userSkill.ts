export type TUserSkill = {
  _id: string;
  type: 'teach' | 'learn';
  title: string;
  description: string;
  category: number;
  subCategory: number;
  images: string[];
  likes: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
