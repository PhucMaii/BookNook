import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import { LogoImg, SideImg } from './styled';
import { grey } from '@mui/material/colors';

const SignUp = () => {
  return (
    <Grid
      container 
      columnSpacing={2}
      justifyContent='center'
      overflow="hidden"
      height="100vh"
    >
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
              color="secondary"
              id="outlined-required"
              label="Restaurant Name"
              InputProps={{
                startAdornment: (
                  <DriveFileRenameOutlineIcon />
                ),
              }}
              fullWidth
            />
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
            />
            <TextField
              required
              id="outlined-required"
              label="Contact Number"
              InputProps={{
                startAdornment: (
                  <SettingsCellIcon />
                ),
              }}
              fullWidth
            />
            <Button variant="contained" color='secondary'>
              Create your Account
            </Button>
            <Divider variant='middle'>
              <Typography variant='body2'>Or</Typography>
            </Divider>
            <Button variant="outlined" color='secondary'>
              <Box display="flex" gap={2} alignItems="center">
                <img src='/icons/googleLogo.png' alt="Google Logo" />
                <Typography>Sign in with Google</Typography>

              </Box>
            </Button>
          </Box>
          <Typography variant="subtitle1" align='end' fontWeight='bold'>
            Already have an account? <Link color="secondary" component='button'>Sign In</Link>
          </Typography>

        </Box>
      </Grid>
      <Grid item xs={6}>
        <SideImg src='/restaurantLoginImg.png' alt="Login Img"/>
      </Grid>
    </Grid>

  )
}

export default SignUp