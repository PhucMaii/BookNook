/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import TopNavbar from '../../components/TopNavbar/CustomerHeader';
import Searchbar from '../../components/CustomerSearchbar/CustomerSearchbar';
import CustomerHomepageCard from '../../components/HomepageCard/CustomerHomepageCard';
import FilterSidebar from '../../components/FilterSidebar';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Carousel from '@itseasy21/react-elastic-carousel';
import { fetchData } from '../../../utils/firebase';
import { where } from '@firebase/firestore';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { SplashScreen } from '../../../lib/utils';


export default function CustomerHomepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantList, setRestaurantList] = useState([]);
  const [popularRestaurantList, setPopularRestaurantList] = useState([]);

  const breakpoints = [
    { width: 400, itemsToShow: 1 },
    { width: 600, itemsToShow: 1.8 },
    { width: 800, itemsToShow: 2.5 },
    { width: 1200, itemsToShow: 4 },
    { width: 1500, itemsToShow: 5 },
  ];
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const restaurants = await fetchData('restaurants');
      setRestaurantList(restaurants);
      await getMostPopularRestaurants(restaurants);
      setIsLoading(false);
    } catch (error) {
      console.log('Fail to fetch restaurants: ', error);
    }
  };

  const getMostPopularRestaurants = async (restaurants) => {
    try {
      const newRestaurantList = restaurants.map(async (restaurant) => {
        const reviewData = await fetchData(
          'reviews',
          where('restaurantId', '==', restaurant.id)
        );
        const starsAvg = parseFloat(
          reviewData.reduce((acc, cV) => {
            return acc + cV.stars;
          }, 0) / reviewData.length
        );
        return { ...restaurant, numberOfReviews: reviewData.length, starsAvg };
      });

      const resolvedRestaurants = await Promise.all(newRestaurantList);

      const sortedRestaurantList = resolvedRestaurants.sort(
        (restaurantA, restaurantB) => {
          if (restaurantA.numberOfReviews > restaurantB.numberOfReviews)
            return -1;
          if (restaurantA.numberOfReviews < restaurantB.numberOfReviews)
            return 1;

          if (restaurantA.starsAvg > restaurantB.starsAvg) return 1;
          if (restaurantA.starsAvg < restaurantB.starsAvg) return -1;
        }
      );
      console.log(sortedRestaurantList.slice(0, 6))
      setPopularRestaurantList(sortedRestaurantList.slice(0, 6));
    } catch (error) {
      console.log('Fail to get most popular restaurants');
    }
  };

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    // Filltering unknown props pass into DOM
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
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
          <Box width="100%" sx={{ width: '100vw' }}>
            <Typography variant="h4" mb={2} fontWeight="bold">
              Most Popular
            </Typography>
            <div>
              <Carousel breakPoints={breakpoints}>
                {popularRestaurantList.map((restaurant, index) => (
                  <CustomerHomepageCard
                    key={index}
                    restaurant={restaurant}
                  />
                ))}
              </Carousel>
            </div>

            <Typography variant="h4" fontWeight="bold" mt={5} mb={3}>
              Available for Late Dinner
            </Typography>
            <div>
              {/* <Carousel breakPoints={breakpoints}>
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
              </Carousel> */}
            </div>
          </Box>
        </Box>
      </Box>
    </StyleSheetManager>
  );
}
