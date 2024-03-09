import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Divider,
    Button,
    Select,
    FormControl,
    MenuItem
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
    const [selectedCapacity, setSelectedCapacity] = useState('');

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

    const seatingCapacityOptions = Array.from({ length: 20 }, (_, index) => ({
        value: index + 1,
        label: `${index + 1} person${index !== 0 ? 's' : ''}`
    }));

    return (
        <div>
            <TopNavbar />
            <Grid
                container
                spacing={2}
            >
                <Grid item md={12} lg={6} sx={{ paddingRight: 1 }}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h3'
                            fontWeight="bold"
                            ml={10}
                            mb={13}
                            mt={5}
                        >
                            Booking Confirmation
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <BookingImg
                            src={userInfo.img}
                            alt='Image'
                        />
                        <Typography
                            variant='h4'
                            fontWeight="bold"
                            ml={10}
                            mt={5}
                        >
                            {userInfo.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item md={12} lg={6} sx={{ pr: 4 }}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h4'
                            fontWeight={600}
                            mt={20}
                            mb={2}
                            pl={2}
                        >
                            Diner Details
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            label='Name'
                            fullWidth
                            defaultValue={userInfo.name}
                            sx={{ my: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Email Address
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            label='Email Address'
                            fullWidth
                            defaultValue={userInfo.emailAdd}
                            sx={{ my: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Mobile Number
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            label='Mobile Number'
                            fullWidth
                            defaultValue={userInfo.mobileNum}
                            sx={{ my: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant='middle' sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Date
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                                sx={{ width: '100%', my: 2 }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Time
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                                sx={{ width: '100%', my: 2 }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' pl={2} >
                            Seating Capacity
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                value={selectedCapacity}
                                onChange={(e) => setSelectedCapacity(e.target.value)}
                                variant="outlined"
                                fullWidth
                            >
                                {seatingCapacityOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button
                        variant='contained'
                        sx={{
                            color: 'white',
                            ml: 5,
                            mr: 5,
                            width: '85%',
                            borderRadius: 5,
                            mt: 5,
                            height: '5%',
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