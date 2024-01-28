import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { createContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return isAuth ? <Outlet /> : <Navigate to="/restaurant/signin" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}
