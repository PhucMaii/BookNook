import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LogoImg } from './styled';

const ForgotPasswordHost = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const handleForgotPassword = async () => {
    if (!email) {
      setNotification({
        open: true,
        severity: 'error',
        message: 'Please enter your email address.',
      });
      return;
    }

    setNotification({
      open: true,
      severity: 'success',
      message: 'Password reset email sent. Check your inbox.',
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const [isFocused] = useState(false);

  return (
    <Grid container justifyContent='center' alignItems='center' spacing={2} style={{ minHeight: '100vh', maxWidth: '1500px' }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
      <Grid item xs={12} md={6}>
        <IconButton
          component="a"
          href="/restaurant/login"
          color="black"
          aria-label="back"
          style={{ position: 'absolute', top: 10, left: 10 }}
        >
          <ArrowBackIosIcon style={{ color: 'black' }} />
          <Typography variant="body2" style={{ fontSize: 'small', marginLeft: '5px' }}>
            Back
          </Typography>
        </IconButton>
        <Box display='flex' justifyContent='center' my={10}>
          <LogoImg
            src='/restaurantLogo.png'
            alt='Restaurant Logo' 
          />
        </Box>
        <Box display='flex' flexDirection='column' margin='auto' width='60%' mt={2} marginLeft="1.2%">
          <Typography variant='h4' fontWeight='bold' mb={0} style={{ marginLeft: '30%' }}>
            Password Reset
          </Typography>
        </Box>
        <Box margin='auto'>
          <Typography color='textSecondary'mb={0} marginLeft={16}>
            Enter your email address and we will send you
          </Typography>
          <Typography color='textSecondary' mb={2} marginLeft={16}>
            a link to reset your password.
          </Typography>

          <Box display='flex' flexDirection='column' gap={5}>
            <TextField
              id='outlined-required'
              label='Email Address'
              color='secondary'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: isFocused ? 'secondary' : 'black', width: '400px', margin: 'auto' }}
              variant="outlined"
            />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleForgotPassword}
              style={{ width: '400px', margin: 'auto' }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordHost;
