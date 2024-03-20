import React, { useState } from 'react';
import { SideImg } from './styled';
import {
  Grid,
} from '@mui/material';
import UnprotectedRoute from '../../context/UnprotectedRoute';
import Notification from '../../../restaurantSide/components/Notification';
import LoginSection from './LoginSection';

const CustomerLogin = () => {
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });

  return (
    <UnprotectedRoute>
      <Grid
        container
        columnSpacing={2}
        justifyContent="center"
        overflow="hidden"
        maxHeight="100%"
      >
        <Notification 
          notification={notification}
          onClose={() => setNotification({...notification, on: false})}
        />
        <Grid item xs={12} md={6}>
          <LoginSection setNotification={setNotification} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SideImg src="/restaurantLoginImg.png" alt="Login Img" />
        </Grid>
      </Grid>
    </UnprotectedRoute>
  );
};

export default CustomerLogin;
