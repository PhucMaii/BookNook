import React, { useContext } from 'react';
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
import { grey } from '@mui/material/colors';
<<<<<<< HEAD
import { generateTimeSlots } from '../../../utils/time';
import { renderReviewStars } from '../../utils/render';
import { useNavigate } from 'react-router-dom';

const CustomerHomepageCard = ({ restaurant }) => {

  const navigate = useNavigate()

  const renderTimeSlots = () => {
    const currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    currentMinutes = Math.ceil(currentMinutes / 15) * 15;

    // Adjust to 0 when reaching 60
    if (currentMinutes === 60) {
      currentMinutes = `00`;
      currentHour += 1;
    }

    const currentTime = `${currentHour}:${currentMinutes}`;
    const timeSlots = generateTimeSlots();
    let currentHourIndex = timeSlots.indexOf(currentTime);

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
      while (i <= currentHourIndex + 3) {
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
=======
import { renderReviewStars, renderTimeSlots } from '../../utils/render';
import { AuthContext } from '../../context/AuthContext';
import { fetchDoc } from '../../../utils/firebase';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { BookingDataContext } from '../../context/BookingDataContext';

export const handleReservationBooking = async (
  timeSlot,
  restaurant,
  customerIds,
  setBookingData,
  navigate,
  date,
  capacity = '2 people'
) => {
  try {
    const bookingData = { timeSlot, ...restaurant, date, capacity };

    if (Object.keys(customerIds).length > 0 && customerIds.docId !== null) {
      const user = await fetchDoc('users', customerIds.docId);
      const userData = user.docData;
      bookingData.user = userData;
    }

    setBookingData(bookingData);
    navigate('/customer/booking-confirmation');
  } catch (error) {
    console.log('Fail to book a reservation: ', error);
  }
};

const CustomerHomepageCard = ({ restaurant }) => {
  const { customerIds } = useContext(AuthContext);
  const { setBookingData } = useContext(BookingDataContext);

  const navigate = useNavigate();
>>>>>>> 7853b9857910c48e03f178f6536c1c43fa2ef738

  const handleShowAddress = () => {
    return restaurant.address
      ? `${restaurant.address.description.split(', ')[1]}, ${restaurant.address.description.split(', ')[2]}`
      : 'Not provided';
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
        <div onClick={() => navigate(`customer/restaurantDetails/${restaurant.id}`)}>
          <Typography variant="h5" fontWeight="bold" mt={1}>
            {restaurant.name}
          </Typography>
        </div>
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
          {renderReviewStars(restaurant)}
          <Typography fontWeight="bold" variant="body2" ml={1}>
            • {restaurant.numberOfReviews ? restaurant.numberOfReviews : 0}{' '}
            {restaurant.numberOfReviews === 1 ? 'Review' : 'Reviews'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {renderTimeSlots().map((timeSlot, index) => {
            return (
              <Button
                key={index}
                onClick={() =>
                  {const date = dayjs();
                    handleReservationBooking(
                    timeSlot,
                    restaurant,
                    customerIds,
                    setBookingData,
                    navigate,
                    date,
                    '2 people'
                  )}
                }
                variant="contained"
                style={{ color: 'white' }}
              >
                {timeSlot}
              </Button>
            );
          })}
        </Box>
      </CardActions>
    </Card>
  );
};

CustomerHomepageCard.propTypes = {
  restaurant: PropTypes.object,
};

export default CustomerHomepageCard;