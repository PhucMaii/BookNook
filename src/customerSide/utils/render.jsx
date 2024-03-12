import React from 'react';
import { Button } from '@mui/material';
import { generateTimeSlots } from '../../utils/time';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const renderReviewStars = (restaurant) => {
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

export const renderTimeSlots = () => {
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
      <Button
        key={i}
        variant="contained"
        style={{ color: 'white' }}
      >
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
        <Button
          key={i}
          variant="contained"
          style={{ color: 'white' }}
        >
          {timeSlots[i]}
        </Button>
      );
      i++;
    }
  }
  return renderedTimeSlots;
};
