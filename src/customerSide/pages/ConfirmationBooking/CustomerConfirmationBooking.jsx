import React, { useState, useEffect, useContext } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Divider,
    Button,
    Select,
    FormControl,
    MenuItem,
    InputLabel
} from '@mui/material'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BookingImg } from './styled'
import TopNavbar from '../../components/TopNavbar/CustomerHeader';
import { generateCapacity } from '../../../utils/generateConstants';
import { SplashScreen } from '../../../lib/utils';
import { BookingDataContext } from '../../context/BookingDataContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../components/AuthModal/AuthModal';
import Notification from '../../../restaurantSide/components/Notification';
import { AuthContext } from '../../context/AuthContext';
import { fetchDoc } from '../../../utils/firebase';
import { generateTimeSlots } from '../../../utils/time';
import { checkIsRestaurantOpenToday, checkRestaurantHasTable, getUnavailableTimeSlots } from '../../utils/logic';
import { daysOfWeek } from '../../../utils/constants';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

const CustomerConfirmationBooking = () => {
    const [availableCapacity, setAvailableCapacity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [notification, setNotification] = useState({
      on: false,
      severity: 'info',
      message: '',
    });
    const [timeSlots, setTimeSlots] = useState(() => generateTimeSlots());
    const { bookingData, setBookingData } = useContext(BookingDataContext);
    const [selectedCapacity, setSelectedCapacity] = useState(
      bookingData.capacity || '2 people'
    );
    const { customerIds } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (Object.keys(bookingData).length === 0) {
        navigate('/404');
      } else {
        setIsLoading(false);
      }

      if (!bookingData.user && !customerIds.docId) {
        setIsAuthModalOpen(true);
      }

      if (Object.keys(bookingData).length > 0) {
        checkCapacity();
        checkOpen();
      }
    }, [bookingData]);

    useEffect(() => {
      if (customerIds.docId) {
        fetchUserData();
      }
    }, [customerIds]);

    const fetchUserData = async () => {
      try {
        const user = await fetchDoc('users', customerIds.docId);
        setBookingData({ ...bookingData, user: user.docData });
      } catch (error) {
        console.log('Fail to fetch user data: ', error);
      }
    };

    const checkCapacity = async () => {
      const currentHour = parseInt(bookingData.timeSlot.replace(':', ''));
      const availableTables = await checkRestaurantHasTable(
        bookingData,
        currentHour
      );
      const availableCapacity = availableTables.map((table) => {
        return `${table.capacity} ${table.capacity === 1 ? 'person' : 'people'}`;
      });
      setAvailableCapacity([...new Set(availableCapacity)]);
    };

    const checkOpen = async () => {
      const isRestaurantAvailableToday = await checkIsRestaurantOpenToday(
        bookingData,
        daysOfWeek[bookingData.date.$d.getDay()]
      );

      if (!isRestaurantAvailableToday) {
        setTimeSlots([]);
      }

      const restaurant = await fetchDoc('restaurants', bookingData.id);
      const unavailableTimeSlots = await getUnavailableTimeSlots(
        restaurant,
        bookingData.date.toDate(),
        parseInt(restaurant.docData.openTime.replace(':', '')),
        parseInt(restaurant.docData.closeTime.replace(':', ''))
      );

      const restaurantData = restaurant.docData;
      const timeSlotList = generateTimeSlots();
      const openTimeIndex = timeSlotList.indexOf(restaurantData.openTime);
      const closeTimeIndex = timeSlotList.indexOf(restaurantData.closeTime);
      const timeSlots = generateTimeSlots().filter((timeSlot, index) => {
        // Check if time slot is either in range or not in unavailable time slots
        return (
          index > openTimeIndex &&
          index < closeTimeIndex &&
          !unavailableTimeSlots.includes(timeSlot)
        );
      });

      setTimeSlots(timeSlots);
    };

    const handleBookReservation = async () => {
      if (!bookingData.user) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'Please fill out all the blanks'
        })
      }
      try {
        const restaurant = await fetchDoc('restaurants', bookingData.id);
        const availableTables = await checkRestaurantHasTable(
          bookingData,
          0,
          parseInt(restaurant.docData.openTime.replace(':', '')),
          parseInt(restaurant.docData.closeTime.replace(':', ''))
        );

        if (!availableTables) {
          setNotification({
            on: true,
            severity: 'error',
            message: 'There is no table available currently',
          });
        }

        const submittedData = {
          date: bookingData.date.toDate(),
          numberOfGuests: parseInt(bookingData.capacity.split(' ')[0]) || 2,
          restaurantId: bookingData.id,
          status: 'Incomplete',
          tableId: availableTables[0].id,
          userId: customerIds.docId || 'guest',
          user: bookingData.user,
        };

        const reservationCollection = collection(db, 'reservations');
        await addDoc(reservationCollection, submittedData);

        setNotification({
          on: true,
          severity: 'success',
          message: 'Booking reservation...',
        });
        setTimeout(() => {
          navigate('/customer/successful-page');
        }, 2000);
      } catch (error) {
        console.log('Fail to book a reservation: ', error);
        setNotification({
          on: true,
          severity: 'error',
          message: 'Fail to book a reservation: ' + error,
        });
      }
    };

    if (isLoading) {
        return (
            <SplashScreen />
        )
    }

    return (
      <div>
        <Notification
          notification={notification}
          onClose={() => setNotification({ ...notification, on: false })}
        />
        <AuthModal
          open={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          setNotification={setNotification}
        />
        <TopNavbar />
        <Grid container spacing={2}>
          <Grid item md={12} lg={6} sx={{ paddingRight: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h3" fontWeight="bold" ml={10} mb={13} mt={5}>
                Booking Confirmation
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <BookingImg src={bookingData.imgURL || '/unavailable_image.png'} alt="Image" />
              <Typography variant="h4" fontWeight="bold" ml={10} mt={5}>
                {bookingData.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            item
            md={12}
            lg={6}
            sx={{ pr: 4 }}
            rowGap={4}
          >
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold" mt={20} mb={2} pl={2}>
                Diner Details
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" pl={2}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Name"
                fullWidth
                value={bookingData.user ? bookingData.user.name : ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    user: { ...bookingData.user, name: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" pl={2}>
                Email Address
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Email Address"
                fullWidth
                value={bookingData.user ? bookingData.user.email : ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    user: { ...bookingData.user, email: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" pl={2}>
                Date
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={dayjs(bookingData.date)}
                  onChange={(newValue) =>
                    setBookingData({ ...bookingData, date: newValue })
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" pl={2}>
                Time
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="customer-searchbar-time">Time</InputLabel>
                <Select
                  labelId="customer-searchbar-time"
                  id="outlined-required"
                  value={bookingData.timeSlot}
                  placeholder="Time"
                  label="Time"
                  onChange={(e) =>
                    setBookingData({ ...bookingData, timeSlot: e.target.value })
                  }
                >
                  {timeSlots.map((timeSlot, index) => {
                    return <MenuItem key={index} value={timeSlot}>{timeSlot}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" pl={2}>
                Seating Capacity
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  value={selectedCapacity}
                  onChange={(e) => {
                    setSelectedCapacity(e.target.value);
                    setBookingData({
                      ...bookingData,
                      capacity: e.target.value,
                    });
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {generateCapacity().map((capacity, index) =>
                    availableCapacity.includes(capacity) ? (
                      <MenuItem key={index} value={capacity}>
                        {capacity}
                      </MenuItem>
                    ) : (
                      <MenuItem disabled key={index} value={capacity}>
                        {capacity}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                m: 'auto',
                width: '100%',
                borderRadius: 4,
                mt: 5,
                height: '6%',
                mb: 5,
              }}
              onClick={handleBookReservation}
            >
              <Typography variant="subtitle1">Submit Reservation</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
}

export default CustomerConfirmationBooking;