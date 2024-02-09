import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import {
    Grid,
    Button,
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material'
import { HeaderImg } from './styled';
import PropTypes from 'prop-types'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SettingsPagePanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

SettingsPagePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SettingsPage() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const BcCities = [
        'Vancouver',
        'Surrey',
        'Victoria',
        'Burnaby',
        'Richmond',
        'Abbotsford',
        'Coquitlam',
        'Kelowna',
        'Langley',
        'Delta',
        'Nanaimo',
        'Maple Ridge',
        'Kamloops',
        'White Rock',
        'New Westminster'
    ];

    const BCProvinces = [
        'British Columbia',
        'Alberta',
        'Saskatchewan',
        'Manitoba',
        'Ontario',
        'Quebec',
        'New Brunswick',
        'Nova Scotia',
        'Prince Edward Island',
        'Newfoundland and Labrador'
    ];
    const [CitySelected, setCitySelected] = useState('');

    const handleChangeCity = (e) => {
        setCitySelected(e.target.value);
    };

    const [ProvinceSelected, setProvinceSelected] = useState('');
    const handleProvinceChange = (e) => {
        setProvinceSelected(e.target.value);
    };

    const [showSettingsPassword, setShowSettingsPassword] = useState(false);
    const [settingsPassword, setSettingsPassword] = useState('');

    const handleTogglePassword = () => {
        setShowSettingsPassword(!showSettingsPassword);
    };

    const handlePasswordChange = (e) => {
        setSettingsPassword(e.target.value);
    };

    return (
        <Sidebar>
            <Grid
                container
                columnSpacing={2}
                width='100vw'
            >
                <Grid item xs={12} md={12} >
                    <Box display='flex' flexDirection='column' height={500}>
                        <HeaderImg
                            src='/settingsDummyImg.png'
                            alt='Header Image'
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} my={3}>
                    <Button variant='contained' color='secondary' >Change Picture</Button>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display='flex'
                        alignContent='center'
                        flexDirection='column'
                    >
                        <Box
                            borderBottom='1'
                            borderColor='divider'
                            ml={20}
                            mr={20}
                        >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', height: '100%' }} >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label='basic tabs'
                                    textColor='black'
                                    indicatorColor='secondary'
                                >
                                    <Tab label='General' {...a11yProps(0)} />
                                    <Tab label='Settings' {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <Box display='flex' alignItems='center' flexDirection='row' >
                                <SettingsPagePanel value={value} index={0}>
                                    <Box
                                        display='flex'
                                        flexDirection='row'
                                        alignItems='center'
                                        gap={9}
                                        width={1200}
                                        mb={5}
                                    >
                                        <Typography variant='h6' width={145}> Restaurant Name:</Typography>
                                        <TextField
                                            fullWidth
                                            id='Restaurant Name'
                                            defaultValue='Miku Restaurant'
                                            color='secondary'
                                        />
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection='row'
                                        alignItems='center'
                                        gap={9}
                                        width={1200}
                                        mb={5}
                                    >
                                        <Typography variant='h6' width={145}> Phone Number:</Typography>
                                        <TextField
                                            type='number'
                                            fullWidth
                                            id='Phone Number'
                                            
                                            color='secondary'
                                        />
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection='row'
                                        alignItems='center'
                                        gap={9}
                                        width={1200}
                                        mb={5}
                                    >
                                        <Typography variant='h6' width={145}> Email:</Typography>
                                        <TextField
                                            fullWidth
                                            id='Restaurant Name'
                                            color='secondary'
                                        />
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection='row'
                                        alignItems='center'
                                        gap={9}
                                        width={1200}
                                    >
                                        <Typography variant='h6' width={145}> Address:</Typography>
                                        <TextField
                                            fullWidth
                                            id='Address'
                                            color='secondary'
                                        />
                                    </Box>
                                    <Box display='flex' flexDirection='row' ml={24} gap={13} mt={5}>
                                        <Box display='flex' width={450}>
                                            <FormControl fullWidth>
                                                <InputLabel id='city select' color='secondary'>
                                                    City
                                                </InputLabel>
                                                <Select
                                                    labelId='city-select-label'
                                                    id='city-select'
                                                    label='City'
                                                    value={CitySelected}
                                                    onChange={handleChangeCity}
                                                    color='secondary'
                                                >
                                                    {BcCities.map((city, index) => (
                                                        <MenuItem key={index} value={city}>
                                                            {city}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box display='flex' width={450}>
                                            <FormControl fullWidth>
                                                <InputLabel id='province select' color='secondary'>
                                                    Province
                                                </InputLabel>
                                                <Select
                                                    labelId='province-select'
                                                    id='province-select'
                                                    label='Province'
                                                    value={ProvinceSelected}
                                                    onChange={handleProvinceChange}
                                                    color='secondary'
                                                >
                                                    {BCProvinces.map((city, index) => (
                                                        <MenuItem key={index} value={city}>
                                                            {city}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box display='flex' justifyContent='end' mt={3} >
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            sx={{ width: '10%', height: '105%' }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </SettingsPagePanel>
                                <Grid item xs={12}>
                                    <SettingsPagePanel value={value} index={1}>
                                        <Box>
                                            <FormControl>
                                                <Box
                                                    display='flex'
                                                    flexDirection='row'
                                                    alignItems='center'
                                                    gap={9}
                                                    width={1200}
                                                    mb={5}
                                                >
                                                    <Typography variant='h6' width={145}>Old Password:</Typography>
                                                    <OutlinedInput
                                                        id='old-password'
                                                        type={showSettingsPassword ? 'text' : 'password'}
                                                        color='secondary'
                                                        fullWidth
                                                        onChange={handlePasswordChange}
                                                        value={settingsPassword}
                                                        endAdornment={
                                                            <InputAdornment position='end'>
                                                                <IconButton
                                                                    aria-label='toggle password visibility'
                                                                    onClick={() => setShowSettingsPassword((show) => !show)}
                                                                    onMouseDown={handleTogglePassword}
                                                                    edge='end'
                                                                >
                                                                    {showSettingsPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    >
                                                    </OutlinedInput>
                                                </Box>
                                            </FormControl>
                                        </Box>
                                        <Box display='flex' flexDirection='row'>
                                            <FormControl>
                                                <Box
                                                    display='flex'
                                                    flexDirection='row'
                                                    alignItems='center'
                                                    gap={9}
                                                    width={1200}
                                                    mb={5}
                                                >
                                                    <Typography variant='h6' width={145} >New Password</Typography>
                                                    <OutlinedInput
                                                        id='old-password'
                                                        type={showSettingsPassword ? 'text' : 'password'}
                                                        color='secondary'
                                                        fullWidth
                                                        endAdornment={
                                                            <InputAdornment position='end'>
                                                                <IconButton
                                                                    aria-label='toggle password visibility'
                                                                    onClick={() => setShowSettingsPassword((show) => !show)}
                                                                    onMouseDown={handleTogglePassword}
                                                                    edge='end'
                                                                >
                                                                    {showSettingsPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    >
                                                    </OutlinedInput>
                                                </Box>
                                            </FormControl>
                                        </Box>
                                        <Box display='flex' flexDirection='column'>
                                            <Box display='flex' flexDirection='row'>
                                                <FormControl>
                                                    <Box
                                                        display='flex'
                                                        flexDirection='row'
                                                        alignItems='center'
                                                        gap={8.3}
                                                        width={1200}
                                                        mb={5}
                                                    >
                                                        <Typography variant='h6' width={151}>Confirm Password</Typography>
                                                        <OutlinedInput
                                                            id='old-password'
                                                            type={showSettingsPassword ? 'text' : 'password'}
                                                            color='secondary'
                                                            fullWidth
                                                            endAdornment={
                                                                <InputAdornment position='end'>
                                                                    <IconButton
                                                                        aria-label='toggle password visibility'
                                                                        onClick={() => setShowSettingsPassword((show) => !show)}
                                                                        onMouseDown={handleTogglePassword}
                                                                        edge='end'
                                                                    >
                                                                        {showSettingsPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        >
                                                        </OutlinedInput>
                                                    </Box>
                                                    <Box display='flex' justifyContent='end' >
                                                        <Button
                                                            variant='contained'
                                                            color='secondary'
                                                            sx={{ width: '10%', height: '105%' }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Box>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </SettingsPagePanel>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Sidebar >
    )
}
