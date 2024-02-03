import React, { useContext, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import { LogoImg, SideImg } from './styled';
import { grey } from '@mui/material/colors';
import { auth, db, googleProvider } from '../../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { LoadingButton } from '@mui/lab';
import { AuthContext } from '../../context/AuthContext';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: ''
  })
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUid } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Please fill out all the field.'
      })
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Confirm password is unmatch.'
      })
      return;
    }

    if (password.length < 6) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Password length is too short.'
      })
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const submittedData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid
      }

      const restaurantCollection = collection(db, 'restaurants');
      await addDoc(restaurantCollection, submittedData);

      const userSignin = await signInWithEmailAndPassword(auth, email, password);
      setUid(userSignin.user.uid);

      setNotification({
        on: true,
        severity: 'success',
        message: 'Registered account successfully.'
      })
      setIsLoading(false);
      navigate('/restaurant/create-info');
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to create user: ', error)
      setNotification({
        on: true,
        severity: 'error',
        message: `Fail to create user: ${error.message}`
      })
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const submittedData = {
        email: userCredential.user.email
      }
      const restaurantCollection = collection(db, 'restaurants');
      await addDoc(restaurantCollection, submittedData);
      setNotification(
        {
          on: true,
          severity: 'success',
          message: 'Registered account successfully.'
        }
      )
      setIsLoading(false);
      navigate('/restaurant/create-info')
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to create user: ', error)
      setNotification(
        {
          on: true,
          severity: 'error',
          message: `Fail to create user: ${error.message}`
        }
      )
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      columnSpacing={2}
      justifyContent='center'
      overflow='hidden'
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
          <Typography variant='h3' fontWeight='bold'>Sign up</Typography>
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
                  <EmailOutlinedIcon />
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
                  <KeyIcon />
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
                  <KeyIcon />
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
              loadingIndicator="Registering account..."
              variant='contained'
              color='secondary'
            >
              Create your Account
            </LoadingButton>
            <Divider variant='middle'>
              <Typography variant='body2'>Or</Typography>
            </Divider>
            <Button variant="outlined" color='secondary' onClick={handleGoogleSignup}>
              <Box display="flex" gap={2} alignItems="center">
                <img src='/icons/googleLogo.png' alt="Google Logo" />
                <Typography>Sign in with Google</Typography>
              </Box>
            </Button>
          </Box>
          <Typography textAlign='right' variant='subtitle1' fontWeight='bold'>
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

  )
}

export default SignUp