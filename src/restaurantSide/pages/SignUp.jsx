import React from 'react'
import LoginImg from '../images/restaurantLoginImg.png'
import RestaurantLogo from '../images/RestaurantLogo.png'
import rName from '../icons/restaurantName.png'
import contactNum from '../icons/contactNum.png'
import emailAdd from '../icons/email.png'
import passwordIcon from '../icons/password.png'
// import '../CSS/Signup.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import Divider from '@mui/material/Divider';
import GoogleLogo from '../icons/googleLogo.png';
import { Link } from 'react-router-dom';


const theme = createTheme({
  palette: {
    blue: {
      main: '#3498DB',
      contrastText: '#242105'
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});


const SignUp = () => {
  return (
    <div className='signup-main-con'>
      <Box display='grid' gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ flexGrow: 1 }} width={1920} height={1080} >
        <Grid
          container spacing={2}
          // direction="row"
          // alignItems="center"
          justifyContent='center'
        // alignContent='center'
        height={1080}
        >
          <Grid item xs={6}>
            {/* Restaurant Logo */}
            <img src={RestaurantLogo} className='restaurantLogo' alt="Restaurant Logo" style={{ paddingBottom: '80px', justifyContent: 'center', width: '250px', height: '90px', paddingLeft: '100px', paddingTop: '140px'}} />
            {/* Top Text */}
            <ThemeProvider theme={theme}>
              <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '42px' }}>Sign up</Typography>
              <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold', fontSize: '16px', paddingBottom: '20px' }}>Enter your details below to create your account</Typography>
            </ThemeProvider>
            {/* Restaurant Name */}
            <TextField
              required
              id="outlined-required"
              label="Restaurant Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={rName} alt="Restaurant Name Icon" />
                  </InputAdornment>
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            {/* Email Address */}
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={emailAdd} alt="Email Address Icon" />
                  </InputAdornment>
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            {/* Password */}
            <TextField
              required
              id="outlined-required"
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={passwordIcon} alt="Password Icon" />
                  </InputAdornment>
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            {/* Confirm Password */}
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={passwordIcon} alt="Password Icon" />
                  </InputAdornment>
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            {/* Contact Number */}
            <TextField
              required
              id="outlined-required"
              label="Contact Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={contactNum} alt="Confirm Password Icon" />
                  </InputAdornment>
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            {/* Create Account Btn */}
            <ThemeProvider theme={theme}>
              <Button variant="contained" sx={{ width: '450px', marginTop: '50px' }}>Create your Account</Button>
            </ThemeProvider>
            {/* The divider and the word OR */}
            <Divider style={{ paddingTop: '20px', marginLeft: '0px', marginRight: '20px', width: '450px'}} variant='middle'>OR</Divider>
            {/* Sign in with Google Button */}
            <ThemeProvider theme={theme}>
              <Button variant="outlined" sx={{ width: '450px', marginTop: '20px' }} ><img src={GoogleLogo} alt="Google Logo" style={{ marginRight: '10px'}} /> Sign in with Google</Button>
            </ThemeProvider>
            {/* Bottom Text */}
            <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold', fontSize: '16px', paddingBottom: '20px', marginRight: '21px'}}align='end'>Already have an account? <Link component='button'>Sign In</Link></Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img src={LoginImg} className='signupImage' alt="Login Img" style={{ width: '100%', height: '1080px', overflow: 'hidden' }} />
        </Grid>
      </Box>

    </div>

  )
}

export default SignUp