import React from 'react';
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export default function CustomerHistory() {
  
  const customerHistory = [
    { id: 1},
    { id: 2},
    { id: 3},
   
  ];

  return (
    <Box display="flex" flexDirection="column" gap={4} width="100%">
      {}
      <AppBar position="static" color="default" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          
          </IconButton>
          <img
            src="/customerLogo.png"
            alt="Company Logo"
            style={{ maxHeight: '60px', marginRight: '16px' }}
          />
          <PersonPinCircleOutlinedIcon style={{ color: 'FF6347' }}/>
        

          <div style={{ marginLeft: 'auto' }}>
            <Avatar alt="User Avatar" src="/userAvatar.png"  
            />
          </div>
          
        </Toolbar>
      </AppBar>

      {/* Title */}
      <Typography variant="h5" align="center" mt={1} fontWeight="bold">
        Booking History
      </Typography>

      {/* Data Cards */}
      <Grid container spacing={5} justifyContent="flex-start" mt={1} style={{ }}>
        {renderDataCard('Total Reservations', customerHistory.length, '/Reservation.png')}
        {renderDataCard('Total Arrivals', calculateTotalArrivals(), '/public/arrive.png')}
        {renderDataCard('Reservations Cancelled', calculateReservationsCancelled(), '/cancel.png')}
      </Grid>


      {/* History Rows */}
        {customerHistory.map((reservation) => (
            <Card key={reservation.id} style={{ margin: '20px' }}>
            <CardContent>
            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item xs={1} style={{ marginLeft: '15px' }}>
                <Typography variant="body1" style={{ color: 'green', marginLeft: '50px' }}>
                &nbsp;  •
                </Typography>
            </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1">{`Restaurant ID: ${reservation.restaurantId || 'N/A'}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1">{`Restaurant Name: ${reservation.restaurantName || 'N/A'}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1">{`Number of Guests: ${reservation.numGuests || 'N/A'}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1">{`Booked Time: ${reservation.bookedTime || 'N/A'}`}</Typography>
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

    function renderDataCard(title, data, imagePath) {
        return (
        <Grid item xs={12} sm={6} md={4} key={title}>
            <Card>
            <CardContent>
                <Box display="flex" alignItems="flex-start" justifyContent="center">
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'pink', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={imagePath} alt={title} style={{ width: '70%', height: '70%', objectFit: 'cover' }} />
                </div>
              <Box ml={2}>
                <Typography variant="h3" mt={2} fontWeight="bold" color="textSecondary">
                  {data}
                </Typography>
                <Typography variant="h8" color="textSecondary">
                  {title}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  
  
function calculateTotalArrivals() {
  return 10; 
}

function calculateReservationsCancelled() {
  return 5; 
}
