import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [uid, setUid] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUid(user.uid);
        } else {
          // User is signed out
          setUid('');
        }
      });
      return () => unsubscribe();
    }, []);
  
    
    return (
        <AuthContext.Provider value={{uid, setUid}}>
            { children }
        </AuthContext.Provider>
    )
} 

AuthProvider.propTypes = {
    children: PropTypes.node
}