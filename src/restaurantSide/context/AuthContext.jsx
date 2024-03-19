import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [restaurantIds, setRestaurantIds] = useState({
    uid: null,
    docId: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const restaurantCollection = collection(db, 'restaurants');
        const restaurantQuery = query(
          restaurantCollection,
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(restaurantQuery);
        let docId;
        querySnapshot.docs.forEach((doc) => {
          docId = doc.id;
        });
        if (!docId || !user.uid) {
          setRestaurantIds({});
        } else {
          setRestaurantIds({ docId, uid: user.uid });
        }
      } else {
        // User is signed out
        setRestaurantIds({});
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ restaurantIds, setRestaurantIds }}>
      {children}
    </AuthContext.Provider>
  );
} 

AuthProvider.propTypes = {
    children: PropTypes.node
}