import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Select,
    InputLabel,
    FormControl,
    Divider,
    Button,
    MenuItem,
    Grid
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import AddressInput from '../../../restaurantSide/components/AddressInput';
import { generateCapacity } from '../../../utils/generateConstants';
import { fetchLatLong } from '../../../utils/location';
import { generateTimeSlots } from '../../../utils/time';
import { useNavigate } from 'react-router-dom';

export const getCurrentTime = () => {
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


const CustomerSearchbar = ({filterParams}) => {
    const [address, setAddress] = useState(null);
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(() => getCurrentTime());
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const navigate = useNavigate();
    const currentDate = new Date();

    useEffect(() => {
      const dateIntervalId = setInterval(() => {
        setDate(dayjs());
      }, 86400000); // 24 hours in milliseconds

      return () => {
        clearInterval(dateIntervalId);
      };
    }, []);

    const handleGuestsChange = (event) => {
      setNumberOfGuests(event.target.value);
    };

    const handleSearch = async () => {
      const searchOptions = {};

      if (address) {
        const addressObj = await fetchLatLong(address.description);
        searchOptions.address = JSON.stringify({...addressObj, description: address.description});
      }
      
      if (date) {
        const formattedDate = `${date.$M + 1}/${date.$D}/${date.$y}`;
        searchOptions.date = formattedDate;
      }
      
      if (time) {
        searchOptions.time = time;
      }
      
      if (numberOfGuests) {
        searchOptions.numberOfGuests = numberOfGuests;
      }
      
      const params = new URLSearchParams(searchOptions).toString();
      navigate(`/customer/search?${params}&${filterParams}`);
    }

    const getCurrentTimeIndex = (currentTime) => {
      const timeSlots = generateTimeSlots();
      const currentTimeIndex = timeSlots.indexOf(currentTime);

      return currentTimeIndex;
    }

    const renderTimeSlots = () => {
      const renderedTimeSlots = generateTimeSlots().map((timeSlot, index) => {
        const currentTime = getCurrentTime();
        const currentTimeIndex = getCurrentTimeIndex(currentTime);
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

    return (
      <Grid
        container
        alignItems="center"
        mt={2}
        py={4}
        px={2}
        style={{ backgroundColor: 'background', width: '100%' }}
        borderRadius={2}
        columnSpacing={1}
        rowGap={2}
      >
        <Grid item xs={5.9} lg={2.5} mb={1}>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DemoContainer fullWidth components={['DatePicker']}>
              <DatePicker
                disablePast
                minDate={currentDate}
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  width: '100%',
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3498DB',
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={0.1}>
          <Divider component="span" orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={5.9} lg={2.5}>
          <FormControl fullWidth>
            <InputLabel id="customer-searchbar-time">Time</InputLabel>
            <Select
              labelId="customer-searchbar-time"
              id="outlined-required"
              value={time}
              placeholder="Time"
              label="Time"
              onChange={(e) => setTime(e.target.value)}
            >
              {renderTimeSlots()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0.1}>
          <Divider component="span" orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={4.9} lg={2.5}>
          <FormControl fullWidth>
            <InputLabel id="customer-searchbar-time">
              Number of Guests
            </InputLabel>
            <Select
              labelId="guests"
              id="outlined-required"
              value={numberOfGuests}
              placeholder="Number of Guests"
              label="Number of Guests"
              onChange={handleGuestsChange}
            >
              {generateCapacity().map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0.1}>
          <Divider component="span" orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={4.9} lg={3}>
          <AddressInput
            label="Location"
            onDataReceived={(data) => setAddress(data)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={handleSearch}
            variant="contained"
            style={{ color: 'white' }}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
    );
}

CustomerSearchbar.propTypes = {
  filterParams: PropTypes.string
}

export default CustomerSearchbar;