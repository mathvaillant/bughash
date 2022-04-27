import React, { PropsWithChildren } from 'react'
import { Navigate, Outlet } from "react-router";

interface Props {
  isAuthenticated: boolean
  children?: React.ReactNode
  redirectPath?: string
  isAllowed?: boolean
}

const ProtectedRoute: React.FC<Props> = ({ 
  isAuthenticated = false, 
  children = null, 
  redirectPath = '/login' 
}: PropsWithChildren<Props>): any => {

  if(!isAuthenticated) {
    return <Navigate to={redirectPath} replace /> 
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute