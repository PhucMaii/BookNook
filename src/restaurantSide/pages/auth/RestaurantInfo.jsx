import React, { useState, useContext } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {LoadingButton} from '@mui/lab';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import { restaurantTypes, averagePrices } from '../../utils/constants'
import { LogoImg, SideImg } from './styled';
import { AuthContext } from '../../context/AuthContext';
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';

const RestaurantInformation = () => {
    const [restaurantType, setRType] = useState('');
    const [price, setPrice] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [notification, setNotification] = useState({
        on: false,
        severity: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { uid } = useContext(AuthContext);

    const handleRestaurantTypeChange = (event) => {
        setRType(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleUpdateInfo = async () => {
        if (!restaurantName || !restaurantType || !contactNumber || !price) {
            setNotification({
                on: true,
                severity: 'error',
                message: 'Please fill out all the necessary field.'
              })
            return;
          }

        const submittedData = {
            name: restaurantName,
            type: restaurantType,
            avgPrice: price,
            phoneNumber: contactNumber,
            imgURL
        }

        try {
            setIsLoading(true)
            const restaurantCollection = collection(db, 'restaurants');
            const userQuery = query(restaurantCollection, where('uid', '==', uid));
            const userSnapshot = await getDocs(userQuery); // There should be only 1 document/user
            userSnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, submittedData);
            })
            setNotification(
                {
                    on: true,
                    severity: 'success',
                    message: 'Updated info successfully.'
                }
            )
            setIsLoading(false)
            navigate('/overview')
        } catch (error) {
            console.log('Fail to update info: ', error);
        }
    }

    return (
        <Grid
            container
            columnSpacing={2}
            justifyContent='center'
            overflow='hidden'
            height='100vh'
        >
            <Snackbar
                open={notification.on}
                autoHideDuration={5000}
                onClose={() => setNotification({ on: false })}
            >
                <Alert severity={notification.severity}>{notification.message}</Alert>
            </Snackbar>
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
                            color="secondary"
                            id="outlined-required"
                            label="Restaurant Name"
                            InputProps={{
                                startAdornment: (
                                    <RestaurantIcon />
                                ),
                            }}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                        <TextField
                            id="outlined-required"
                            label="Contact Number"
                            color='secondary'
                            InputProps={{
                                startAdornment: (
                                    <SettingsCellIcon />
                                ),
                            }}
                            fullWidth
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="restaurant-type">Restaurant Type</InputLabel>
                            <Select
                                labelId="restaurant-type"
                                color="secondary"
                                id="outlined-required"
                                value={restaurantType}
                                label="Restaurant type"
                                onChange={handleRestaurantTypeChange}

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
                                color="secondary"
                                id="outlined-required"
                                value={price}
                                label="Restaurant type"
                                onChange={handlePriceChange}
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
                            onChange={(e) => setImgURL(e.target.value)}
                        />
                        <LoadingButton 
                            loading={isLoading}
                            loadingIndicator="Updating Info..."
                            variant="contained"
                            color='secondary'
                            onClick={handleUpdateInfo}
                        >
                            Submit
                        </LoadingButton>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <SideImg src='/restaurantLoginImg.png' className='signupImage' alt="Login Img" />
            </Grid>
        </Grid>
    )
}

export default RestaurantInformation