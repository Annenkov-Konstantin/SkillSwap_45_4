import React, { useCallback, useRef, useState } from "react";
import { FormProfileUpdateUi } from "./FormProfileUpdateUi";
import type { TFormProfileUpdate, TFormProfileUpdateProp, THandleFieldChange } from "./types";
import { useAppSelector, useDispatchedActions } from "@/services/hooks";
import { userActions, userSelectors } from "@/services/slices/user";
import { userSkillListActions } from "@/services/slices/userSkillList";

export const FormProfileUpdate: React.FC<TFormProfileUpdateProp> =({onModalAction}) => {
  const [formData, setFormData] = useState<TFormProfileUpdate>({});
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gender = useAppSelector(userSelectors.selectUserGender);
  const { fetchUpdateUserApi } = useDispatchedActions(userActions)
  const { fetchUserListSkills } = useDispatchedActions(userSkillListActions)

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const avatarUrl = reader.result as string;
        setAvatar(avatarUrl);
        setFormData(prev => ({
          ...prev, avatarPic: avatarUrl,
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
        fetchUpdateUserApi(formData)
        .then(()=>onModalAction())
      };

  return (
    <form onSubmit={handleSubmit}>
      <FormProfileUpdateUi
        formData={formData}
        handleFieldChange={handleFieldChange}
        handleImageSelect={handleImageSelect}
        handlePhotoClick={handlePhotoClick}
        avatar={avatar}
        fileInputRef={fileInputRef}
        isMale={gender}
      />
    </form>
  );
};
