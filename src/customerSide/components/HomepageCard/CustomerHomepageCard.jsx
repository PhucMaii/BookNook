import React, { useEffect } from 'react';
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
import { ratings } from '../../utils/constants';
import { grey } from '@mui/material/colors';
import { fetchData } from '../../../utils/firebase';
import { where } from 'firebase/firestore';

const CustomerHomepageCard = ({ restaurant }) => {
    useEffect(() => {
        fetchTimeSlots();
    }, [])

    const handleShowAddress = () => {
        return restaurant.address ? 
        `${restaurant.address.description.split(', ')[1]}, ${restaurant.address.description.split(', ')[2]}` : 
        'Not provided'
    }

    const fetchTimeSlots = async () => {
        try {
            const timeSlots = await fetchData('timeSlots', where('restaurantId', '==', restaurant.id));
            console.log(timeSlots, 'timeSlots');
        } catch (error) {
            console.log('Fail to fetch restaurants time slots: ', error);
        }
    }

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
        <CardImage src="/settingsDummyImg.png" alt="Card Image" />
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
           { handleShowAddress() }
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
          {ratings.map((rating, index) => (
            <StarIcon key={index} sx={{ color: 'red' }} />
          ))}
          <Typography fontWeight="bold" variant="body2" ml={1}>
            • {restaurant.numberOfReviews}{' '}
            {restaurant.numberOfReviews === 1 ? 'Review' : 'Reviews'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {[1, 2, 3, 4].map((time, index) => (
            <Button key={index} variant="contained" style={{ color: 'white' }}>
              {time}:00pm
            </Button>
          ))}
        </Box>
      </CardActions>
    </Card>
  );
};

CustomerHomepageCard.propTypes = {
  restaurant: PropTypes.object,
};

export default CustomerHomepageCard;