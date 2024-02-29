import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

export default function UnprotectedRoute({ children }) {
  const { customerIds } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // if (restaurantIds.uid === null) {
  //   return <SplashScreen/>
  // }

  if (customerIds.uid) {
    navigate('/');
  }

  return children;
}

UnprotectedRoute.propTypes = {
  children: PropTypes.node
}