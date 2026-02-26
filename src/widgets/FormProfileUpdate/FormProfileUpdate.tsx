import { useCallback, useRef, useState } from "react";
import { FormProfileUpdateUi } from "./FormProfileUpdateUi";
import type { TFormProfileUpdate, THandleFieldChange } from "./types";

export const FormProfileUpdate: React.FC = () => {
  const [formData, setFormData] = useState<TFormProfileUpdate>({});
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const avatarUrl = reader.result as string;
        setAvatar(avatarUrl);
        setFormData(prev => ({
          ...prev, avatar: avatarUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  }, []);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFieldChange: THandleFieldChange = (fieldName) => (value) => {

    setFormData((prev) => ({
      ...prev, [fieldName]: value
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Submit form:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormProfileUpdateUi
        formData={formData}
        handleFieldChange={handleFieldChange}
        handleImageSelect={handleImageSelect}
        handlePhotoClick={handlePhotoClick}
        avatar={avatar}
        fileInputRef={fileInputRef} />
    </form>
  );
};