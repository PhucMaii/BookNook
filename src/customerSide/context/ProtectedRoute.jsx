import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SplashScreen } from '../../lib/utils';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { customerIds } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (customerIds.uid === null) {
    return <SplashScreen/>
  }

  if (!customerIds.uid) {
    navigate('/customer/login');
  }
  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}