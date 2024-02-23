import React from 'react';
import {
    Typography,
    Box,
    Select,
    InputLabel,
    FormControl,
    Divider,
    TextField,
    Button,
    Grid
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function CustomerSearchbar() {

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Typography
                variant='h3'
                fontWeight='bold'
                textAlign='center'
            >
                Find your perfect spots for every moment
            </Typography>
            <Grid item xs={12}>
                <Box
                    display='flex'
                    flexDirection='row'
                    gap={2}
                >
                    <Grid>
                        <Box display='flex' flexDirection='row' >
                            <FormControl variant='standard'>
                                <InputLabel id='customer-searchbar-date'>Date</InputLabel>
                                <Select
                                    labelId='date'
                                    id='searchbar-date'
                                    value=''
                                    placeholder='Select Date'
                                >

                                </Select>
                            </FormControl >
                            <Divider orientation="vertical" variant="fullWidth" />
                            <FormControl variant='standard'>
                                <InputLabel id='customer-searchbar-time'>Time</InputLabel>
                                <Select
                                    labelId='time'
                                    id='searchbar-time'
                                    value=''
                                    placeholder='Select Time'
                                >

                                </Select>
                            </FormControl>
                            <Divider orientation="vertical" variant="fullWidth" />
                            <FormControl variant='standard'>
                                <InputLabel id='customer-searchbar-time'>Number of Guests</InputLabel>
                                <Select
                                    labelId='time'
                                    id='searchbar-time'
                                    value=''
                                    placeholder='Select Time'
                                >

                                </Select>
                            </FormControl>
                            <Divider orientation="vertical" variant="fullWidth" />
                            <SearchOutlinedIcon />
                            <TextField
                                color='primary'
                                id='location'
                                label='Location'
                            />
                            <Button variant='contained' style={{ color: 'white' }}>Search</Button>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default CustomerSearchbar;