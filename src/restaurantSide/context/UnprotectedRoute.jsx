import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';

export default function UnprotectedRoute() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(user);
      } else {
        setIsAuth(false);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return !isAuth ? <Outlet /> : <Navigate to="/restaurant/home" />; 
}

UnprotectedRoute.propTypes = {
  children: PropTypes.node
}
