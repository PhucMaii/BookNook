import React, { useState, useEffect } from 'react';
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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddressInput from '../../../restaurantSide/components/AddressInput';
import { generateCapacity } from '../../../utils/generateConstants';

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
      <Grid
        alignItems="center"
        container
        mt={2}
        py={4}
        px={2}
        style={{ backgroundColor: 'background', width: '100%' }}
        borderRadius={2}
        columnSpacing={1}
        rowGap={2}
      >
        <Grid item xs={5.9} lg={2.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(newValue) => setTime(newValue)}
                sx={{
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
        <Grid item xs={4.9} lg={2.5}>
          <FormControl fullWidth>
            <InputLabel id="customer-searchbar-time">
              Number of Guests
            </InputLabel>
            <Select
              labelId="guests"
              id="outlined-required"
              value={persons}
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
          <AddressInput label="Location" onDataReceived={() => {}} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" style={{ color: 'white' }} fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    );
}

export default CustomerSearchbar;