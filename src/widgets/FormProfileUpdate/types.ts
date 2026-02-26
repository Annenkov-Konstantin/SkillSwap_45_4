import type {TUser} from '@entities/user';

export type TFormProfileUpdate = Partial<TUser>;

export type THandleFieldChange = (
  fieldName: keyof TFormProfileUpdate
) => (value: string | null) => void;

export type TProfileUiProps = {
  formData: TFormProfileUpdate;
  handleFieldChange: THandleFieldChange;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoClick: () => void;
  avatarPic: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};
