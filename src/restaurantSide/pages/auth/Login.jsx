import React, { useContext, useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  Divider,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { LogoImg, SideImg } from './styled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../../../../firebaseConfig';
import { where } from 'firebase/firestore';
import { handleErrorMsg } from '../../../utils/error';
import { AuthContext } from '../../context/AuthContext';
import UnprotectedRoute from '../../context/UnprotectedRoute';
import { fetchData } from '../../../utils/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setRestaurantIds } = useContext(AuthContext);

  const checkIsUserInDB = async (email) => {
    try {
      const existingRestaurants = await fetchData('restaurants', where('email', '==', email));
      return existingRestaurants.length > 0;
    } catch (error) {
      console.log('Fail to check user in DB: ', error);
    }
  };

  const checkIsEmailInUserDB = async (email) => {
    const existingUsers = await fetchData('users', where('email', '==', email));
    return existingUsers.length > 0;
  } 

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginWithEmailAndPassword = async () => {
    if (!email || !password) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Please fill out all the fields.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const isUserValid = await checkIsUserInDB(email);
      if (!isUserValid) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'User Not Found',
        });
        setIsLoading(false);
        return;
      }

      const isEmailUseInUsertDB = await checkIsEmailInUserDB(email);
      if (isEmailUseInUsertDB) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'Email is not available for this role',
        });
        setIsLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);

      setRestaurantIds((prevIds) => ({ ...prevIds, docId: isUserValid }));

      setNotification({
        on: true,
        severity: 'success',
        message: 'Sign user in...',
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/restaurant/overview');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to login with email and password: ', error);
      setNotification({
        on: true,
        severity: 'error',
        message: handleErrorMsg(error.code),
      });
    }
  };

  const handleSigninWithGoogle = async () => {
    setIsLoading(true);
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);

      // Handle user sign in with non-exist email
      if (getAdditionalUserInfo(userCredentials).isNewUser) {
        await userCredentials.user.delete();
        setNotification({
          on: true,
          severity: 'error',
          message: 'User Not Found',
        });
        setIsLoading(false);
        return;
      }

      const isUserValid = await checkIsUserInDB(userCredentials.user.email);

      if (!isUserValid) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'User Not Found',
        });
        setIsLoading(false);
        return;
      }

      const isEmailInUserDB = await checkIsEmailInUserDB(userCredentials.user.email);
      if (isEmailInUserDB) {
        await signOut(auth);
        setNotification({
          on: true,
          severity: 'error',
          message: 'Email is not available for this role',
        });
        setIsLoading(false);
        return;
      }

      setRestaurantIds((prevIds) => ({ ...prevIds, docId: isUserValid }));

      setNotification({
        on: true,
        severity: 'success',
        message: 'Sign in...',
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/restaurant/overview');
      }, 2000);
    } catch (error) {
      console.log('Fail to login with google: ', error);
      setNotification({
        on: true,
        severity: 'error',
        message: handleErrorMsg(error.code),
      });
    }
  };

  return (
    <UnprotectedRoute>
      <Grid
        container
        columnSpacing={2}
        justifyContent="center"
        overflow="hidden"
        maxHeight="100%"
      >
        <Snackbar
          open={notification.on}
          autoHideDuration={5000}
          onClose={() => setNotification({ on: false })}
        >
          <Alert severity={notification.severity}>{notification.message}</Alert>
        </Snackbar>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" margin="auto" width="50%">
            <Box display="flex" justifyContent="center" my={6}>
              <LogoImg src="/restaurantLogo.png" alt="Restaurant Logo" />
            </Box>
            <Typography variant="h3" fontWeight="bold">
              Login
            </Typography>
            <Typography variant="subtitle1" color={grey[500]} fontWeight="bold">
              Enter your credentials to access your account
            </Typography>
            <Box display="flex" flexDirection="column" gap={3} mt={3}>
              <TextField
                id="outlined-basic"
                label="Email Address"
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box
                display="flex"
                flexDirection="column"
                margin="auto"
                width="100%"
              >
                <FormControl variant="outlined">
                  <InputLabel color="secondary">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    color="secondary"
                    startAdornment={
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Link component="button" to="/restaurant/forgot-password">
                  <Typography textAlign="right" variant="subtitle2">
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              <LoadingButton
                loading={isLoading}
                loadingIndicator="Sign in..."
                color="secondary"
                onClick={handleLoginWithEmailAndPassword}
                variant="contained"
              >
                Sign in
              </LoadingButton>
              <Divider variant="middle">
                <Typography variant="body2">Or</Typography>
              </Divider>
              <LoadingButton
                color="secondary"
                loading={isLoading}
                loadingIndicator="Sign in with Google"
                onClick={handleSigninWithGoogle}
                variant="outlined"
              >
                <Box display="flex" gap={2} alignItems="center">
                  <img src="/icons/googleLogo.png" alt="Google Logo" />
                  Sign in with Google
                </Box>
              </LoadingButton>
            </Box>
            <Typography mt={1} textAlign="right" variant="subtitle2">
              Don&apos;t have an account yet?
              <Link component="button" to="/restaurant/signup">
                Click here to sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Box></Box>
        <Grid item xs={12} md={6}>
          <SideImg src="/restaurantLoginImg.png" alt="Login Img" />
        </Grid>
      </Grid>
    </UnprotectedRoute>
  );
};

export default Login;
