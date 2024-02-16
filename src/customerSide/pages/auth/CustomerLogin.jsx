import * as React from 'react'
import { Link } from 'react-router-dom';
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
  Button, 
  Typography, 
  Divider, 
  IconButton, 
  OutlinedInput, 
  InputAdornment,
  FormControl, 
  InputLabel
} from '@mui/material'

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      columnSpacing={2}
      justifyContent='center'
      overflow='hidden'
      maxHeight='100%'
    >
      <Grid item xs={12} md={6}>
        <Box display='flex' flexDirection='column' margin='auto' width='50%'>
          <Box display='flex' justifyContent='center' my={6}>
            <LogoImg
              src='/customerLogo.png'
              alt='Restaurant Logo' />
          </Box>
          <Typography variant='h3' fontWeight='bold'>Login</Typography>
          <Typography variant='subtitle1' color={grey[500]} fontWeight='bold'>
            Enter your credentials to access your account
          </Typography>
          <Box display='flex' flexDirection='column' gap={3} mt={3}>
            <TextField
              color='secondary'
              id='outlined-required'
              label='Email Address'
              InputProps={{
                startAdornment: (
                  <EmailOutlinedIcon />
                ),
              }}
              fullWidth
            />
            <Box display='flex' flexDirection='column' margin='auto' width='100%'>
              <FormControl variant='outlined'>
                <InputLabel color='secondary'>Password</InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  color='secondary'
                  startAdornment={
                    <KeyIcon/>
                  }
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
              <Link component='button'>
                <Typography textAlign='right' variant='subtitle2' fontWeight='bold'>
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
            <Button variant='contained' color='primary' style={{ color: 'white'}}>
              Create your Account
            </Button>
            <Divider variant='middle'>
              <Typography variant='body2'>Or</Typography>
            </Divider>
            <Button variant='outlined' color='primary'>
              <Box display='flex' gap={2} alignItems='center'>
                <img src='/icons/googleLogo.png' alt='Google Logo' />
                <Typography>Sign in with Google</Typography>
              </Box>
            </Button>
          </Box>
          <Typography textAlign='right' variant='subtitle1' fontWeight='bold'>
            Don&apos;t have an account yet?
            <Link component='button' to='/restaurant/signup'>
              Click here to sign up
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Box>
      </Box>
      <Grid item xs={12} md={6}>
        <SideImg src='/restaurantLoginImg.png' alt='Login Img' />
      </Grid>
    </Grid>
  )
}

export default CustomerLogin