import React from 'react';
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import FilterSidebar from '../components/FilterSidebar';
import SearchRestaurantCard from '../components/SearchRestaurantCard';


export default function SearchResultPage() {
    const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
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
        <Searchbar />
        <Box width="100%" display="flex" alignItems="flex-start" gap={2}>
          <FilterSidebar />
          <Box width="100%">
            <Typography variant="h4">Best Result</Typography>
            <Box display="flex" flexDirection="column" gap={3} mt={2}>
                <SearchRestaurantCard />
                <Divider />
                <SearchRestaurantCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
