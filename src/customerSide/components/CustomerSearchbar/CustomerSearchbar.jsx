import React, { useState, useEffect } from 'react';
import {
    Box,
    Select,
    InputLabel,
    FormControl,
    Divider,
    Button,
    InputAdornment,
    OutlinedInput,
    MenuItem
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { guestsQuantity } from '../../utils/constants';

const CustomerSearchbar = () => {
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [persons, setPersons] = useState('');

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

    const handleGuestsChange = (event) => {
        setPersons(event.target.value);
    }

    return (
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        py={4}
        style={{ backgroundColor: 'background', width: '100%' }}
        borderRadius={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              style={{ minWidth: 250 }}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3498DB',
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Divider orientation="vertical" flexItem />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Time"
              value={time}
              onChange={(newValue) => setTime(newValue)}
              style={{ minWidth: 250 }}
              sx={{
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3498DB',
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Divider orientation="vertical" flexItem />
        <FormControl fullWidth style={{ maxWidth: 250 }}>
          <InputLabel id="customer-searchbar-time">Number of Guests</InputLabel>
          <Select
            labelId="guests"
            id="outlined-required"
            value={persons}
            placeholder="Number of Guests"
            label="Number of Guests"
            onChange={handleGuestsChange}
          >
            {guestsQuantity.map((quantity) => (
              <MenuItem key={quantity} value={quantity}>
                {quantity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider orientation="vertical" flexItem />
        <FormControl fullWidth style={{ width: 350 }}>
          <InputLabel>Location</InputLabel>
          <OutlinedInput
            id="location"
            label="Location"
            variant="outlined"
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          style={{ color: 'white', height: '70%', width: '6%' }}
        >
          Search
        </Button>
      </Box>
    );
}

export default CustomerSearchbar;