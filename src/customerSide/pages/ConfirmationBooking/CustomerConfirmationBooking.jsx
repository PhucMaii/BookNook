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

const CustomerConfirmationBooking = () => {
    return (
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
                    <Grid item xs={8}>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Name
                        </Typography>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Email Address
                        </Typography>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Mobile Number
                        </Typography>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Date
                        </Typography>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Time
                        </Typography>
                        <Typography
                            variant='h6'
                            fontWeight={600}
                        >
                            Seating Capacity
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display='flex'
                            flexDirection='column'
                        >
                            <TextField
                                variant='outlined'
                            />
                            <TextField
                                variant='outlined'
                            />
                            <TextField
                                variant='outlined'
                            />
                            <TextField
                                variant='outlined'
                            />
                            <TextField
                                variant='outlined'
                            />
                            <TextField
                                variant='outlined'
                            />
                        </Box>
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

    )
}

export default CustomerConfirmationBooking;