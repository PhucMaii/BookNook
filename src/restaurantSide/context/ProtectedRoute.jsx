import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SplashScreen } from '../../lib/utils';

export default function ProtectedRoute() {
  const { uid } = useContext(AuthContext);
  
  if (uid === null) {
    return <SplashScreen/>
  }
  return uid ? <Outlet /> : <Navigate to="/restaurant/login" />;
}

