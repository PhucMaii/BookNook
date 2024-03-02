import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { LogoImg, SideImg } from './styled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
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
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchData } from '../../../utils/firebase';
import { where } from 'firebase/firestore';
import { getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../../firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { LoadingButton } from '@mui/lab';
import UnprotectedRoute from '../../context/UnprotectedRoute';
import Notification from '../../../restaurantSide/components/Notification';
import { handleErrorMsg } from '../../../utils/error';

const CustomerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setCustomerIds } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkIsUserInDB = async (email) => {
    try {
      const users = await fetchData('users', where('email', '==', email));
      return users.length > 0 ? users : false;
    } catch (error) {
      console.log('Fail to check user in DB: ', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateSchema: Yup.object({
      email: Yup.string()
        .max(255)
        .email('Must be a valid email')
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const isUserInDB = await checkIsUserInDB(values.email);
        if (!isUserInDB) {
          setNotification({
            on: true,
            severity: 'error',
            message: 'User Does Not Exist',
          });
          setIsLoading(false);
          return;
        }

        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        
        setCustomerIds({uid: userCredential.user.uid, docId: isUserInDB[0].id});

        setNotification({
          on: true,
          severity: 'success',
          message: 'Signing in...'
        })

        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 2000)
      } catch (error) {
        console.log('Fail to log customer in: ', error);
        setIsLoading(false);
      }
    },
  });

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

      setCustomerIds({ uid: userCredentials.user.uid, docId: isUserValid });

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
      setIsLoading(false);
    }
  }

  return (
    <UnprotectedRoute>
      <Grid
        container
        columnSpacing={2}
        justifyContent="center"
        overflow="hidden"
        maxHeight="100%"
      >
        <Notification 
          notification={notification}
          onClose={() => setNotification({...notification, on: false})}
        />
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" margin="auto" width="50%">
            <Box display="flex" justifyContent="center" my={6}>
              <LogoImg src="/customerLogo.png" alt="Restaurant Logo" />
            </Box>
            <Typography variant="h3" fontWeight="bold">
              Login
            </Typography>
            <Typography variant="subtitle1" color={grey[500]} fontWeight="bold">
              Enter your credentials to access your account
            </Typography>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3} mt={3}>
                <TextField
                  color="secondary"
                  id="outlined-required"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.email && formik.errors.email}
                  error={!!(formik.touched.email && formik.errors.email)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  margin="auto"
                  width="100%"
                >
                  <FormControl error={!!(formik.touched.password && formik.errors.password)} variant="outlined">
                    <InputLabel color="secondary">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      color="secondary"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText>
                      {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                  </FormControl>
                  <Link component="button">
                    <Typography textAlign="right" variant="subtitle2">
                      Forgot Password?
                    </Typography>
                  </Link>
                </Box>
                <LoadingButton 
                  type="submit"
                  loading={isLoading}
                  loadingIndicator="Signing in..." 
                  variant="contained" 
                  style={{ color: 'white' }}
                >
                  Sign in
                </LoadingButton>
                <Divider variant="middle">
                  <Typography variant="body2">Or</Typography>
                </Divider>
                <LoadingButton
                  loading={isLoading}
                  loadingIndicator="Signing in..." 
                  onClick={handleSigninWithGoogle} 
                  variant="outlined"
                >
                  <Box display="flex" gap={2} alignItems="center">
                    <img src="/icons/googleLogo.png" alt="Google Logo" />
                    <Typography>Sign in with Google</Typography>
                  </Box>
                </LoadingButton>
              </Box>
            </form>
            <Typography textAlign="right" variant="subtitle1">
              Don&apos;t have an account yet?
              <Link component="button" to="/customer/signup">
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

export default CustomerLogin;
