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
import { LogoImg, SideImg } from './styled'
import { grey } from '@mui/material/colors';

const Login = () => {
  return (
    <Grid
      container
      columnSpacing={2}
      justifyContent='center'
      overflow='hidden'
      maxHeight='100%'
    >
      <Grid item xs={6}>
        <Box display='flex' flexDirection='column' margin='auto' width='50%'>
          <Box display='flex' justifyContent='center' my={6}>
            <LogoImg
              src='/restaurantLogo.png'
              alt="Restaurant Logo" />
          </Box>
          <Typography variant="h3" fontWeight="bold">Login</Typography>
          <Typography variant="subtitle1" color={grey[500]} fontWeight="bold">
            Enter your credentials to access your account
          </Typography>
          <Box display='flex' flexDirection='column' gap={3} mt={3}>
            <TextField
              required
              color="secondary"
              id="outlined-required"
              label="Email Address"
              InputProps={{
                startAdornment: (
                  <EmailIcon />
                ),
              }}
              fullWidth
            />
            <Box>
              <TextField
                required
                color="secondary"
                id="outlined-required"
                label="Password"
                InputProps={{
                  startAdornment: (
                    <KeyIcon />
                  ),
                }}
                fullWidth
              />
              <Link component='button'>
                <Typography variant='subtitle2' align='end' fontWeight='bold'>
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
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
            Don&apos;t have an account yet?
            <Link component='button'>
              Click here to sign up
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Box>
      </Box>
      <Grid item xs={6}>
        <SideImg src='/restaurantLoginImg.png' alt="Login Img" />
      </Grid>
    </Grid>
  )
}

export default Login