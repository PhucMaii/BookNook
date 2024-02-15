import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SplashScreen } from '../../lib/utils';

export default function UnprotectedRoute() {
  const { restaurantIds } = useContext(AuthContext);
  
  if (restaurantIds.uid === null) {
    return <SplashScreen/>
  }
  return !restaurantIds.uid ? <Outlet /> : <Navigate to="/restaurant/overview" />; 
}