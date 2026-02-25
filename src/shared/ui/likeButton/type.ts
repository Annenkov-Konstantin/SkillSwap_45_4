export type TLikeButtonProps = {
  isLiked: boolean;
  onClick: (e:React.MouseEvent) => void;
  likeRef?: React.Ref<HTMLButtonElement>;
  likeButtonId?:string;
};
