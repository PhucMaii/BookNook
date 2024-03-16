import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import CustomerHistoryCard from '../components/CustomerHistoryCard/CustomerHistoryCard';
import CustomerHistoryAccordion from '../components/CustomerHistoryAccordion/CustomerHistoryAccordion';
import CustomerHeader from '../components/TopNavbar/CustomerHeader';

const customerHistory = [
  {
    id: 1,
    restaurantId: '000123',
    restaurantName: 'Miku Restaurant',
    restaurantLocation: 'Vancouver',
    numGuests: 2,
    bookedTime: '21 Jan 2024, 12:21 PM',
    status: 'Confirmed',
  },
  {
    id: 2,
    restaurantId: '000456',
    restaurantName: 'McDonalds',
    restaurantLocation: 'Newton Exchange',
    numGuests: 4,
    bookedTime: '1 Mar 2024, 1:45 PM',
    status: 'Cancelled',
  },
  {
    id: 3,
    restaurantId: '000789',
    restaurantName: 'All About Pho',
    restaurantLocation: 'King George',
    numGuests: 3,
    bookedTime: '13 Dec 2023, 9:00AM',
    status: 'Confirmed',
  },
];

const calculateTotalArrivals = () => 50;

const calculateReservationsCancelled = () => 50;

const CustomerHistory = () => {

  return (

    <Box display="flex" flexDirection="column" gap={4} width="100%" sx={{ backgroundColor: '#f0f0f0', overflowX: 'hidden' }}>
      <CustomerHeader />
      <Typography
        variant="h4"
        align="center"
        mt={2}
        fontWeight="bold"
      >
        Booking History
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Grid item xs={12} md={4}>
          <CustomerHistoryCard title="Total Reservations" data={customerHistory.length} icon="/Reservation.png" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomerHistoryCard title="Total Arrived" data={calculateTotalArrivals()} icon="/public/arrive.png" />
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomerHistoryCard title="Reservations Cancelled" data={calculateReservationsCancelled()} icon="/cancel.png" />
        </Grid>
      </Grid>

      {customerHistory.map((reservation) => (
        <CustomerHistoryAccordion key={reservation.id} reservation={reservation} />
      ))}
    </Box>
  );
};

export default CustomerHistory;
