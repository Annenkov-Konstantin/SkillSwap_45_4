import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from "./type";
import { useAppSelector } from '@store-hooks'
import { userSelectors } from "@/services/slices/user";
import { Preloader } from "@/shared/ui/preloader";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isPublic}) => {
  const  user  = useAppSelector(userSelectors.selectUser);
  const isAuth = useAppSelector(userSelectors.selectUserAuth);
  const location = useLocation();

  if (!isAuth){
    return <Preloader/>
  }

  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isPublic && user) {
     return <Navigate to={location?.state?.from || '/'} />;
  }


  return <Outlet/>;

}
