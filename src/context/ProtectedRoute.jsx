import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export default function ProtectedRoute({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(false);
      }
    });
    return () => {
      listen();
    };
  }, []);

  if (!authUser) {
    navigate("/restaurant-login"); // Change to right path
    return;
  }

  return (
    <ProtectedRoute.Provider value={authUser}>
      {children}
    </ProtectedRoute.Provider>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}
