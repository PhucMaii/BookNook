import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { CardImage } from './HomepageCard/styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { renderReviewStars, renderTimeSlots } from '../utils/render';
import { grey } from '@mui/material/colors';

export default function SearchRestaurantCard() {
    const restaurant = {
        numberOfReviews: 4,
        starsAvg: 3
    }
  return (
    <Grid container width="100%" columnSpacing={4}>
      <Grid item xs={12} md={3}>
        <CardImage src="/settingsDummyImg.png" />
      </Grid>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography fontWeight="bold" variant="h6">Miku Restaurant</Typography>
          <Box display="flex" gap={1}>
            <LocationOnIcon sx={{color: grey[600]}} />
            <Typography fontWeight="bold" variant="subtitle1" sx={{color: grey[600]}}>
                Vancouver
            </Typography>
            <Divider flexItem orientation="vertical" />
            <RestaurantIcon sx={{color: grey[600]}} />
            <Typography fontWeight="bold" variant="subtitle1" sx={{color: grey[600]}}>
                Asian
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            {renderReviewStars(restaurant)}
            <Typography fontWeight="bold" variant="body2" ml={1}>
              • {restaurant.numberOfReviews ? restaurant.numberOfReviews : 0}{' '}
              {restaurant.numberOfReviews === 1 ? 'Review' : 'Reviews'}
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {renderTimeSlots()}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
