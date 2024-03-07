import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyIcon from '@mui/icons-material/Key';
import { LogoImg, SideImg } from './styled';
import { grey } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import AddressInput from '../../../restaurantSide/components/AddressInput';
import { fetchData } from '../../../utils/firebase';
import { addDoc, collection, where } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../../../../firebaseConfig';
import Notification from '../../../restaurantSide/components/Notification';
import { LoadingButton } from '@mui/lab';
import { AuthContext } from '../../context/AuthContext';
import { fetchLatLong } from '../../../utils/location';

const CustomerSignUp = () => {
  const [address, setAddress] = useState('');
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setCustomerIds } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkIsUserInDB = async (email) => {
    try {
      const users = await fetchData('users', where('email', '==', email));
      return users.length > 0;
    } catch (error) {
      console.log('Fail to check user in DB: ', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(255).required('Name is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password length must be at least 6 characters')
        .max(255)
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), 'Passwords Do Not Match'])
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      if (!address) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'Address is required',
        });
        return;
      }
      setIsSubmitButtonLoading(true);

      try {
        const isUserInDB = await checkIsUserInDB(values.email);
        if (isUserInDB) {
          setNotification({
            on: true,
            severity: 'error',
            message: 'Email Exists Already',
          });
          setIsSubmitButtonLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, password, ...submittedData } = values;
        const location = await fetchLatLong(address.description);
        const usersCollection = collection(db, 'users');
        const docData = await addDoc(usersCollection, {
          ...submittedData,
          uid: userCredential.user.uid,
          address: { description: address.description, ...location }
        });
        setCustomerIds(() => ({
          uid: userCredential.user.uid,
          docId: docData.id,
        }));

        await signInWithEmailAndPassword(auth, values.email, values.password);

        setNotification({
          on: true,
          severity: 'success',
          message: 'Creating account...',
        });

        setTimeout(() => {
          setIsSubmitButtonLoading(false);
          navigate('/');
        }, 2000);
      } catch (error) {
        console.log('Fail to sign up customer', error);
        setIsSubmitButtonLoading(false);
        setNotification({
          on: true,
          severity: 'error',
          message: error
        })
      }
    },
  });

  const handleSignupWithGoogle = async () => {
    try {
      setIsSubmitButtonLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const isUserInDB = await checkIsUserInDB(userCredential.user.email);
      if (isUserInDB) {
        await userCredential.user.delete();
        setNotification({
          on: true,
          severity: 'error',
          message: 'Email Exists Already'
        })
        setIsSubmitButtonLoading(false);
        return;
      }
      const submittedData = {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      }
      const usersCollection = collection(db, 'users');
      const docData = await addDoc(usersCollection, submittedData);
      setCustomerIds(() => ({uid: userCredential.user.uid, docId: docData.id}));
      
      setNotification({
        on: true,
        severity: 'success',
        message: 'Registering...',
      });

      setTimeout(() => {
        setIsSubmitButtonLoading(false);
        navigate('/customer/homepage')
      }, 2000)  
    } catch (error) { 
      console.log('Fail to sign up with Google: ', error);
      setIsSubmitButtonLoading(false);
    }
  }

 
  return (  
    <Grid
      container
      columnSpacing={2}
      justifyContent="center"
      overflow="hidden"
      height="100vh"
    >
      <Notification 
        notification={notification}
        onClose={() => setNotification({...notification, on: false})}
      />
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" margin="auto" width="50%">
          <Box display="flex" justifyContent="center" my={6}>
            <LogoImg
              src="/customerLogo.png"
              className="restaurantLogo"
              alt="Restaurant Logo"
            />
          </Box>
          <Typography variant="h3" fontWeight="bold">
            Sign up
          </Typography>
          <Typography variant="subtitle1" color={grey[500]} fontWeight="bold">
            Enter your details below to create your account
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3} mt={3}>
              <TextField
                label="Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your name..."
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
                error={!!(formik.touched.name && formik.errors.name)}
              />
              <AddressInput onDataReceived={(data) => setAddress(data)} />
              <TextField
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                placeholder="Enter your email address..."
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && formik.errors.email}
                error={!!(formik.touched.email && formik.errors.email)}
              />
              <FormControl
                error={!!(formik.touched.password && formik.errors.password)}
                variant="outlined"
              >
                <InputLabel id="password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password..."
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
                />
                <FormHelperText>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
              <FormControl
                error={
                  !!(
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  )
                }
                variant="outlined"
              >
                <InputLabel id="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  label="Confirm Password"
                  labelid="confirm-password"
                  placeholder="Enter your confirm password..."
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
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
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </FormHelperText>
              </FormControl>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ color: 'white', borderRadius: 2, p: 1, fontSize: 16, fontWeight: 'bold' }}
                loading={isSubmitButtonLoading}
                loadingIndicator="Creating..."
              >
                Create your Account
              </LoadingButton>
              <Divider variant="middle">
                <Typography variant="body2">Or</Typography>
              </Divider>
              <LoadingButton
                loading={isSubmitButtonLoading}
                loadingIndicator="Signing up..." 
                onClick={handleSignupWithGoogle} 
                variant="outlined" 
                sx={{p: 1}}
              >
                <Box display="flex" gap={2} alignItems="center">
                  <img src="/icons/googleLogo.png" alt="Google Logo" />
                  <Typography fontWeight="bold">Sign up with Google</Typography>
                </Box>
              </LoadingButton>
            </Box>
          </form>
          <Typography textAlign="right" variant="subtitle1">
            Already have an account?
            <Link color="secondary" component="button" to="/customer/login">
              Click here to sign in
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <SideImg src="/restaurantLoginImg.png" alt="Login Img" />
      </Grid>
    </Grid>
  );
};

export default CustomerSignUp;
