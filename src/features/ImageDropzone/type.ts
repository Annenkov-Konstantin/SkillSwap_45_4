export type TImageDropzoneProps = {
  handleDelete?: (file: File) => void;
  onImagesAdded?: (files: File[]) => void;
  onImageRemoved?: (index: number, file: File) => void;
  images:string[];
}
