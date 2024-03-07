import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { generateTimeSlots } from '../../../utils/time';

const ReservationMakingBlock = props => {
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [size, setSize] = useState();

    const timeSlots = generateTimeSlots()

    return (
        <>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' fontWeight='bold'>Make a reservation</Typography>
                </Grid>               
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ width: '100%' }}
                            label="datePicker"
                            value={date}
                            onChange={(newValue) => {
                                // Converting Dayjs date object to a JavaScript Date object
                                const jsDate = newValue.toDate();
                                console.log(jsDate)
                                // Update the state with the new selected date
                                setDate(jsDate);
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
                            onChange={(e) => setTime(e.target.value)}
                        >
                            {timeSlots.map((timeValue) => (
                                <MenuItem key={timeValue} value={timeValue}>
                                    {timeValue}
                                </MenuItem>
                            ))}
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
                            label="Age"
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth color='primary' variant='outlined'>Find a time</Button>
                </Grid>
            </Grid>
        </>
    )
}

ReservationMakingBlock.propTypes = {}

export default ReservationMakingBlock