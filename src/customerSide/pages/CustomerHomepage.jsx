import React from 'react'
import { Typography } from '@mui/material';
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar'

export default function CustomerHomepage() {
    return (
        <TopNavbar>
            <Searchbar>
                <Typography variant='h1' mt={20}>Customer Homepage</Typography>
            </Searchbar>
        </TopNavbar>
    )
}