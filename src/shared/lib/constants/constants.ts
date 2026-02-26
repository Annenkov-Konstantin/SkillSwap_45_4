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
  toggleFavorite: 'rest/v1/rpc/toggle_favorite_skill'
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
  RegSkill:'/register/skill',
  Profile:'profile',
  Favourites:'/profile/favourites',
  Settings:'/settings',
  Error:'error',


  ProfileOrderInfo : '/profile/orders/:number'
} as const;

// В форме НЕТ поля для выбора картинок если выбирваем чему научиться
// Константа с моковыми изображениями (массив строк-URL)
const MOCK_IMAGES = [
  'https://img.freepik.com/premium-photo/concept-online-learning-laptop-training-supplies-turquoise-background-3d-render_407474-3330.jpg?semt=ais_hybrid',
  'https://img.freepik.com/premium-photo/neat-3d-render-laptop-open-book-graduation-cap-placed-top-stack-books_1039156-2568.jpg?semt=ais_hybrid&w=740&q=80',
  'https://triotechsoftwaretrainings.com/wp-content/uploads/2024/12/elearning-training-768x512.jpg',
  'https://img.freepik.com/premium-photo/student-hands-touching-lightbulb-which-have-mechanical-gear-inside-open-book-creative-thinking-problem-solving-education-knowledge-concept_50039-4115.jpg?semt=ais_hybrid&w=740'
]

export const mockSwapApiDataLearn ={
    title:'Хочу научиться чему - то новому и интересному!',
    description: 'Хочу научиться новому навыку который сможет сделать меня лучше в профессиональной сфере. Развить в себе полезные навыки и умения для достижения новых высот!',
    images: MOCK_IMAGES
  }
