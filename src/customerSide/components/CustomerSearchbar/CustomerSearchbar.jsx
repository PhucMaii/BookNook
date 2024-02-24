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
        <Grid
            columns={12}
            spacing={2}
            direction='column'
        >
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                mt={8}
                color='primary'
                backgroundcolor='white'
                width='100%'

            >
                <Typography
                    variant='h3'
                    fontWeight='bold'
                    textAlign='center'
                >
                    Find your perfect spots for every moment
                </Typography>
                <Grid
                    item xs={12}
                    rowSpacing={2}
                    sx={{ width: '100%', px: '40px' }}
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={2}
                        alignItems='center'
                        justifyContent='center'
                        width='100%'
                    >
                        <Grid item xs={2}>
                            <FormControl variant='standard'  >
                                <InputLabel id='customer-searchbar-date'>Date</InputLabel>
                                <Select
                                    labelId='date'
                                    id='searchbar-date'
                                    value=''
                                    placeholder='Select Date'
                                >
                                </Select>
                            </FormControl >
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation='vertical' variant='middle' />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant='standard' >
                                <InputLabel id='customer-searchbar-time'>Time</InputLabel>
                                <Select
                                    labelId='time'
                                    id='searchbar-time'
                                    value=''
                                    placeholder='Select Time'
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation='vertical' variant='middle' />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant='standard' >
                                <InputLabel id='customer-searchbar-time'>Number of Guests</InputLabel>
                                <Select
                                    labelId='time'
                                    id='searchbar-time'
                                    value=''
                                    placeholder='Select Time'
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation='vertical' variant='middle' sx={{ color: 'black' }} />
                        </Grid>
                        <Grid
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                        >
                            <SearchOutlinedIcon />
                            <TextField
                                color='primary'
                                id='location'
                                label='Location'
                                variant='standard'
                            />
                            <Button
                                variant='contained'
                                style={{ color: 'white', height: '55px' }}
                            >
                                Search
                            </Button>

                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    )
}

export default CustomerSearchbar;