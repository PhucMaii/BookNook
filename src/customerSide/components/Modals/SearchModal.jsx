import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, Grid, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BoxStyled } from '../../../restaurantSide/components/Modals/styled';
import SearchRestaurantCard from '../SearchRestaurantCard';
import { fetchData } from '../../../utils/firebase';
import { grey } from '@mui/material/colors';
import { checkIsRestaurantAvailable } from '../../utils/logic';

export default function SearchModal({
    open,
    onClose
}) {
    const [searchKeywords, setSearchKeywords] = useState('');
    const [restaurantList, setRestaurantList] = useState([]);
    const [searchRestaurants, setSearchRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurantList();
    }, [])

    useEffect(() => {
        if (searchKeywords === '') {
            setSearchRestaurants([]);
        } else {
            const newRestaurantList = restaurantList.filter((restaurant) => {
                const restaurantName = restaurant.name.toLowerCase();
                const keywords = searchKeywords.toLowerCase();
                return restaurantName.includes(keywords);
            })
            setSearchRestaurants(newRestaurantList);
        }
    }, [searchKeywords])

    const fetchRestaurantList = async () => {
        try {
            const restaurants = await fetchData('restaurants');
            
            if (restaurants.length === 0) {
                return;
            }

            const availableRestaurants = await Promise.all(restaurants.map(async (restaurant) => {
                const isAvailable = await checkIsRestaurantAvailable(restaurant);
                return isAvailable ? restaurant : null;
            }));

            const filteredRestaurants = availableRestaurants.filter((restaurant) => {
                return restaurant !== null;
            })

            setRestaurantList(filteredRestaurants.slice(0,4));
        } catch (error) {
            console.log('Fail to fetch search restaurants: ', error);
        }
    }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <BoxStyled p={4} boxShadow={24} sx={{borderRadius: 4}}>
        <Grid container p={4}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                endAdornment={
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          {searchRestaurants.length > 0 ? (
            searchRestaurants.map((restaurant) => {
              return (
                <Grid item xs={12} key={restaurant.id} sx={{ mt: 4 }}>
                  <SearchRestaurantCard restaurant={restaurant} />
                </Grid>
              );
            })
          ) : (
            <Box
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              mt={6}
            >
              <Typography
                color={grey[600]}
                fontWeight="bold"
                textAlign="center"
                variant="h6"
              >
                No Restaurants Found
              </Typography>
            </Box>
          )}
        </Grid>
      </BoxStyled>
    </Modal>
  );
}

SearchModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}
