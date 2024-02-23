import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Avatar,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Divider,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { HeaderLogo } from './styled'
import { Link } from 'react-router-dom';
import PersonPin from '@mui/icons-material/PersonPin';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


// const headerPages = ['Merchant Login'];
// const settings = ['Profile', 'Logout'];


function CustomerHeader() {
    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            <Box
                display='flex'
                flexDirection='row'
                height={100}
            >
                <AppBar
                    position='static'
                    color='background'
                >
                    <Toolbar>
                        <Box
                            display='flex'
                            flexDirection='row'
                        >
                            <HeaderLogo
                                src='/customerLogo.png'
                                alt='Customer Logo'
                                style={{ mr: '200' }}
                            />
                        </Box>
                        <PersonPin color='primary' sx={{ fontSize: 40, ml: '25px', mt: '10px' }} />
                        <Box
                            display='flex'
                            alignItems='center'
                            ml='auto'
                            justifyContent='center'
                            mt={2}
                        >
                            <Link component='button' to='/' >
                                Merchant Login
                            </Link>

                            <IconButton color='inherit' sx={{ ml: '20px', }}>
                                <Avatar alt='User Settings' />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                display='flex'
                mt={8}
                justifyContent='center'
            >
                <Typography
                    variant='h3'
                    fontWeight='bold'
                    textAlign='center'
                >
                    Find your perfect spots for every moment
                </Typography>
            </Box>
            <Grid item xs={12}>
                <Box
                    display='flex'
                    flexDirection='row'
                    mt={5}
                    justifyContent='center'
                >
                    <Box display='flex' flexDirection='row' gap={5} >
                        <FormControl variant='standard'>
                            <InputLabel id='customer-searchbar-date'>Date</InputLabel>
                            <Select
                                labelId='date'
                                id='searchbar-date'
                                value=''
                                placeholder='Select Date'
                                fullWidth
                            >
                            </Select>
                        </FormControl >
                        <Divider orientation="vertical" variant="fullWidth" flexItem />
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
                        <Divider orientation="vertical" variant="fullWidth" flexItem />
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
                        <Divider orientation="vertical" variant="fullWidth" flexItem />
                        <SearchOutlinedIcon />
                        <TextField
                            color='primary'
                            id='location'
                            label='Location'
                        />
                        <Button variant='contained' style={{ color: 'white' }}>Search</Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

export default CustomerHeader;