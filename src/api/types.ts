import type { TCity } from "@/entities/city";
import type { TUser } from "@/entities/user";

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TCityResponse = TServerResponse<{
  data:TCity[];
}>;

export type TGetAllUsers = TServerResponse<{
  data:TUser[]
}>;

export type TTokens = {
  refresh_token: string;
  access_token: string;
}

export type TRegisterData = Pick<TUser,
  'name' |
  'location' |
  'dateOfBirth' |
  'gender' |
  'avatarPic' |
  'email' |
  'aboutMe' |
  'toLearn' |
  'canTeach'|
  'favoriteSkills'
> & {
  password: string;
};

export type TRegisterErrorResponse = {
  success: boolean;
  message: string;
}

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


export type TUpdateUserResponse = TServerResponse<{
  data: TUser;
  message:string;
}>;


export type TUserResponse= {
    id: string;
    email: string;
  }

export type TAuthUser = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  user: {
    id: string;
    email: string;
  }
}

// export type TIngredientsResponse = TServerResponse<{
//   data: TIngredient[];
// }>;

// export type TFeedsResponse = TServerResponse<{
//   orders: TOrder[];
//   total: number;
//   totalToday: number;
// }>;

// export type TOrdersResponse = TServerResponse<{
//   data: TOrder[];
// }>;

// export type TNewOrderResponse = TServerResponse<{
//   order: TOrder;
//   name: string;
// }>;

// export type TOrderResponse = TServerResponse<{
//   orders: TOrder[];
// }>;


// export type TAuthResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
//   user: TUser;
//   message?: string;
// }>;

// export type TUserResponse = TServerResponse<{ user: TUser }>;

// export type TLoginData = {
//   email: string;
//   password: string;
// };
