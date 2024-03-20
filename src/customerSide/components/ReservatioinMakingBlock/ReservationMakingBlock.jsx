import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CardActions, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { generateTimeSlots } from '../../../utils/time';
import { generateCapacity } from '../../../utils/generateConstants';
import { daysOfWeek } from '../../../utils/constants';
import { checkIsRestaurantOpenCurrently, checkIsRestaurantOpenToday, checkRestaurantHasTable } from '../../utils/logic';
import { Box } from '@mui/system';

const getCurrentTime = () => {
    const currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    currentMinutes = Math.ceil(currentMinutes / 15) * 15;

    // Adjust to 0 when reaching 60
    if (currentMinutes === 60) {
        currentMinutes = `00`;
        currentHour += 1;
    }

    const currentTime = `${currentHour}:${currentMinutes}`;

    return currentTime;
};

const formatTime = (time) => {
    const hourMinute = time.split(':');
    const hour = hourMinute[0];
    const minute = hourMinute[1];
    const timeInteger = parseInt(hour + minute);
    return timeInteger
}

const ReservationMakingBlock = ({ restaurantData }) => {
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(() => getCurrentTime());
    const [timeValue, setTimeValue] = useState(() => formatTime(time));
    const [size, setSize] = useState('');
    const [availableTable, setAvailableTable] = useState(null);

    const currentDate = new Date();

    const timeSlots = generateTimeSlots();

    const getCurrentTimeIndex = (currentTime) => {
        const currentTimeIndex = timeSlots.indexOf(currentTime);
        return currentTimeIndex;
    }

    const renderTimeSlots = () => {
        const renderedTimeSlots = generateTimeSlots().map((timeSlot, index) => {
            const currentTimeIndex = getCurrentTimeIndex(time);
            const todayObj = dayjs();

            if (
                date.$D === todayObj.$D &&
                date.$M === todayObj.$M &&
                date.$y === todayObj.$y &&
                index <= currentTimeIndex
            ) {
                return (
                    <MenuItem disabled key={timeSlot} value={timeSlot}>
                        {timeSlot}
                    </MenuItem>
                );
            }
            return (
                <MenuItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                </MenuItem>
            );
        });

        return renderedTimeSlots;
    };

    const handleSearch = async () => {
        let day = daysOfWeek[date.$d.getDay()];
        try {
            const isRestaurantAvailableToday = await checkIsRestaurantOpenToday(
                restaurantData,
                day
            );

            if (!isRestaurantAvailableToday) {
                return false;
            }

            const isRestaurantOpen = await checkIsRestaurantOpenCurrently(
                restaurantData,
                timeValue
            );

            if (!isRestaurantOpen) {
                return false;
            }

            const isRestaurantHasTables = await checkRestaurantHasTable(
                restaurantData,
                timeValue
            );
        
            const availableTable = isRestaurantHasTables.filter(item => item.capacity == size.split(' ')[0]);
            setAvailableTable(availableTable); 

            return availableTable
        } catch (error) {
            console.log('Fail to check restaurant availability: ', error);
            return false; // You might want to handle errors and return accordingly
        }
    };

    useEffect(() => {
        // Call renderAvailableTimeSlots after availableTable state is updated
            renderAvailableTimeSlots();
    }, [availableTable]);

    const renderAvailableTimeSlots = () => {
        
        let currentHourIndex = timeSlots.indexOf(time);
        const renderedTimeSlots = []
        let i = currentHourIndex;
        console.log(availableTable, 'avialble table in render time slots')
        if (availableTable && availableTable.length > 0) {
            let i = currentHourIndex;
            while (i < timeSlots.length && i <= currentHourIndex + 3) {
                renderedTimeSlots.push(
                    <Button key={i} variant="contained" style={{ color: 'white' }}>
                        {timeSlots[i]}
                    </Button>
                );
                i++;
            }
        } else{
            return <Typography variant='h5' fontWeight='bold'>No Available Time</Typography>
        }

        if (i >= currentHourIndex) {
            currentHourIndex = currentHourIndex - (timeSlots.length - 1);
            i = 0;
            while (i <= currentHourIndex + 3) {
                renderedTimeSlots.push(
                    <Button key={i} variant="contained" style={{ color: 'white' }}>
                        {timeSlots[i]}
                    </Button>
                );
                i++;
            }
        }

        return renderedTimeSlots;
    }

    return (
        <>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' fontWeight='bold'>Make a reservation</Typography>
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            minDate={currentDate}
                            sx={{ width: '100%' }}
                            label="Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue)
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="time-select-label">Time</InputLabel>
                        <Select
                            labelId="time-select-label"
                            id="time-select"
                            value={time}
                            label="Age"
                            onChange={(e) => {
                                setTime(e.target.value)
                                setTimeValue(formatTime(e.target.value))
                            }}
                        >
                            {renderTimeSlots()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="size-select-label">Party Size</InputLabel>
                        <Select
                            labelId="size-select-label"
                            id="size-select"
                            value={size}
                            label="Party Size"
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {generateCapacity().map((quantity) => (
                                <MenuItem key={quantity} value={quantity}>
                                    {quantity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth color='primary' variant='outlined'
                        onClick={handleSearch}
                    >Find a time</Button>
                </Grid>
                <Grid item>
                    <CardActions>
                        <Box display="flex" flexWrap="wrap" gap={2}>
                            {renderAvailableTimeSlots()}
                        </Box>
                    </CardActions>
                </Grid>
            </Grid>
        </>
    )
}

ReservationMakingBlock.propTypes = {
    restaurantData: PropTypes.object
}

export default ReservationMakingBlock