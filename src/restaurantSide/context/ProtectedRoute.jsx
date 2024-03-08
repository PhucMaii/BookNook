import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SplashScreen } from '../../lib/utils';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { restaurantIds } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (restaurantIds.uid === null) {
    return <SplashScreen color="secondary"/>
  }

  if (!restaurantIds.uid) {
    navigate('/restaurant/login');
  }
  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}