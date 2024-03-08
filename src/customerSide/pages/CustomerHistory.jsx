import React from 'react';
import {
  AppBar,
  Box,
  Grid,
  Typography,
  Toolbar,
  Avatar,
} from '@mui/material';
import PersonPin from '@mui/icons-material/PersonPin';
import CustomerHistoryCard from '../components/CustomerHistoryCard/CustomerHistoryCard';
import CustomerHistoryAccordion from '../components/CustomerHistoryAccordion/CustomerHistoryAccordion';

const customerHistory = [
  {
    id: 1,
    restaurantId: '000123',
    restaurantName: 'Jollibee',
    restaurantLocation: 'Strawberry Hill',
    numGuests: 2,
    bookedTime: '2024-03-01T12:30:00',
    status: 'Confirmed',
  },
  {
    id: 2,
    restaurantId: '000456',
    restaurantName: 'McDonalds',
    restaurantLocation: 'Newton Exchange',
    numGuests: 4,
    bookedTime: '2024-03-02T14:30:00',
    status: 'Cancelled',
  },
  {
    id: 3,
    restaurantId: '000789',
    restaurantName: 'All About Pho',
    restaurantLocation: 'King George',
    numGuests: 3,
    bookedTime: '2024-03-02T18:45:00',
    status: 'Confirmed',
  },
  
];

const calculateTotalArrivals = () => 50;

const calculateReservationsCancelled = () => 50;

const getInitials = (fullName) => {
  const names = fullName.split(' ');
  return names.map((name) => name[0]).join('');
};

const CustomerHistory = () => {
  const loggedInUserName = 'Michael Jordan';
  return (
    <Box display="flex" flexDirection="column" gap={4} width="100%" p={0} m={0} sx={{ marginRight: '20px', overflowX: 'hidden' }}>
      <AppBar position="static" color="default" sx={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
        <Toolbar>
          <img src="/customerLogo.png" alt="Company Logo" style={{ maxHeight: '60px', marginRight: '16px' }} />
          <PersonPin sx={{ color: 'Red' }} />
          <div style={{ marginLeft: 'auto' }}>
            <Avatar alt={loggedInUserName} src="/userAvatar.png">
              {getInitials(loggedInUserName)}
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>

      <Typography variant="h3" align="center" mt={5} fontWeight="bold">
        Booking History
      </Typography>

      <Grid container spacing={4} justifyContent="auto" alignItems="auto" mt={5} sx={{ marginLeft: '0px' }}>
        <CustomerHistoryCard title="Total Reservations" data={customerHistory.length} icon="/Reservation.png" marginLeft="auto" marginRight="auto" />
        <CustomerHistoryCard title="Total Arrived" data={calculateTotalArrivals()} icon="/public/arrive.png" />
        <CustomerHistoryCard title="Reservations Cancelled" data={calculateReservationsCancelled()} icon="/cancel.png" marginLeft="auto" marginRight="auto" />
      </Grid>
      
      {customerHistory.map((reservation) => (
        <CustomerHistoryAccordion key={reservation.id} reservation={reservation} />
      ))}
    </Box>
  );
};

export default CustomerHistory;
