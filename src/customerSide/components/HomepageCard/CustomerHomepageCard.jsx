import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Box,
    CardActions,
    CardContent,
    Button,
    Typography,
    Divider
} from '@mui/material';
import { CardImage } from './styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StarIcon from '@mui/icons-material/Star';
import { ratings } from '../../utils/constants';

const CustomerHomepageCard = ({ name, location, type, reviewStars }) => {
    return (
        <Card sx={{ width: 350, pb: 2, maxHeight: 400, borderRadius: '20px', boxShadow: 0 }}>
            <CardContent>
                <CardImage
                    src='/settingsDummyImg.png'
                    alt='Card Image'
                />
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    mt={1}
                >
                    {name}
                </Typography>
                <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='flex-start'
                    gap={1}
                    mt={1}
                >
                    <LocationOnIcon />
                    <Typography
                        variant='body1'
                    >
                        {location}
                    </Typography>
                    <Divider orientation='vertical' flexItem />
                    <RestaurantIcon />
                    <Typography
                        variant='body1'
                    >
                        {type}
                    </Typography>
                </Box>
                <Box
                    display='flex'
                    flexDirection='row'
                    mt={2}
                    justifyContent='flex-start'
                    alignItems='center'
                >
                    {ratings.map((rating, index) => (
                        <StarIcon key={index} sx={{color: 'red'}} />
                    ))}
                    <Typography
                        variant='h6'
                        ml={1}
                    >
                        • {reviewStars} {reviewStars === 1 ? 'Review' : 'Reviews'}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(4, 1fr)'
                    gap={2}
                >
                    {[1, 2, 3, 4].map((time, index) => (
                        <Button
                            key={index}
                            variant='contained'
                            style={{ color: 'white' }}
                        >
                            {time}:00pm
                        </Button>
                    ))}
                </Box>
            </CardActions>
        </Card>
    );
}

CustomerHomepageCard.propTypes = {
    name: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    reviewStars: PropTypes.number,
    numberOfReviews: PropTypes.number
}

export default CustomerHomepageCard;