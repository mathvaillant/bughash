import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router";

const PrivateRoutes: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = true;

  return isAuthenticated 
  ? <Outlet />
  : <Navigate to={'/login'} replace state={{ from: location }} />
}

export default PrivateRoutes;