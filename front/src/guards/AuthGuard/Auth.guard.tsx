import { AppStore, PublicRoutes, User } from '@/models';
import { getLocalStorage } from '@/utilities';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
export interface AuthInterface {}

const AuthGuard: React.FC<AuthInterface> = () => {
  const userState = useSelector((store: AppStore): User => store.user);
  const userFromLocalStorage = getLocalStorage('user');
  let location = useLocation();
  return userFromLocalStorage ? (
    <Outlet />
  ) : (
    <Navigate to={`${PublicRoutes.LOGIN}`} state={{ from: location }} />
  );
};

export default AuthGuard;
