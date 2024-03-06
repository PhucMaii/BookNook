import React from 'react';
import {
    Grid,
    Typography,
    TextField,
    Divider,
    Box,
    Button
} from '@mui/material'
import { BookingImg } from './styled'
import TopNavbar from '../../components/TopNavbar/CustomerHeader';

const CustomerConfirmationBooking = () => {
    return (
        <div>

            <TopNavbar />
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={6}>
                    <Typography
                        variant='h3'
                        fontWeight={700}
                        ml={10}
                        mb={8}
                    >
                        Booking Confirmation
                    </Typography>
                    <BookingImg
                        src='/settingsDummyImg.png'
                        alt='Image'
                    />
                    <Typography
                        variant='h4'
                        fontWeight={600}
                        ml={10}
                        mt={5}
                    >
                        Miku Restaurant
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography
                        variant='h5'
                        fontWeight={600}
                        mt={20}
                    >
                        Diner Details
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-evenly'
                        gap={5}
                    >
                        <Grid item xs={8}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    Name
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    Email Address
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    mobile Number
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    Date
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    Time
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight={600} padding={5}>
                                    Seating Capacity
                                </Typography>
                                <TextField variant='outlined' />
                            </div>
                        </Grid>
                    </Box>
                    <Button
                        variant='contained'
                        sx={{ color: 'white' }}
                    >
                        Submit Reservation
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CustomerConfirmationBooking;