export type TLikeButtonProps = {
  isLiked: boolean | undefined;
  onClick: (e:React.MouseEvent) => void;
  likeRef?: React.Ref<HTMLButtonElement>;
  likeButtonId?:string;
};
