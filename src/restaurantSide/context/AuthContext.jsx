import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [restaurantIds, setRestaurantIds] = useState({});

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setRestaurantIds({...restaurantIds, uid: user.uid});
        } else {
          // User is signed out
          setRestaurantIds({});
        }
      });
      return () => unsubscribe();
    }, []);
  
    
    return (
        <AuthContext.Provider value={{restaurantIds, setRestaurantIds}}>
            { children }
        </AuthContext.Provider>
    )
} 

AuthProvider.propTypes = {
    children: PropTypes.node
}