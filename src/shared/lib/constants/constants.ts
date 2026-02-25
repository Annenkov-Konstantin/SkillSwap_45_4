import type { HomeCatalog } from "@/pages/HomeCatalog";
import type { Favourites } from "@/shared/ui";

// для Api запросов
export const QUERY_ENDPOINTS = {
  getAllCities: 'rest/v1/rpc/get_cities',
  getAllUsers: 'rest/v1/rpc/get_users',
  signUp: 'auth/v1/signup',
  getDefaultSkills: 'rest/v1/rpc/get_categories_with_skills',
  getUserById: 'rest/v1/rpc/get_user_by_id',
  registerUser: 'rest/v1/rpc/add_new_user',
  getUserRefresh: 'auth/v1/token?grant_type=refresh_token',
  authUser: 'auth/v1/user',
  getUserByAuthId: 'rest/v1/rpc/get_user_by_auth_id',
  updateUserProfile: 'rest/v1/rpc/update_user_profile',
  loginUser: 'auth/v1/token?grant_type=password',
  addNewUserSkill: 'rest/v1/rpc/add_new_user_skill',
  getSkillById: 'rest/v1/rpc/get_user_skill_by_id',
  getAllUserSkills: 'rest/v1/rpc/get_user_skills',
  likeUserSkill: 'rest/v1/rpc/update_skill_likes',
  toggleFavorite: 'rest/v1/rpc/toggle_favorite_skill_array'
} as const;

// Имена слайсов
export const SLICE_NAMES = {
  USER_LIST: 'userList',
  USER_SKILL_LIST: 'userSkillList',
  SKILLS: 'skills',
  CITY: 'city',
  USER: 'user',
  FILTER: 'filter',
  FORM: 'form'
} as const;

export const requestStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

//навигация
export const AppRoutes =  {
  HomeCatalog : '/',
  Login:'/login',
  RegistrationLayout:'/register',
  RegAccount:'/register/account',
  RegPersonal:'/register/personal',
  RegSkill:'/register/skill/:id',
  Profile:'profile',
  Favourites:'/profile/favourites',
  Settings:'/settings',
  Error:'error',


  ProfileOrderInfo : '/profile/orders/:number'
} as const;
