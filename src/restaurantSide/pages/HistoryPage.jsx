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
import HistoryAccordion from '../components/HistoryAccordion/HistoryAccordion';
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
import { generateToday } from '../utils/time';

export default function HistoryPage() {
  const [dateRange, setDateRange] = useState('Today');
  const [isLoading, setIsLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [numberOfCompleted, setNumberOfCompleted] = useState(0);
  const [numberOfCancelled, setNumberOfCancelled] = useState(0);
  const [tempHistoryList, setTempHistoryList] = useState([]);
  const [overviewTab, setOverviewTab] = useState('');
  const { restaurantIds } = useContext(AuthContext);

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
    const tempList = generateDateRange();
    const newList = tempList.filter((reservation) => {
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
    const { endDate } = generateToday();
    
    let completed = 0;
    let cancelled = 0;
    const tempList = historyList.filter((reservation) => {
      if (reservation['Booked Time'] > startDate && reservation['Booked Time'] < endDate) {
        if (reservation['Status'] === 'Completed') {
          completed++;
        } else if (reservation['Status'] === 'Cancelled') {
          cancelled++;
        }
        return reservation;
      }
    }).sort((a, b) => b['Booked Time'] - a['Booked Time']); // Sort latest to oldest

    setNumberOfCompleted(completed);
    setNumberOfCancelled(cancelled);

    setTempHistoryList(tempList);
    return tempList;
  }

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const tempList = [];

      const { startDate, endDate } = generateToday();

      const reservationCollection = collection(db, 'reservations');
      const historyQuery = query(
        reservationCollection,
        and (
          where('restaurantId', '==', restaurantIds.docId),
          where('status', 'in', ['Completed', 'Cancelled'])
        ),
        orderBy('date')
      );
      const querySnapshot = await getDocs(historyQuery);
      const reservationPromises = querySnapshot.docs.map(async (document) => {
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
      // Wait for all the async functions inside a loop to finish
      await Promise.all(reservationPromises);
      setHistoryList(tempList);
      
      let completed = 0;
      let cancelled = 0;

      // Get history reservation for today in the first render
      const filteredTempList = tempList.filter((reservation) => {
        if (reservation['Booked Time'] > startDate && reservation['Booked Time'] < endDate) {
          if (reservation['Status'] === 'Completed') {
            completed++;
          } else if (reservation['Status'] === 'Cancelled') {
            cancelled++;
          }
          return reservation;
        }
      })
      setNumberOfCompleted(completed);
      setNumberOfCancelled(cancelled);

      setTempHistoryList(filteredTempList);      

      // Wait until the list is loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
              numberOfReservation={numberOfCompleted}
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
              numberOfReservation={numberOfCancelled}
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