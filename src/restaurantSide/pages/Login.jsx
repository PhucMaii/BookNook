import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

const Login = () => {
  return (
    <div className='login-main-con'>
      <Box display='grid' gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ flexGrow: 1 }} width={1920} height={1080} >
        <Grid
          container spacing={2}
          justifyContent='center'
        >
          <Grid item xs={6}>
            <img src='/restaurantLogo.png' className='restaurantLogo' alt="Restaurant Logo" style={{ paddingBottom: '150px', justifyContent: 'center', width: '250px', height: '90px', paddingLeft: '100px', paddingTop: '180px' }} />
            <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '42px' }}>Sign up</Typography>
            <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold', fontSize: '16px', paddingBottom: '20px' }}>Enter your details below to create your account</Typography>
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              InputProps={{
                startAdornment: (
                  <EmailIcon />
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              InputProps={{
                startAdornment: (
                  <KeyIcon />
                ),
              }} style={{ width: '450px', marginTop: '20px' }}
            />
            <Link component='button' style={{ marginLeft: '333px', marginTop: '100px' }}>Forgot Password?</Link>
            <Button variant="contained" color='secondary' sx={{ width: '450px', marginTop: '20px' }}>Create your Account</Button>

            <Divider style={{ paddingTop: '20px', marginLeft: '0px', marginRight: '20px', width: '450px' }} variant='middle'>OR</Divider>
            <Button variant="outlined" color='secondary' sx={{ width: '450px', marginTop: '20px' }} ><img src='/icons/googleLogo.png' alt="Google Logo" style={{ marginRight: '10px' }} /> Sign in with Google</Button>

            <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold', fontSize: '16px', paddingBottom: '20px', marginRight: '20px' }} align='end'>Already have an account? <Link component='button'>Sign In</Link></Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img src='/restaurantLoginImg' className='signupImage' alt="Login Img" style={{ width: '100%', height: '1080px', overflow: 'hidden' }} />
        </Grid>
      </Box>
    </div>
  )
}

export default Login