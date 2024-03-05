import React, { useRef, useState } from 'react';
import TopNavbar from '../components/TopNavbar/CustomerHeader';
import Searchbar from '../components/CustomerSearchbar/CustomerSearchbar';
import CustomerHomepageCard from '../components/HomepageCard/CustomerHomepageCard';
import CustomerSidebar from '../components/CustomerSidebar/CustomerSidebar';
import {
    Box,
    Typography,
    IconButton
} from '@mui/material';
import { ScrollContainer } from './styled';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export default function CustomerHomepage() {
    const popularScrollRef = useRef(null);
    const lateDinnerScrollRef = useRef(null);
    const [popularStartIndex, setPopularStartIndex] = useState(0);
    const [lateDinnerStartIndex, setLateDinnerStartIndex] = useState(0);
    const [popularPrevDisabled, setPopularPrevDisabled] = useState(true);
    const [popularNextDisabled, setPopularNextDisabled] = useState(false);
    const [lateDinnerPrevDisabled, setLateDinnerPrevDisabled] = useState(true);
    const [lateDinnerNextDisabled, setLateDinnerNextDisabled] = useState(false);

    const displayNextPopularCards = () => {
        const nextIndex = popularStartIndex + 4;
        setPopularStartIndex(nextIndex);
        setPopularPrevDisabled(false);
        if (nextIndex + 4 >= popularRestaurants.length) {
            setPopularNextDisabled(true);
        }
    };

    const displayPreviousPopularCards = () => {
        const nextIndex = Math.max(0, popularStartIndex - 4);
        setPopularStartIndex(nextIndex);
        setPopularNextDisabled(false);
        if (nextIndex === 0) {
            setPopularPrevDisabled(true);
        }
    };

    const displayNextLateDinnerCards = () => {
        const nextIndex = lateDinnerStartIndex + 4;
        setLateDinnerStartIndex(nextIndex);
        setLateDinnerPrevDisabled(false);
        if (nextIndex + 4 >= lateDinnerRestaurants.length) {
            setLateDinnerNextDisabled(true);
        }
    };

    const displayPreviousLateDinnerCards = () => {
        const nextIndex = Math.max(0, lateDinnerStartIndex - 4);
        setLateDinnerStartIndex(nextIndex);
        setLateDinnerNextDisabled(false);
        if (nextIndex === 0) {
            setLateDinnerPrevDisabled(true);
        }
    };

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
        },
        {
            id: 4,
            img: '/settingsDummyImg.png',
            name: 'Mucho Burrito',
            location: 'Surrey',
            type: 'Chinese',
            reviewStars: 3,
            numberOfReviews: 100
        },
        {
            id: 5,
            img: '/settingsDummyImg.png',
            name: 'Mucho Burrito',
            location: 'Surrey',
            type: 'Chinese',
            reviewStars: 3,
            numberOfReviews: 100
        },
        {
            id: 6,
            img: '/settingsDummyImg.png',
            name: 'Mucho Burrito',
            location: 'Surrey',
            type: 'Chinese',
            reviewStars: 3,
            numberOfReviews: 100
        }, {
            id: 7,
            img: '/settingsDummyImg.png',
            name: 'Mucho Burrito',
            location: 'Surrey',
            type: 'Chinese',
            reviewStars: 3,
            numberOfReviews: 100
        }, {
            id: 8,
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
            id: 9,
            img: '/settingsDummyImg.png',
            name: 'Indian Favelli',
            location: 'Surrey',
            type: 'Indian',
            reviewStars: 1,
            numberOfReviews: 400
        },
        {
            id: 10,
            img: '/settingsDummyImg.png',
            name: 'Kumare Express',
            location: 'Joyce Collingwood',
            type: 'Asian',
            reviewStars: 2,
            numberOfReviews: 600
        },
        {
            id: 11,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }, {
            id: 12,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }, {
            id: 13,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }, {
            id: 14,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }, {
            id: 15,
            img: '/settingsDummyImg.png',
            name: 'Boom',
            location: 'Pender',
            type: 'Chinese',
            reviewStars: 1,
            numberOfReviews: 550
        }, {
            id: 16,
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
                alignItems='flex-start'
                gap={2}
            >
                <CustomerSidebar />
                <Box>
                    <Typography
                        variant='h3'
                        fontWeight={500}
                        mt={5}
                        mb={3}
                    >
                        Most Popular
                    </Typography>
                    <Box 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        mb={2}
                    >
                        <IconButton
                            onClick={displayPreviousPopularCards}
                            disabled={popularPrevDisabled}
                        >
                            <ArrowBack />
                        </IconButton>
                        <ScrollContainer
                            ref={popularScrollRef}
                            display='flex'
                        >
                            {popularRestaurants.slice(popularStartIndex, popularStartIndex
                                + 4).map((restaurant, index) => (
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
                        </ScrollContainer>
                        <IconButton
                            onClick={displayNextPopularCards}
                            disabled={popularNextDisabled}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                    >
                        <Typography
                            variant='h3'
                            fontWeight={500}
                            mt={5}
                            mb={3}
                        >
                            Available for Late Dinner
                        </Typography>
                        <Box
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center" 
                            mb={2}
                        >
                            <IconButton
                                onClick={displayPreviousLateDinnerCards}
                                disabled={lateDinnerPrevDisabled}
                            >
                                <ArrowBack />
                            </IconButton>
                            <ScrollContainer
                                ref={lateDinnerScrollRef}
                            >
                                {lateDinnerRestaurants.slice(lateDinnerStartIndex, lateDinnerStartIndex
                                    + 4).map((restaurant, index) => (
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
                            </ScrollContainer>
                            <IconButton
                                onClick={displayNextLateDinnerCards}
                                disabled={lateDinnerNextDisabled}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div >
    );
}