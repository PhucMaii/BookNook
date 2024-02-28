import React from 'react'
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar'
import CustomerHomepageCard from '../components/HomepageCard/CustomerHomepageCard'
import CustomerSidebar from '../components/CustomerSidebar/CustomerSidebar';
import {
    Box,
    Typography
} from '@mui/material'

export default function CustomerHomepage() {
    return (
        <div>
            <TopNavbar>
            </TopNavbar>
            <Searchbar>
            </Searchbar>
            <Box
                display='flex'
                flexDirection='row'
                gap={2}
            >
                <CustomerSidebar>
                </CustomerSidebar>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    ml={10}
                >
                    <Box >
                        <Typography
                            variant='h2'
                            fontWeight='bold'
                        >
                            Most Popular
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={3}
                        mb={5}
                    >
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                    </Box>
                    <Typography
                        variant='h2'
                        fontWeight='bold'
                    >
                        Available for late dinner
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={3}
                    >
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                        <CustomerHomepageCard>
                        </CustomerHomepageCard>
                    </Box>

                </Box>
            </Box>

        </div>

    )
}