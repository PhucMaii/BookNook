import * as React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RestaurantInformation = () => {

    const [rType, setRType] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleRestaurantTypeChange = (event) => {
        setRType(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const restaurantTypes = [
        'Asian',
        'Chinese',
        'Japanese',
        'Vietnamese',
        'Indian',
        'Italian',
        'French',
        'FastFood',
        'Other',
    ];

    const averagePrices = [
        'Less than $25',
        '$25 - $50',
        '$50 - $100',
        '$100 - $200',
        'Greater than $200',
    ];

    return (
        <div className='restaurant-info-con'>
            <Box display='grid' gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ flexGrow: 1 }} width={1920} height={1080}>
                <Grid
                    container spacing={2}
                    justifyContent='center'
                >
                    <Grid item xs={6}>
                        <img src='/restaurantLogo.png' className='restaurantLogo' alt="Restaurant Logo" style={{ paddingBottom: '150px', justifyContent: 'center', width: '250px', height: '90px', paddingLeft: '100px', paddingTop: '180px' }} />
                            <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '34px', marginBottom: '20px' }}>Let us know more about your business</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Restaurant Name"
                            InputProps={{
                                startAdornment: (
                                    <RestaurantIcon />
                                ),
                            }} style={{ width: '450px', marginTop: '20px' }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-type">Restaurant Type</InputLabel>
                            <Select
                                labelId="restaurant-type"
                                id="outlined-required"
                                value={rType}
                                label="Restaurant type"
                                onChange={handleRestaurantTypeChange}
                                style={{ width: '450px', marginTop: '20px' }}

                            >
                                {restaurantTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="average price">Average Price</InputLabel>
                            <Select
                                labelId="average-price"
                                id="outlined-required"
                                value={price}
                                label="Restaurant type"
                                onChange={handlePriceChange}
                                style={{ width: '450px', marginTop: '20px' }}
                            >
                                {averagePrices.map((priceOption) => (
                                    <MenuItem key={priceOption} value={priceOption}>
                                        {priceOption}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            id="outlined-required"
                            label="Restaurant Image"
                            InputProps={{
                            }} style={{ width: '450px', marginTop: '20px' }}
                        />
                            <Button variant="contained" color='secondary' sx={{ width: '450px', marginTop: '20px' }}>Submit</Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img src='/restaurantLoginImg.png' className='signupImage' alt="Login Img" style={{ width: '100%', height: '1080px', overflow: 'hidden' }} />
                </Grid>
            </Box>
        </div>
    )
}

export default RestaurantInformation