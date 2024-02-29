import {
  Grid,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import HomepageCard from '../components/HomepageCard/HomepageCard';
import SearchIcon from '@mui/icons-material/Search';
import StatusText from '../components/StatusText/StatusText';
import { AuthContext } from '../context/AuthContext';
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { SplashScreen } from '../../lib/utils';
import { generateToday, sortTimeAscend } from '../../utils/time';
import { HomepageEditModal } from '../components/HomepageEditModal/HomepageEditModal';

export default function HomePage() {
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [reservationList, setReservationList] = useState([])
  const [arrivedData, setArrivedData] = useState(0);
  const [reviewStars, setReviewStars] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableIdList, setTableIdList] = useState([]);

  const { restaurantIds } = useContext(AuthContext);

  useEffect(() => {
    if (restaurantIds) {
      fetchTable()
      fetchData();
      fetchReviews();
    }
  }, [restaurantIds]);

  useEffect(() => {
    switch (filter) {
      case 'All': {
        setTableData(reservationList);
        break;
      }
      case 'Completed': {
        const completeFilteredData = reservationList.filter((row) => row.status === 'Completed');
        setTableData(completeFilteredData);
        break;
      }
      case 'Incomplete': {
        const incompleteFilteredData = reservationList.filter((row) => row.status === 'Incomplete');
        setTableData(incompleteFilteredData);
        break;
      }
      case 'Cancelled': {
        const cancelledFilteredData = reservationList.filter((row) => row.status === 'Cancelled');
        setTableData(cancelledFilteredData);
        break;
      }
      case 'Newest to Oldest': {
        const newToOldTimeFilterData = sortTimeAscend(reservationList).reverse();
        setTableData(newToOldTimeFilterData);
        break;
      }
      case 'Oldest to Newest': {
        const oldToNewTimeFilterData = sortTimeAscend(reservationList);
        setTableData(oldToNewTimeFilterData);
        break;
      }
      default: {
        setTableData(reservationList);
        break;
      }
    }
  }, [filter]);

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }

  const handleKeyDown = (event) => {
    setTableData(reservationList)
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleSearch = (word) => {
    const filteredItems = tableData.filter(item => 
      item.customerName.includes(word) || item.tableNumber.toString().includes(word)
    );
    setTableData(filteredItems)
  }

  const getArrivedData = (data) => {
    if (!data) {
      console.error('Data is undefined or null.');
      return;
    }
    const dataList = []
    data.forEach((item) => {
      if (item.status === 'Completed') {
        dataList.push(item)
      }
    })
    const arrived = dataList.length
    setArrivedData(arrived)
  }

  const getReviewStar = (reviews) => {
    let totalStar = 0;
    if (!reviews) {
      console.error('Reviews is undefined or null.');
      return;
    }
    reviews.map((i) => {
      totalStar += i
    })
    const avgStar = parseFloat((totalStar / reviews.length).toFixed(1))

    setReviewStars(avgStar)
  }

  const fetchTable = async() => {
    setIsLoading(true)
    try {
      const tempTableIdList = [];
      const tableCollection = collection(db, 'diningTables')
      const tableQuery = query(
        tableCollection,
        where('restaurantId', '==', restaurantIds.docId),
      );
      const tableQuerySnapshot = await getDocs(tableQuery);
      tableQuerySnapshot.docs.map((document) => {
        const tableData = document.data();

        const formattedTableData = {
          tableNumber: tableData.tableNumber,
          tableCapacity: tableData.capacity,
          tableId: document.id
        };

        tempTableIdList.push(formattedTableData)
      })
      setTableIdList(tempTableIdList)
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to fetch reviews, ', error);
    }
  }

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const tempReviewList = [];
      const reviewCollection = collection(db, 'reviews');
      const reviewQuery = query(
        reviewCollection,
        where('restaurantId', '==', restaurantIds.docId),
      );
      const reviewQuerySnapshot = await getDocs(reviewQuery);
      reviewQuerySnapshot.docs.map((document) => {
        const reviewData = document.data();
        tempReviewList.push(reviewData.stars)
      });

      getReviewStar(tempReviewList)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to fetch reviews, ', error);
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const tempList = [];
      const { startDate, endDate } = generateToday();
      endDate.setHours(23, 59, 59, 99);

      const reservationCollection = collection(db, 'reservations');
      const reservationQuery = query(
        reservationCollection,
        and(
          where('restaurantId', '==', restaurantIds.docId),
          where('date', '<', endDate),
          where('date', '>', startDate),
        ),
        orderBy('date')
      );
      const querySnapshot = await getDocs(reservationQuery);

      const reservationPromises = querySnapshot.docs.map(async (document) => {
        const reservationData = document.data();
        const reservationId = document.id;
        const tableRef = doc(db, 'diningTables', reservationData.tableId);
        const tableSnapshot = await getDoc(tableRef);
        const tableData = tableSnapshot.data();

        const userRef = doc(db, 'users', reservationData.userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        const timeSlotRef = doc(db, 'timeSlots', reservationData.timeSlotId);
        const timeSlotSnapshot = await getDoc(timeSlotRef);
        const timeSlotData = timeSlotSnapshot.data();
        // Convert firebase timestamp to js timestamp
        const date = reservationData.date.toDate();

        const formattedData = {
          reservationId,
          userId: reservationData.userId,
          numberOfGuests: reservationData.numberOfGuests,
          customerName: userData.name,
          tableId: reservationData.tableId,
          tableNumber: tableData.tableNumber,
          time: timeSlotData.startTime,
          status: reservationData.status,
          date: date,
          email: userData.email
        };

        tempList.push(formattedData);
      });
      await Promise.all(reservationPromises);

      setReservationList(tempList);
      setTableData(tempList);
      getArrivedData(tempList);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to fetch history, ', error);
    }
  };

  const updateReservation = (reservationId, updatedData) => {
    // updatedData = {tableId: 1, numberofGuest: 4, status: 'Confirmed', ...}
    const tableDataCopy = tableData.map((item) => {
      if (item.reservationId == reservationId) {
        return updatedData;
      }
      return item;
    })
    setTableData(tableDataCopy)
  }

  if (isLoading) {
    return (
      <Sidebar>
        <SplashScreen />
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <Box display='flex' flexDirection='column' gap={4} width='100%' mx={8}>
        <Grid container spacing={3} marginTop={0.5}>
          <Grid item xs={12} sm={6} md={4}>
            <HomepageCard
              data={reservationList.length}
              title="Total Reservation"
              icon='/Reservation.png' />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HomepageCard
              data={arrivedData}
              title="Total Arrived"
              icon='/Arrive.png' />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HomepageCard
              data={reviewStars}
              title="Avg Review Stars"
              icon='/Review.png' />
          </Grid>
        </Grid>

        <Typography variant='h5'>
          Today Reservations
        </Typography>

        <Paper>
          <Grid
            container
            spacing={2}
            alignItems='center'
            padding={2}
            justifyContent='space-between'
          >
            <Grid item xs={6}>
              <TextField
                color='secondary'
                fullWidth
                variant='standard'
                placeholder='Hit ENTER to search name, table name, etc.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onInput={(event) => setSearchTerm(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Grid>

            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id='filter' color='secondary'>Filter</InputLabel>
                <Select
                  color='secondary'
                  labelId='filter'
                  id='filter-select'
                  value={filter}
                  label='Filter'
                  onChange={handleSelect}>
                  <MenuItem value='All'>
                    All
                  </MenuItem>
                  <MenuItem value='Completed'>
                    Completed
                  </MenuItem>
                  <MenuItem value='Incomplete'>
                    Incomplete
                  </MenuItem>
                  <MenuItem value='Cancelled'>
                    Cancelled
                  </MenuItem>
                  <MenuItem value='Newest to Oldest'>
                    Newest to Oldest
                  </MenuItem>
                  <MenuItem value='Oldest to Newest'>
                    Oldest to Newest
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>TABLE</TableCell>
                <TableCell>TIME</TableCell>
                <TableCell align='center' >STATUS</TableCell>
                <TableCell align='center'>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 && tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.tableNumber}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell style={{ width: '12%' }}>
                    <StatusText 
                      text={row.status} 
                      type={
                        row.status === 'Completed' ? 'success' : 
                        row.status === 'Incomplete' ? 'warning' : 
                        'error'
                      } 
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <HomepageEditModal data={row} tableData={tableIdList} updateUI={updateReservation}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Sidebar>
  );
}
