export type TFormProfileUpdate = {
  id?: string;
  email?: string;
  name?: string;
  date?: string;
  sex?: string;
  city?: string;
  description?: string;
  avatar?: string;
};

export type THandleFieldChange = (
  fieldName: keyof TFormProfileUpdate
) => (value: string | null) => void;

export type TProfileUiProps = {
  formData: TFormProfileUpdate;
  handleFieldChange: THandleFieldChange;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoClick: () => void;
  avatar: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};