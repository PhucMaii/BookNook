import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Divider,
    Box,
    Button,
} from '@mui/material'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { BookingImg } from './styled'
import TopNavbar from '../../components/TopNavbar/CustomerHeader';

const CustomerConfirmationBooking = () => {
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const dateIntervalId = setInterval(() => {
            setDate(dayjs());
        }, 86400000); // 24 hours in milliseconds

        const timeIntervalId = setInterval(() => {
            setTime(dayjs());
        }, 60000); // 1 minute in milliseconds

        return () => {
            clearInterval(dateIntervalId);
            clearInterval(timeIntervalId);
        };
    }, []);

    const userInfo = {
        id: 1,
        img: '/settingsDummyImg.png',
        name: 'Miku Restaurant',
        emailAdd: 'test_email@hotmail.com',
        mobileNum: '6806641235',
        userDate: date,
        userTime: time,
        seatingCap: 2,
    };

    return (
        <div>
            <TopNavbar />
            <Grid
                container
                spacing={2}
            >

                <Grid item xs={6} sx={{ paddingRight: 1 }}>
                    <Typography
                        variant='h3'
                        fontWeight={700}
                        ml={10}
                        mb={13}
                        mt={5}
                    >
                        Booking Confirmation
                    </Typography>
                    <BookingImg
                        src={userInfo.img}
                        alt='Image'
                    />
                    <Typography
                        variant='h4'
                        fontWeight={600}
                        ml={10}
                        mt={5}
                    >
                        {userInfo.name}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography
                        variant='h4'
                        fontWeight={600}
                        mt={24}
                        mb={2}
                    >
                        Diner Details
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='flex-start'
                        mr={10}
                        gap={2}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Name
                            </Typography>
                            <TextField
                                variant='outlined'
                                label='Name'
                                fullWidth
                                defaultValue={userInfo.name}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Email Address
                            </Typography>
                            <TextField
                                variant='outlined'
                                label='Email Address'
                                fullWidth
                                defaultValue={userInfo.emailAdd}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Mobile Number
                            </Typography>
                            <TextField
                                variant='outlined'
                                label='Mobile Number'
                                fullWidth
                                defaultValue={userInfo.mobileNum}
                            />
                        </div>
                        <Divider variant='middle' />
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Time
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Time"
                                    value={time}
                                    onChange={(newValue) => setTime(newValue)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' fontWeight={500} padding={3} width={600}>
                                Seating Capacity
                            </Typography>
                            <TextField
                                variant='outlined'
                                label='Seating Capacity'
                                fullWidth
                                defaultValue={userInfo.seatingCap}
                            />
                        </div>
                    </Box>
                    <Button
                        variant='contained'
                        sx={{
                            color: 'white',
                            ml: 5,
                            mr: 5,
                            width: '85%',
                            borderRadius: 5,
                            mt: 5,
                            height: '7%',
                            mb: 5,
                        }}
                    >
                        Submit Reservation
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CustomerConfirmationBooking;
