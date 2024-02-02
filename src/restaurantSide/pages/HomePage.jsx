import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import HomepageCard from '../components/HomepageCard/HomepageCard';

export default function HomePage() {
  const cardContent = [
    {
      img: '/Reservation.png',
      title: 'Total Reservations',
      data: 75,
    },
    {
      img: '/Arrive.png',
      title: 'Total Arrived',
      data: 50,
    },
    {
      img: '/Review.png',
      title: 'Avg Review Stars',
      data: 4.2,
    },
  ];

  return (
    <Sidebar>
      <Box display='flex' flexDirection='column' gap={4} width='100%' mx={8}>
        <Grid
          container
          spacing={3}
          marginTop={0.5}
        >
          {cardContent.map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <HomepageCard
                data={card.data}
                title={card.title}
                icon={card.img}
              />
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ fontFamily: 'Roboto', fontSize: 34, marginTop: 2 }}>
          Today Reservations
        </Typography>
      </Box>
    </Sidebar>
  );
}
