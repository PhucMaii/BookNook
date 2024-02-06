import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment,
  Alert,
  Snackbar,
  OutlinedInput,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import { LogoImg, SideImg } from './styled';
import { grey } from '@mui/material/colors';
import { auth, db } from '../../../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { LoadingButton } from '@mui/lab';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RestaurantInformation from './RestaurantInfo';

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkFieldsValid = () => {
    if (!email || !password || !confirmPassword) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Please fill out all the fields.',
      });
      return false;
    }

    if (password !== confirmPassword) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Confirm password is unmatch.',
      });
      return false;
    }

    if (password.length < 6) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Password length is too short.',
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSignUp = async () => {
    const isAllFieldsValid = checkFieldsValid();
    if (!isAllFieldsValid) {
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const submittedData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };

      const restaurantCollection = collection(db, 'restaurants');
      await addDoc(restaurantCollection, submittedData);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setNotification({
        on: true,
        severity: 'success',
        message: 'Creating account...',
      });

      setTimeout(() => {
        setIsLoading(false);
        handleNext();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to create user: ', error);
      setNotification({
        on: true,
        severity: 'error',
        message: `Fail to create user: ${error.message}`,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signupForm = () => (
    <Grid
      container
      columnSpacing={2}
      justifyContent='center'
      height='100vh'
    >
      <Snackbar
        open={notification.on}
        autoHideDuration={5000}
        onClose={() => setNotification({ on: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
      <Grid item xs={12} md={6}>
        <Box display='flex' flexDirection='column' margin='auto' width='50%'>
          <Box display='flex' justifyContent='center' my={6}>
            <LogoImg
              src='/restaurantLogo.png'
              className='restaurantLogo'
              alt='Restaurant Logo'
            />
          </Box>
          <Typography variant='h3' fontWeight='bold'>
            Sign up
          </Typography>
          <Typography variant='subtitle1' color={grey[500]} fontWeight='bold'>
            Enter your details below to create your account
          </Typography>
          <Box display='flex' flexDirection='column' gap={3} mt={3}>
            <TextField
              color='secondary'
              id='outlined-required'
              label='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <FormControl variant='outlined'>
              <InputLabel color='secondary'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                color='secondary'
                startAdornment={
                  <InputAdornment position='start'>
                    <KeyIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel color='secondary'>Confirm Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showConfirmPassword ? 'text' : 'password'}
                color='secondary'
                startAdornment={
                  <InputAdornment position='start'>
                    <KeyIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <LoadingButton
              onClick={handleSignUp}
              loading={isLoading}
              loadingIndicator='Registering...'
              variant='contained'
              color='secondary'
            >
              Create your Account
            </LoadingButton>
            <Divider variant='middle'>
              <Typography variant='body2'>Or</Typography>
            </Divider>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleNext}
            >
              <Box display='flex' gap={2} alignItems='center'>
                <img src='/icons/googleLogo.png' alt='Google Logo' />
                <Typography>Continue with Google</Typography>
              </Box>
            </Button>
          </Box>
          <Typography textAlign='right' variant='subtitle2'>
            Already have an account?
            <Link color='secondary' component='button' to='/restaurant/login'>
              Click here to sign in
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <SideImg src='/restaurantLoginImg.png' alt='Login Img' />
      </Grid>
    </Grid>
  );

  return (
    <>
      {activeStep === 0 && signupForm()}
      {activeStep === 1 && <RestaurantInformation />}
    </>
  );
};

export default SignUp;
