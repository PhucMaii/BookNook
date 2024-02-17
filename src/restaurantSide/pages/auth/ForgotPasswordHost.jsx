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
import { grey } from '@mui/material/colors';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import UnprotectedRoute from '../../context/UnprotectedRoute';

const ForgotPasswordHost = () => {
  const [email, setEmail] = useState('');
  const [setIsFocused] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const auth = getAuth();

  const handleForgotPassword = async () => {
    if (!email) {
      setNotification({
        open: true,
        severity: 'error',
        message: 'Please enter your email address.',
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); 
      setNotification({
        open: true,
        severity: 'success',
        message: 'Password reset email sent. Check your inbox.',
      });
    } catch (error) {
      console.error(error);

    setNotification({
      open: true,
      severity: 'error',
      message: 'Error sending password reset email.',
    });
  }
};

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <UnprotectedRoute>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Snackbar
            open={notification.open}
            autoHideDuration={5000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification.severity}
            >
              {notification.message}
            </Alert>
          </Snackbar>

          <Grid container justifyContent="center">
            <Grid item xs={14} md={6}>
              <IconButton
                component="a"
                href="/restaurant/login"
                color="black"
                aria-label="back"
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  borderRadius: '10px',
                }}
              >
                <ArrowBackIosIcon style={{ color: 'black' }} />
                <Typography
                  variant="body2"
                  style={{
                    fontSize: 'small',
                    margin: '5px',
                  }}
                >
                  Back
                </Typography>
              </IconButton>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                my={1}
                mt={-10}
              >
                <LogoImg src="/restaurantLogo.png" alt="Restaurant Logo" />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="left"
                  mt={10}
                >
                  <Typography variant="h4" fontWeight="bold" mb={0}>
                    Password Reset
                  </Typography>
                  <Typography
                    variant="h10"
                    fontWeight="light"
                    color={grey[500]}
                  >
                    Enter your email address and we will send you a link to
                    reset your password.
                  </Typography>
                  <Box display="flex" flexDirection="column" mt={3}></Box>

                  <TextField
                    id="outlined-required"
                    label="Email Address"
                    color="secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{ width: '100%', maxWidth: '400px' }}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleForgotPassword}
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      marginTop: '40px',
                    }}
                  >
                    Send Reset Link
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </UnprotectedRoute>
  );
};

export default ForgotPasswordHost;
