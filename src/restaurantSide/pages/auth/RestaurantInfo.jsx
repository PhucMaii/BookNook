import * as React from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { restaurantTypes, averagePrices } from '../../utils/constants';
import { LogoImg, SideImg } from './styled';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import {
    Grid,
    Box,
    TextField,
    Button, 
    Typography,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    InputAdornment,
} from '@mui/material'

const RestaurantInformation = () => {

    const [restaurantType, setRType] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleRestaurantTypeChange = (event) => {
        setRType(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    return (
        <Grid
            container
            ColumnSpacing={2}
            justifyContent='center'
            overflow='hidden'
            height='100vh'
        >
            <Grid item xs={6}>
                <Box display='flex' flexDirection='column' margin='auto' width='50%'>
                    <Box display='flex' justifyContent='center' my={6}>
                        <LogoImg
                            src='/restaurantLogo.png'
                            className='restaurantLogo'
                            alt="Restaurant Logo"
                        />
                    </Box>
                    <Typography variant="h4" fontWeight='bold'>
                        Let us know more about your busines
                    </Typography>
                    <Box display='flex' flexDirection='column' gap={3} mt={3}>
                        <TextField
                            required
                            color="secondary"
                            id="outlined-required"
                            label="Restaurant Name"
                            InputProps={{
                                startAdornment: (
                                    <RestaurantIcon />
                                ),
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-type" color='secondary'>Restaurant Type</InputLabel>
                            <Select
                                labelId="restaurant-type"
                                color="secondary"
                                id="outlined-required"
                                value={restaurantType}
                                label="Restaurant type"
                                onChange={handleRestaurantTypeChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                      <RestaurantIcon />
                                    </InputAdornment>
                                  }
                            >
                                {restaurantTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="average price" color='secondary'>Average Price</InputLabel>
                            <Select
                                labelId="average-price"
                                color="secondary"
                                id="outlined-required"
                                value={price}
                                label="Restaurant type"
                                onChange={handlePriceChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                      <AttachMoneyOutlinedIcon />
                                    </InputAdornment>
                                  }
                            >
                                {averagePrices.map((priceOption) => (
                                    <MenuItem key={priceOption} value={priceOption}>
                                        {priceOption}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            // required
                            id="outlined-required"
                            label="Restaurant Image"
                            InputProps={{
                            }}
                        />
                        <Button variant="contained" color='secondary'>Submit</Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <SideImg src='/restaurantLoginImg.png' className='signupImage' alt="Login Img"/>
            </Grid>
        </Grid>
    )
}

export default RestaurantInformation