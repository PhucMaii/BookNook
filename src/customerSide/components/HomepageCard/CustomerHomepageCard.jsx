import * as React from 'react';
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

export default function CustomerHomepageCard() {
    return (
        <Card sx={{ width: 275, pb: 2, maxHeight: 400 }}>
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
                    Miku Restaurant
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
                        fontWeight='bold'
                    >
                        Vancouver
                    </Typography>
                    <Divider orientation='vertical' flexItem />
                    <RestaurantIcon />
                    <Typography
                        variant='body1'
                        fontWeight='bold'
                    >
                        Asian
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
                        <StarIcon key={index} />
                    ))}
                    <Typography
                        variant='h6'
                        fontWeight='bold'
                        ml={1}
                    >
                        • 300 Reviews
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    variant='contained'
                    style={{ color: 'white' }}
                    onClick='/customer/bookings'
                >
                    1:45pm
                </Button>
                <Button
                    variant='contained'
                    style={{ color: 'white' }}
                    onClick='/customer/bookings'
                >
                    1:45pm
                </Button>
                <Button
                    variant='contained'
                    style={{ color: 'white' }}
                    onClick='/customer/bookings'
                >
                    1:45pm
                </Button>
            </CardActions>
        </Card>
    );
}