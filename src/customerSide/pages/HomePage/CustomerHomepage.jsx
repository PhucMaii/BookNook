import React from 'react';
import TopNavbar from '../../components/TopNavbar/CustomerHeader';
import Searchbar from '../../components/CustomerSearchbar/CustomerSearchbar';
import CustomerHomepageCard from '../../components/HomepageCard/CustomerHomepageCard';
import FilterSidebar from '../../components/FilterSidebar';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Carousel from 'react-elastic-carousel';

export default function CustomerHomepage() {
  const breakpoints = [
    { width: 400, itemsToShow: 1 },
    { width: 600, itemsToShow: 1.8 },
    { width: 800, itemsToShow: 2.5},
    { width: 1200, itemsToShow: 4},
    { width: 1500, itemsToShow: 5}
  ];
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const popularRestaurants = [
    {
      id: 1,
      img: '/settingsDummyImg.png',
      name: 'Miku Restaurant',
      location: 'Downtown Vancouver',
      type: 'Asian',
      reviewStars: 4,
      numberOfReviews: 200,
    },
    {
      id: 2,
      img: '/settingsDummyImg.png',
      name: 'Japadog',
      location: 'Robson Downtown',
      type: 'Asian',
      reviewStars: 4,
      numberOfReviews: 200,
    },
    {
      id: 3,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
    {
      id: 4,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
    {
      id: 5,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
    {
      id: 6,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
    {
      id: 7,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
    {
      id: 8,
      img: '/settingsDummyImg.png',
      name: 'Mucho Burrito',
      location: 'Surrey',
      type: 'Chinese',
      reviewStars: 3,
      numberOfReviews: 100,
    },
  ];

  const lateDinnerRestaurants = [
    {
      id: 9,
      img: '/settingsDummyImg.png',
      name: 'Indian Favelli',
      location: 'Surrey',
      type: 'Indian',
      reviewStars: 1,
      numberOfReviews: 400,
    },
    {
      id: 10,
      img: '/settingsDummyImg.png',
      name: 'Kumare Express',
      location: 'Joyce Collingwood',
      type: 'Asian',
      reviewStars: 2,
      numberOfReviews: 600,
    },
    {
      id: 11,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
    {
      id: 12,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
    {
      id: 13,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
    {
      id: 14,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
    {
      id: 15,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
    {
      id: 16,
      img: '/settingsDummyImg.png',
      name: 'Boom',
      location: 'Pender',
      type: 'Chinese',
      reviewStars: 1,
      numberOfReviews: 550,
    },
  ];

  return (
    <div>
      <TopNavbar />
      <Typography variant="h2" fontWeight="bold" textAlign="center" my={2}>
        Find your perfect spots for every moment
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        mx={mdDown ? 1 : 4}
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={2}
      >
        <Searchbar />
        <Box width="100%" display="flex" alignItems="flex-start" gap={2}>
          <FilterSidebar />
          <Box width="100%" sx={{width: '100vw'}}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              Most Popular
            </Typography>
            <div>
              <Carousel breakPoints={breakpoints}>
                {popularRestaurants.map((restaurant, index) => (
                  <CustomerHomepageCard
                    key={index}
                    img={restaurant.img}
                    name={restaurant.name}
                    location={restaurant.location}
                    type={restaurant.type}
                    reviewStars={restaurant.reviewStars}
                    numberOfReviews={restaurant.numberOfReviews}
                  />
                ))}
              </Carousel>              
            </div>

            <Typography variant="h4" fontWeight="bold" mt={5} mb={3}>
              Available for Late Dinner
            </Typography>
            <div>
              <Carousel breakPoints={breakpoints}>
                {lateDinnerRestaurants.map((restaurant, index) => (
                    <CustomerHomepageCard
                      key={index}
                      img={restaurant.img}
                      name={restaurant.name}
                      location={restaurant.location}
                      type={restaurant.type}
                      reviewStars={restaurant.reviewStars}
                      numberOfReviews={restaurant.numberOfReviews}
                    />
                  ))}
              </Carousel>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
