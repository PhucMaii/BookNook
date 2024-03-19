import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CardImage } from './HomepageCard/styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { renderReviewStars, renderTimeSlots } from '../utils/render';
import { grey } from '@mui/material/colors';
import { handleReservationBooking } from './HomepageCard/CustomerHomepageCard';
import { BookingDataContext } from '../context/BookingDataContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SearchRestaurantCard({restaurant}) {
  const { customerIds } = useContext(AuthContext);
  const { setBookingData } = useContext(BookingDataContext);
  const location = useLocation();
  const [date, setDate] = useState();
  const [capacity, setCapacity] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.forEach((value, key) => {
      if (key === 'date') {
        setDate(value);
      }

      if (key === 'numberOfGuests') {
        setCapacity(value);
      } else {
        setCapacity('2 people')
      }
    })
  }, [location.search])

  return (
    <Grid container width="100%" columnSpacing={4}>
      <Grid item xs={12} md={3}>
        <CardImage
          src={restaurant.imgURL ? restaurant.imgURL : '/unavailable_image.png'}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography fontWeight="bold" variant="h6">
            {restaurant.name}
          </Typography>
          <Box display="flex" gap={1}>
            <LocationOnIcon sx={{ color: grey[600] }} />
            <Typography
              fontWeight="bold"
              variant="subtitle1"
              sx={{ color: grey[600] }}
            >
              {restaurant.address.description}
            </Typography>
            <Divider flexItem orientation="vertical" />
            <RestaurantIcon sx={{ color: grey[600] }} />
            <Typography
              fontWeight="bold"
              variant="subtitle1"
              sx={{ color: grey[600] }}
            >
              {restaurant.type}
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
            {renderTimeSlots().map((timeSlot, index) => {
              return (
                <Button
                  key={index}
                  onClick={() =>
                    handleReservationBooking(
                      timeSlot,
                      restaurant,
                      customerIds,
                      setBookingData,
                      navigate,
                      date,
                      capacity
                    )
                  }
                  variant="contained"
                  style={{ color: 'white' }}
                >
                  {timeSlot}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

SearchRestaurantCard.propTypes = {
  restaurant: PropTypes.object
}