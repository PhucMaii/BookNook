import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import SaveIcon from '@mui/icons-material/Save';
import { LogoImg, SideImg } from './styled';
import { grey } from '@mui/material/colors';
import { auth, db, googleProvider } from '../../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { Alert, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { async } from '@firebase/util';
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: ''
  })
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
          severity:'error',
          message:'Confirm password is unmatch.'
        })
      return;
    }
    
    if (password.length < 6) {
      setNotification({
          on: true,
          severity:'error',
          message:'Password length is too short.'
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
          severity:'success',
          message:'Registered account successfully.'
      })
      setIsLoading(false);
      navigate('/restaurant/create-info');
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to create user: ', error)
      setNotification({
          on: true,
          severity:'error',
          message:`Fail to create user: ${error.message}`
        })
    }
  }

  const handleGoogleSignup = async() => {
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
          severity:'success',
          message:'Registered account successfully.'
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
          severity:'error',
          message:`Fail to create user: ${error.message}`
        }
      )
    }
  }

  return (
    <Grid
      container
      columnSpacing={2}
      justifyContent='center'
      overflow="hidden"
      height="100vh"
    >
      <Snackbar
        open={notification.on}
        autoHideDuration={5000}
        onClose={() => setNotification({on:false})}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
      <Grid item xs={6}>
        <Box display="flex" flexDirection="column" margin="auto" width="50%">
          <Box display="flex" justifyContent="center" my={6}>
            <LogoImg
              src='/restaurantLogo.png'
              className='restaurantLogo'
              alt="Restaurant Logo"
            />
          </Box>
          <Typography variant="h3" fontWeight="bold">Sign up</Typography>
          <Typography variant="subtitle1" color={grey[500]} fontWeight="bold">
            Enter your details below to create your account
          </Typography>
          <Box display="flex" flexDirection="column" gap={3} mt={3}>
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              InputProps={{
                startAdornment: (
                  <EmailIcon />
                ),
              }}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              InputProps={{
                startAdornment: (
                  <KeyIcon />
                ),
              }}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              InputProps={{
                startAdornment: (
                  <KeyIcon />
                ),
              }}
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <LoadingButton
              loading={isLoading}
              loadingIndicator="Registering User..."
              variant="contained"
              color='secondary'
              onClick={handleSignUp}
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
          <Typography variant="subtitle1" align='right' fontWeight='bold'>
            Already have an account?
            <Link color="secondary" component='button'>
              Click here to sign in
            </Link>
          </Typography>

        </Box>
      </Grid>
      <Grid item xs={6}>
        <SideImg src='/restaurantLoginImg.png' alt="Login Img" />
      </Grid>
    </Grid>

  )
}

export default SignUp