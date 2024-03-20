import React, { Fragment, useEffect, useState } from 'react';
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import FilterSidebar from '../components/FilterSidebar';
import SearchRestaurantCard from '../components/SearchRestaurantCard';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../../utils/firebase';
import { where } from 'firebase/firestore';
import { checkIsRestaurantOpenCurrently, checkIsRestaurantOpenToday, checkRestaurantHasTable } from '../utils/logic';
import { daysOfWeek } from '../../utils/constants';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { grey } from '@mui/material/colors';
import { calculateDistance } from '../../utils/location';
import { SplashScreen } from '../../lib/utils';

export default function SearchResultPage() {
  const [filterParams, setFilterParams] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantList, setRestaurantList] = useState([]);
  const location = useLocation();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    const condition = getSearchQuery();
    getSearchResultData(condition);
  }, [location.search]);

  const getSearchQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const condition = {};
  
    // Loop through each parameter and use its value
    searchParams.forEach((value, key) => {
      if (key === 'address') {
        condition.address = JSON.parse(value);
        return;
      }

      if (key === 'date') {
        const date = value;
        const [month, day, year] = date.split('/');

        // JavaScript Date uses zero-based months, so we need to subtract 1 from the month
        const jsDate = new Date(
          `${year}-${month.padStart(month - 1, '0')}-${day.padStart(day, '0')}`
        );
        condition.date = jsDate;
        return;
      }

      if (key === 'numberOfGuests') {
        const numberOfGuests = parseInt(value.split(' ')[0]);
        condition[key] = numberOfGuests;
        return;
      }

      if (key === 'time') {
        condition.time = parseInt(value.split(':').join(''));
        return;
      }

      if (key === 'selectedTypes') {
        condition.types = value.split(',');
        return;
      }

      if (key === 'selectedSeatingOptions') {
        condition.seatingOptions = value.split(',');
        return;
      }

      if (key === 'selectedPrice') {
        condition.avgPrice = value.split(',');
        return;
      }
      condition[key] = value;
    });

    return condition;
  }

  const getSearchResultData = async (condition) => {
    try {
      let restaurants = await fetchData('restaurants');

      if (condition.address) {
        const newRestaurantList = restaurants.map((restaurant) => {
          if (!restaurant.address) {
            return null;
          }
          const distance = calculateDistance(
            condition.address.lat,
            condition.address.lng,
            restaurant.address.lat,
            restaurant.address.lng
          );
          return { ...restaurant, distance };
        });

        const filteredRestaurants = newRestaurantList.filter(
          (restaurant) => restaurant !== null && restaurant.distance < 100
        );
        restaurants = filteredRestaurants;
      }

      const newRestaurantList = await Promise.all(restaurants.map(async (restaurant) => {
        if (condition.date) {
          const isRestaurantOpenToday = await checkIsRestaurantOpenToday(restaurant, daysOfWeek[condition.date.getDay()]);
          if (!isRestaurantOpenToday) {
            return null;
          }
        }

        if (condition.time) {
          const isRestaurantOpenCurrently = await checkIsRestaurantOpenCurrently(restaurant, condition.time);
          if (!isRestaurantOpenCurrently) {
            return null;  
          }
          const isRestaurantAvailable = await checkRestaurantHasTable(restaurant);
          if (!isRestaurantAvailable) {
            return null;
          }
        }

        if (condition.numberOfGuests) {
          const availableTables = await checkRestaurantHasTable(restaurant);
          if (!availableTables) {
            return null;
          }
          if (Array.isArray(availableTables)) {
            const isTableAvailable = availableTables.some((table) => table.capacity === condition.numberOfGuests);
            if (!isTableAvailable) {
              return null;
            }
          }
        }

        if (condition.types) {
          if (!condition.types.includes(restaurant.type)) {
            return null;
          }
        }

        if (condition.seatingOptions) {
          const restaurantTables = await fetchData('diningTables', where('restaurantId', '==', restaurant.id));
          if (!restaurantTables || restaurantTables.length === 0) {
            return null;
          } 
          
          const availableTables = restaurantTables.filter((table) => condition.seatingOptions.includes(table.type));
          if (availableTables.length === 0) {
            return null;
          }
        }

        if (condition.avgPrice) {
          if (!condition.avgPrice.includes(restaurant.avgPrice)) {
            return null;
          }
        }
        
        if (condition.rating) {
          const restaurantReviews = await fetchData('reviews', where('restaurantId', '==', restaurant.id));
          if (!restaurantReviews || restaurantReviews.length === 0) {
            if (condition.rating !== 'No Reviews') {
              return null;
            }
          } else {
            let avgStars = restaurantReviews.reduce((acc, cV) => {
              return acc + cV.stars;
            }, 0);
            avgStars /= Math.ceil(restaurantReviews.length);
            if (parseInt(condition.rating) > avgStars) {
              return null;
            }
          }
        }

        const restaurantReviews = await fetchData('reviews', where('restaurantId', '==', restaurant.id));
        let starsAvg = restaurantReviews.reduce((acc, cV) => {
          return acc + cV.stars;
        }, 0);
        starsAvg /= Math.ceil(restaurantReviews.length);

        return {...restaurant, numberOfReviews: restaurantReviews.length , starsAvg };
      }));

      const availableRestaurants = newRestaurantList.filter((restaurant) => restaurant !== null);

      setRestaurantList(availableRestaurants);
      setIsLoading(false);
    } catch (error) {
      console.log('Fail to get search result data: ', error);
    }
  }

  if (isLoading) {
    return (
      <SplashScreen />
    )
  }

  return (
    <>
      <TopNavbar />
      <Box
        display="flex"
        flexDirection="column"
        mx={mdDown ? 1 : 4}
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={2}
      >
        <Searchbar filterParams={filterParams} />
        <Box width="100%" display="flex" alignItems="flex-start" gap={2}>
          <FilterSidebar onDataReceived={(data) => setFilterParams(data)} />
          <Box width="100%">
            <Typography variant="h4">Best Result</Typography>
            <Box display="flex" flexDirection="column" gap={3} mt={2}>
              {
                restaurantList.length > 0 ? restaurantList.map((restaurant, index) => {
                  return (
                    <Fragment key={index}>
                      <SearchRestaurantCard key={restaurant.id} restaurant={restaurant} />
                      <Divider />
                    </Fragment>
                  )
                }) : (
                  <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <ErrorOutlineIcon sx={{ color: grey[700] }} fontSize="large" />
                  <Typography
                    textAlign="center"
                    variant="h4"
                    mb={2}
                    fontWeight="bold"
                    sx={{ color: grey[700] }}
                  >
                    No Available Restaurants At The Moment
                  </Typography>
                </Box>
                )
              }
                {/* <SearchRestaurantCard />
                <Divider />
                <SearchRestaurantCard /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
