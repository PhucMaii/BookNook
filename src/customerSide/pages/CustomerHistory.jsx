import React from 'react';
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomerHistoryCard from '../components/CustomerHistoryCard/CustomerHistoryCard';


export default function CustomerHistory() {
  const customerHistory = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
 
  ];

  return (
    <Box display="justify" flexDirection="column" gap={4} width="100%" p={0} m={0}>
      <AppBar
        position="static"
        color="default"
        style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
      >
        <Toolbar>
          <img
            src="/customerLogo.png"
            alt="Company Logo"
            style={{ maxHeight: '60px', marginRight: '16px' }}
          />
          <PersonPinCircleOutlinedIcon style={{ color: 'FF6347' }} />
          <div style={{ marginLeft: 'auto' }}>
            <Avatar alt="User Avatar" src="/userAvatar.png" />
          </div>
        </Toolbar>
      </AppBar>

      <Typography variant="h3" align="center" mt={5} fontWeight="bold">
        Booking History
      </Typography>

      <Grid container spacing={4} justifyContent="auto" alignItems="auto" mt={5} style={{  marginLeft: '0px'  }}>
        <CustomerHistoryCard
          title="Total Reservations"
          data={customerHistory.length}
          icon="/Reservation.png"
          marginLeft="auto"
          marginRight="auto"
        />
        <CustomerHistoryCard
          title="Total Arrived"
          data={calculateTotalArrivals()}
          icon="/public/arrive.png"
        />
        <CustomerHistoryCard
          title="Reservations Cancelled"
          data={calculateReservationsCancelled()}
          icon="/cancel.png"
          marginLeft="auto"
          marginRight="auto"
        />
       
      </Grid>

      {customerHistory.map((reservation) => (
        <Card
          key={reservation.id}
          style={{ margin: '20px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
        >
          <CardContent style={{ marginLeft: '50px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <Grid container spacing={1} alignItems="center" justifyContent="flex-start" mt={1} >
              <Grid item xs={2}>
                <Typography variant="body1" style={{ color: 'green', fontSize: '2em', marginLeft: '80px'  }}>
                  &nbsp; •
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{`Restaurant ID: ${reservation.restaurantId || 'N/A'}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>{`Restaurant Name: ${reservation.restaurantName || 'N/A'}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{`Number of Guests: ${reservation.numGuests || 'N/A'}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>{`Booked Time: ${reservation.bookedTime || 'N/A'}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <KeyboardArrowDownIcon />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}



function calculateTotalArrivals() {
  return 10;
}

function calculateReservationsCancelled() {
  return 5;
}
