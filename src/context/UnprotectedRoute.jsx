import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

export default function UnprotectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

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

  if (isAuth) {
    navigate('/restaurant/dashboard');
    return;
  }

  return (
    children
  )
}

UnprotectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}
