import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import HistoryOverview from '../components/HistoryOverview/HistoryOverview';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryAccordion from '../components/HistoryAccordion/HistoryAccordion';
import { AuthContext } from '../context/AuthContext';
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { SplashScreen } from '../../lib/utils';
import { convertTimestampToDate } from '../utils/time';

export default function HistoryPage() {
  const [dateRange, setDateRange] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [tempHistoryList, setTempHistoryList] = useState([]);
  const [overviewTab, setOverviewTab] = useState('');
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (overviewTab) {
      filterByStatus()
    }
  }, [overviewTab])

  useEffect(() => {
    if (dateRange) {
      generateDateRange();
    }
  }, [dateRange])

  const filterByStatus = () => {
    const newList = historyList.filter((reservation) => {
      if (overviewTab === 'none') {
        return reservation;
      } else {
        return reservation.Status === overviewTab
      }
    })

    setTempHistoryList(newList);
  }

  const generateDateRange = () => {
    let startDate;
    if (dateRange === 'Today') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    } else if (dateRange === 'Last 3 days') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 3);
      startDate.setHours(0, 0, 0, 0);
    } else if (dateRange === 'Last week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else if (dateRange === 'Last month') {
      startDate = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(startDate.getMonth() - 1);

      // Handle cases where day might be different in the last month
      if (startDate.getDate() !== lastMonth.getDate()) {
        lastMonth.setDate(0);
      }

      startDate = lastMonth;
      startDate.setDate(startDate.getDate() - 3);
      startDate.setHours(0, 0, 0, 0);
    }
    const endDate = new Date();
    const currentHours = endDate.getHours();
    const currentMinutes = endDate.getMinutes();
    const currentSeconds = endDate.getSeconds();
    endDate.setHours(currentHours, currentMinutes, currentSeconds);

    // const newList = historyList.filter((reservation) => {
    //   console.log(reservation);

    // });

      // return date.isAfter(startDate) && date.isBefore(endDate);
      // setTempHistoryList(newList);
      return { startDate, endDate };
  }



  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const tempList = [];

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date();
      const currentHours = endDate.getHours();
      const currentMinutes = endDate.getMinutes();
      const currentSeconds = endDate.getSeconds();
      endDate.setHours(currentHours, currentMinutes, currentSeconds);

      const reservationCollection = collection(db, 'reservations');
      const historyQuery = query(
        reservationCollection,
        and (
          where('restaurantId', '==', uid),
          where('date', '>=', startDate),
          where('date', '<=', endDate),
          where('status', 'in', ['Completed', 'Cancelled'])
        )
      );
      const querySnapshot = await getDocs(historyQuery);
      querySnapshot.forEach(async (document) => {
        const id = document.id;
        const reservationData = document.data();
        const tableRef = doc(db, 'diningTables', reservationData.tableId);
        const tableSnapshot = await getDoc(tableRef);
        const tableData = tableSnapshot.data();

        const userRef = doc(db, 'users', reservationData.userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        // Convert firebase timestamp to js timestamp
        const date = reservationData.date.toDate();

        const formattedData = {
          ['Booking Id']: id,
          ['Booked Time']: date,
          ['Table Number']: tableData.tableNumber,
          ['Customer Name']: userData.name,
          ['Number of Guests']: tableData.capacity,
          ['Status']: reservationData.status,
        };

        tempList.push(formattedData);
      });

      setHistoryList(tempList);
      setTempHistoryList(tempList);

      // Wait until the list is loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch (error) {
      setIsLoading(false);
      console.log('Fail to fetch history, ', error);
    }
  };

  if (isLoading) {
    return (
      <Sidebar>
        <SplashScreen />
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <Box display='flex' flexDirection='column' gap={4} width='100%' mx={4}>
        <Typography variant='h4' mt={4} fontWeight='bold'>
          BOOKING HISTORY
        </Typography>
        <Paper
          width='100%'
          sx={{ p: 2, mt: 4, borderRadius: '20px' }}
          elevation={0}
        >
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h5' fontWeight='medium'>
              Overview
            </Typography>
            <Select
              color='secondary'
              onChange={(e) => setDateRange(e.target.value)}
              variant='outlined'
              value={dateRange}
              endIcon={<ArrowForwardIosIcon />}
            >
              <MenuItem value='Today'>Today</MenuItem>
              <MenuItem value='Last 3 days'>Last 3 days</MenuItem>
              <MenuItem value='Last week'>Last week</MenuItem>
              <MenuItem value='Last month'>Last month</MenuItem>
            </Select>
          </Box>
          <Grid container spacing={4} mt={2}>
            <HistoryOverview
              iconImg='/checked.png'
              numberOfReservation={114}
              onClick={() => {
                if (overviewTab !== 'Completed') {
                  setOverviewTab('Completed');
                } else {
                  setOverviewTab('none');
                }
              }}
              status='Completed'
              isCurrentTab={overviewTab}
            />
            <HistoryOverview
              iconImg='/cancel.png'
              numberOfReservation={3}
              onClick={() => {
                if (overviewTab !== 'Cancelled') {
                  setOverviewTab('Cancelled');
                } else {
                  setOverviewTab('none');
                }
              }}
              status='Cancelled'
              isCurrentTab={overviewTab}
            />
          </Grid>
        </Paper>
        {tempHistoryList.length > 0 &&
          tempHistoryList.map((reservation, index) => {
            return <HistoryAccordion key={index} data={reservation} />;
          })}
      </Box>
    </Sidebar>
  );
}