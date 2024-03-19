import React, { useState } from 'react';
import { SideImg } from './styled';
import {
  Grid,
} from '@mui/material';
import Notification from '../../../restaurantSide/components/Notification';
import SignupSection from './SignupSection';

const CustomerSignUp = () => {
  const [notification, setNotification] = useState({
    on: false,
    severity: '',
    message: '',
  });
 
  return (  
    <Grid
      container
      columnSpacing={2}
      justifyContent="center"
      height="100vh"
    >
      <Notification 
        notification={notification}
        onClose={() => setNotification({...notification, on: false})}
      />
      <Grid item xs={12} md={6}>
        <SignupSection setNotification={setNotification}/>
      </Grid>
      <Grid item xs={6}>
        <SideImg src="/restaurantLoginImg.png" alt="Login Img" />
      </Grid>
    </Grid>
  );
};

export default CustomerSignUp;
