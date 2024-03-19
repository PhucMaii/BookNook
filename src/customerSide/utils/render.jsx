import React from 'react';
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

  if (currentHourIndex === -1) {
    currentHourIndex = 0;
  }

  const renderedTimeSlots = [];
  let i = currentHourIndex;
  while (i < timeSlots.length && i <= currentHourIndex + 3) {
    renderedTimeSlots.push(timeSlots[i])
    i++;
  }
  // handle if i is larger than time slots length but still smaller than currentHourIndex
  if (i >= currentHourIndex) {
    currentHourIndex = currentHourIndex - (timeSlots.length - 1);
    i = 0;
    while (i <= currentHourIndex + 3) {
      renderedTimeSlots.push(timeSlots[i])
      i++;
    }
  }

  return renderedTimeSlots;
};
