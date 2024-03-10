import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const AuthContext = createContext(null);

export default function CustomerAuthProvider({ children }) {
  const [customerIds, setCustomerIds] = useState({
    uid: null,
    docId: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const usersCollection = collection(db, 'users');
        const usersQuery = query(
          usersCollection,
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(usersQuery);
        let docId;
        querySnapshot.docs.forEach((doc) => {
          docId = doc.id;
        });
        if (!docId || !user.uid) {
          setCustomerIds({});
        } else {
          setCustomerIds({ docId: docId, uid: user.uid });
        }
      } else {
        // User is signed out
        setCustomerIds({});
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ customerIds, setCustomerIds }}>
      {children}
    </AuthContext.Provider>
  );
}

CustomerAuthProvider.propTypes = {
    children: PropTypes.node
}