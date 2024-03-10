import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import { CardImage } from './styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { grey } from '@mui/material/colors';
import { generateTimeSlots } from '../../../utils/time';

const CustomerHomepageCard = ({ restaurant }) => {
  const renderTimeSlots = () => {
    const currentDate = new Date();
    let currentMinutes = currentDate.getMinutes();
    currentMinutes = Math.ceil(currentMinutes / 15) * 15;

    // Adjust to 0 when reaching 60
    if (currentMinutes === 60) {
      currentMinutes = `00`;
    }

    const currentHour = `${currentDate.getHours()}:${currentMinutes}`;
    const timeSlots = generateTimeSlots();
    let currentHourIndex = timeSlots.indexOf(currentHour);
    
    const renderedTimeSlots = [];
    let i = currentHourIndex;
    while (i < timeSlots.length && i <= currentHourIndex + 3) {
      renderedTimeSlots.push(
        <Button key={i} variant="contained" style={{ color: 'white' }}>
          {timeSlots[i]}
        </Button>
      );
      i++;
    }
    // handle if i is larger than time slots length but still smaller than currentHourIndex
    if (i >= currentHourIndex) {
      currentHourIndex = currentHourIndex - (timeSlots.length - 1);
      i = 0;
      while(i <= currentHourIndex + 3) {
        renderedTimeSlots.push(
          <Button key={i} variant="contained" style={{ color: 'white' }}>
            {timeSlots[i]}
          </Button>
        );
        i++;
      }
    }
    return renderedTimeSlots;
  };

  const handleShowAddress = () => {
    return restaurant.address
      ? `${restaurant.address.description.split(', ')[1]}, ${restaurant.address.description.split(', ')[2]}`
      : 'Not provided';
  };

  const renderReviewStars = () => {
    const stars = [];
    const starAvg = restaurant.starsAvg ? parseInt(restaurant.starsAvg) : 0;
    for (let i = 1; i <= starAvg; i++) {
      stars.push(<StarIcon key={i} sx={{ color: 'red' }} />);
    }

    for (let i = starAvg + 1; i <= 5; i++) {
      stars.push(<StarBorderIcon key={i} sx={{ color: 'red' }} />);
    }

    return stars;
  };

  return (
    <Card
      sx={{
        width: 325,
        pb: 2,
        maxHeight: 420,
        borderRadius: '20px',
        boxShadow: 0,
      }}
    >
      <CardContent>
        <CardImage
          src={restaurant.imgURL ? restaurant.imgURL : '/unavailable_image.png'}
          alt="Card Image"
        />
        <Typography variant="h5" fontWeight="bold" mt={1}>
          {restaurant.name}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          mt={1}
        >
          <LocationOnIcon sx={{ color: grey[600] }} />
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={{ color: grey[600] }}
          >
            {handleShowAddress()}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <RestaurantIcon sx={{ color: grey[600] }} />
          <Typography
            fontWeight="bold"
            sx={{ color: grey[600] }}
            variant="body2"
          >
            {restaurant.type}
          </Typography>
        </Box>
        <Box display="flex" mt={2} alignItems="center">
          {renderReviewStars()}
          <Typography fontWeight="bold" variant="body2" ml={1}>
            • {restaurant.numberOfReviews ? restaurant.numberOfReviews : 0}{' '}
            {restaurant.numberOfReviews === 1 ? 'Review' : 'Reviews'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {renderTimeSlots()}
        </Box>
      </CardActions>
    </Card>
  );
};

CustomerHomepageCard.propTypes = {
  restaurant: PropTypes.object,
};

export default CustomerHomepageCard;