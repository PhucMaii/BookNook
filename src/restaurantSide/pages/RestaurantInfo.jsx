import * as React from 'react'
import RestaurantLogo from '../images/RestaurantLogo.png'
import EnterRnameIcon from '../icons/enterRestaurantName.png'
import RestauantTypeIcon from '../icons/restaurantType.png'
import AvgPriceIcon from '../icons/avgPrice.png'
import LoginImg from '../images/restaurantLoginImg.png'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const theme = createTheme({
    palette: {
        blue: {
            main: '#3498DB',
            contrastText: '#242105'
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});

const RestaurantInformation = () => {

    const [rType, setRType] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleChange = (event) => {
        setRType(event.target.value);
    }

    return (
        <div className='restaurant-info-con'>
            <Box display='grid' gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ flexGrow: 1 }} width={1920} height={1080}>
                <Grid
                    container spacing={2}
                    justifyContent='center'
                >
                    <Grid item xs={6}>
                        {/* Restaurant Logo */}
                        <img src={RestaurantLogo} className='restaurantLogo' alt="Restaurant Logo" style={{ paddingBottom: '150px', justifyContent: 'center', width: '250px', height: '90px', paddingLeft: '100px', paddingTop: '180px' }} />
                        {/* Top Text */}
                        <ThemeProvider theme={theme}>
                            <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '34px', marginBottom: '20px' }}>Let us know more about your business</Typography>
                        </ThemeProvider>
                        {/* Restaurant Name */}
                        <TextField
                            required
                            id="outlined-required"
                            label="Restaurant Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={EnterRnameIcon} alt="Restaurant Name Icon" />
                                    </InputAdornment>
                                ),
                            }} style={{ width: '450px', marginTop: '20px' }}
                        />
                        {/* Restaurant Type */}
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-type">Restaurant Type</InputLabel>
                            <Select
                                labelId="restaurant-type"
                                id="outlined-required"
                                value={rType}
                                label="Restaurant type"
                                onChange={handleChange}
                                style={{ width: '450px', marginTop: '20px' }}
                                
                            >
                                <MenuItem value= 'Asian'>Asian</MenuItem>
                                <MenuItem value= 'Chinese'>Chinese</MenuItem>
                                <MenuItem value= 'Japanese'>Japanese</MenuItem>
                                <MenuItem value= 'Vietamese'>Vietamese</MenuItem>
                                <MenuItem value= 'Indian'>Indian</MenuItem>
                                <MenuItem value= 'Italian'>Italian</MenuItem>
                                <MenuItem value= 'French'>French</MenuItem>
                                <MenuItem value= 'FastFood'>FastFood</MenuItem>
                                <MenuItem value= 'Other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Average Price */}
                        <FormControl fullWidth>
                            <InputLabel id="average price">Average Price</InputLabel>
                            <Select
                                labelId="average-price"
                                id="outlined-required"
                                value={price}
                                label="Restaurant type"
                                onChange={handleChange}
                                style={{ width: '450px', marginTop: '20px' }}
                            >
                                <MenuItem value= 'Less than $25'>Less than $25</MenuItem>
                                <MenuItem value= '$25 - $50'>$25 - $50</MenuItem>
                                <MenuItem value= '$50 - $100'>$50 - $100</MenuItem>
                                <MenuItem value= '$100 - $200'>$100 - $200</MenuItem>
                                <MenuItem value= 'Greater than $200'>Greater than $200</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Restaurant Image */}
                        <TextField
                            required
                            id="outlined-required"
                            label="Restaurant Image"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                            }} style={{ width: '450px', marginTop: '20px' }}
                        />
                        {/* Submit Btn */}
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" sx={{ width: '450px', marginTop: '20px' }}>Submit</Button>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img src={LoginImg} className='signupImage' alt="Login Img" style={{ width: '100%', height: '1080px', overflow: 'hidden' }} />
                </Grid>
            </Box>
        </div>
    )
}

export default RestaurantInformation