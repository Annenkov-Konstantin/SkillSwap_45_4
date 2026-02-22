import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from "./type";
import { useAppSelector } from '@store-hooks'

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({onlyUnAuth, children}) => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
}
