import type { TCity } from "@/entities/city";
import type { TSkills } from "@/entities/skills";
import type { TUser } from "@/entities/user";
import type { TUserSkill } from "@/entities/userSkill";

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TCityResponse = TServerResponse<{
  data:TCity[];
}>;

export type TDefaultSkills = TServerResponse<{
  data:TSkills;
}>;

export type TRegisterResponse =
  | {
      success: true;
      profile: TUser;
      access_token: string;
      refresh_token: string;
      message?: string;
    }
  | {
      success: false;
      message: string;
      error_code?: string;  // error
    };

export type TGetAllUsers = TServerResponse<{
  data:TUser[]
}>;

export type TTokens = {
  refresh_token: string;
  access_token: string;
}

export type TRegisterData = Omit<TUser,
    '_id'
  | 'createdAt'
  | 'updatedAt'
> & {
  password: string;
};

export type TLoginCredentials = {
  email: string;
  password: string;
};


export type TGetAuthUserById = TServerResponse<{
  data: TUser;
  message?:string;
}>;

export type TUserSkillResponse = TServerResponse<{
  data:TUserSkill;
  message:string;
}>;

export type TUserAllSkillsResponse = TServerResponse<{
  data:TUserSkill[];
  message:string;
}>;

export type TSkillData = {
  title: string;
  description: string;
  type: 'teach' | 'learn';
  category: number;
  subcategory: number;
  images?: string[];
}

export type TUserResponse= {
    id: string;
    email: string;
  }

export type TRefreshAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  user: {
    id: string;
    email: string;
  }
}

export type TLikeResponse = {
  success: boolean;
  message: string;
  data?: {
    likes: number;
    skillId: string;
  };
};
