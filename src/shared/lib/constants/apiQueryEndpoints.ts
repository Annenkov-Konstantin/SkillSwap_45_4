export const QUERY_ENDPOINTS = {
  getAllCities:'rest/v1/rpc/get_cities',
  getAllUsers:'rest/v1/rpc/get_users',
  getUserById:'rest/v1/rpc/get_user_by_id',
  registerUser:'rest/v1/rpc/add_new_user',
  getUserRefresh:'auth/v1/token?grant_type=refresh_token',
  authUser:'auth/v1/user',
  getUserByAuthId:'rest/v1/rpc/get_user_by_auth_id',
  updateUserProfile:'rest/v1/rpc/update_user_profile',
  loginUser:'auth/v1/token?grant_type=password'

} as const;
