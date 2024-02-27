import * as React from 'react';
import {
    Box,
    Card,
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

export default function CustomerHomepageCard() {
    return (
        <Card sx={{ width: 275, pb: 2 }}>
            <CardContent>
                <Box
                    display='flex'
                    justifyContent='center'
                >
                    <CardImage
                        src='/settingsDummyImg.png'
                        alt='Card Image'
                    />
                </Box>
                <Box
                    display='flex'
                    mt={1}
                >
                    <Typography
                        variant='h5'
                        fontWeight='bold'
                    >
                        Miku Restaurant
                    </Typography>
                </Box>
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
                    <Box
                        display='flex'
                    >
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </Box>
                    <Box
                        display='flex'
                        mx={1}
                    >
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                        >
                            •
                        </Typography>
                    </Box>
                    <Typography
                        variant='h6'
                        fontWeight='bold'
                    >
                        300 Reviews
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box
                    display='flex'
                    flexDirection='row'
                    gap={1}
                >
                    <Button
                        variant='contained'
                        style={{ color: 'white' }}
                        onClick='/customer/homepage' // will be adjusted to customer booking page 
                    >
                        1:45pm
                    </Button>
                    <Button
                        variant='contained'
                        style={{ color: 'white' }}
                        onClick='/customer/homepage' // will be adjusted to customer booking page 
                    >
                        1:45pm
                    </Button>
                    <Button
                        variant='contained'
                        style={{ color: 'white' }}
                        onClick='/customer/homepage' // will be adjusted to customer booking page 
                    >
                        1:45pm
                    </Button>
                    
                </Box>
            </CardActions>
        </Card>
    );
}