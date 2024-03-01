import React from 'react';
import {
    Typography,
    Box,
    Select,
    InputLabel,
    FormControl,
    Divider,
    Button,
    Grid,
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
    const [date, setDate] = React.useState(dayjs('2022-02-26'));
    const [time, setTime] = React.useState(dayjs('2022-02-26T15:30'));
    const [persons, setPersons] = React.useState('');

    const handleGuestsChange = (event) => {
        setPersons(event.target.value);
    }

    return (
        <Grid
            container
            spacing={2}
            justifyContent='center'
        >
            <Box
                mt={4}
                p={2}
            >
                <Typography
                    variant='h2'
                    fontWeight='bold'
                    textAlign='center'
                >
                    Find your perfect spots for every moment
                </Typography>
            </Box>
            <Grid item xs={12}>
                <Box
                    mt={2}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-around'
                    px={6}
                    py={4}
                    style={{ backgroundColor: 'background' }}
                    borderRadius={2}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Divider orientation='vertical' flexItem />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker
                                label="Time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Divider orientation='vertical' flexItem />
                    <FormControl fullWidth>
                        <InputLabel id='customer-searchbar-time' color='secondary'>Number of Guests</InputLabel>
                        <Select
                            labelId='guests'
                            id='outlined-required'
                            value={persons}
                            placeholder='Number of Guests'
                            label='Guests'
                            onChange={handleGuestsChange}
                            color='secondary'
                        >
                            {guestsQuantity.map((quantity) =>
                                <MenuItem key={quantity} value={quantity}>
                                    {quantity}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Divider orientation='vertical' flexItem />
                    <FormControl fullWidth>
                        <InputLabel color='secondary'>Location</InputLabel>
                        <OutlinedInput
                            id='location'
                            label='Location'
                            variant='outlined'
                            color='secondary'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        variant='contained'
                        style={{ color: 'white', height: '45px', width: '7%' }}
                    >
                        Search
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CustomerSearchbar;