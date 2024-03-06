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
import { ratings } from '../../utils/constants';
import { grey } from '@mui/material/colors';

const CustomerHomepageCard = ({ name, location, type, reviewStars }) => {
  return (
    <Card
      sx={{
        width: 325,
        pb: 2,
        maxHeight: 400,
        borderRadius: '20px',
        boxShadow: 0,
      }}
    >
      <CardContent>
        <CardImage src="/settingsDummyImg.png" alt="Card Image" />
        <Typography variant="h5" fontWeight="bold" mt={1}>
          {name}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          mt={1}
        >
          <LocationOnIcon sx={{color: grey[600]}}/>
          <Typography 
            fontWeight="bold" 
            variant="body2"
            sx={{color: grey[600]}} 
        >
            {location}
        </Typography>
          <Divider orientation="vertical" flexItem />
          <RestaurantIcon sx={{color: grey[600]}} />
          <Typography fontWeight="bold" sx={{color: grey[600]}} variant="body2">{type}</Typography>
        </Box>
        <Box
          display="flex"
          mt={2}
          alignItems="center"
        >
          {ratings.map((rating, index) => (
            <StarIcon key={index} sx={{ color: 'red' }} />
          ))}
          <Typography fontWeight="bold" variant="body2" ml={1}>
            • {reviewStars} {reviewStars === 1 ? 'Review' : 'Reviews'}
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
    name: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    reviewStars: PropTypes.number,
    numberOfReviews: PropTypes.number
}

export default CustomerHomepageCard;