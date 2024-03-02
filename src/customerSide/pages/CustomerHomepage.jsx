import React from 'react';
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar';
import CustomerHomepageCard from '../components/HomepageCard/CustomerHomepageCard';
import CustomerSidebar from '../components/CustomerSidebar/CustomerSidebar';
import {
    Box,
    Typography
} from '@mui/material';

export default function CustomerHomepage() {

    const popularRestaurants = [
        {
            id: 1,
            img: '/settingsDummyImg.png',
            name: 'Miku Restaurant',
            location: 'Downtown Vancouver',
            type: 'Asian',
            reviewStars: 4,
            numberOfReviews: 200
        },
        {
            id: 2,
            img: '/settingsDummyImg.png',
            name: 'Japadog',
            location: 'Robson Downtown',
            type: 'Asian',
            reviewStars: 4,
            numberOfReviews: 200
        },
        {
            id: 3,
            img: '/settingsDummyImg.png',
            name: 'Mucho Burrito',
            location: 'Surrey',
            type: 'Chinese',
            reviewStars: 3,
            numberOfReviews: 100
        }
    ];

    const lateDinnerRestaurants = [
        {
            id: 4,
            img: '/settingsDummyImg.png',
            name: 'Indian Favelli',
            location: 'Surrey',
            type: 'Indian',
            reviewStars: 1,
            numberOfReviews: 400
        },
        {
            id: 5,
            img: '/settingsDummyImg.png',
            name: 'Kumare Express',
            location: 'Joyce Collingwood',
            type: 'Asian',
            reviewStars: 2,
            numberOfReviews: 600
        },
        {
            id: 6,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }
    ];

    return (
        <div>
            <TopNavbar />
            <Searchbar />
            <Box
                display='flex'
                gap={2}
                alignItems='flex-start'
            >
                <CustomerSidebar />
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    ml={15}
                >
                    <Typography
                        variant='h3'
                        fontWeight={500}
                        mt={5}
                        mb={3}
                    >
                        Most Popular
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={3}
                        mb={5}
                    >
                        {popularRestaurants.slice(0, 4).map((restaurant, index) => (
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
                    </Box>
                    <Typography
                        variant='h2'
                        fontWeight={500}
                        mt={2}
                        mb={3}
                    >
                        Available for late dinner
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={3}
                        pb={2}
                    >
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
                    </Box>
                </Box>
            </Box>
        </div>
    );
}