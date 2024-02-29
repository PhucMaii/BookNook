import React, { Fragment, useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TableOverview from '../../components/TableOverview';
import TableList from '../../components/TableList';
import { 
  Box, 
  Button, 
  Chip, 
  Divider, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoxStyled } from './styled';
import { daysOfWeek } from '../../../utils/constants';
import { secondary } from '../../../theme/colors';
import { convertHourToMinutes, generateTimeSlots } from '../../../utils/time';
import DayTimeSlot from '../../components/DayTimeSlot';
import { addDoc, collection, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { SplashScreen } from '../../../lib/utils';
import { fetchData, fetchDoc } from '../../../utils/firebase';
import AddTableModal from '../../components/Modals/AddTableModal';
import { db } from '../../../../firebaseConfig';
import Notification from '../../components/Notification';
import { LoadingButton } from '@mui/lab';
import ProtectedRoute from '../../context/ProtectedRoute';

export default function EditTableTimeSlot() {
  const [availableTables, setAvailableTables] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  const [isAddTimeSlotLoading, setIsAddTimeSlotLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAddTable, setIsOpenAddTable] = useState(false);
  const [notification, setNotification] = useState({});
  const [tableList, setTableList] = useState([]);
  const [tempTableList, setTempTableList] = useState([]);
  const [timeSlotList, _setTimeSlotList] = useState(generateTimeSlots());
  const [timeSlot, setTimeSlot] = useState('9:00 AM');
  const [restaurantTimeSlots, setRestaurantTimeSlots] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [unavailableTables, setUnavailableTables] = useState([]);
  const { restaurantIds } = useContext(AuthContext);

  useEffect(() => {
    if (restaurantIds) {
      fetchTables();
      fetchTimeSlots();
    }
  }, [restaurantIds]);

  useEffect(() => {
    if (filterOption) {
      if (filterOption === 'all') {
        setTempTableList(tableList);
      }

      if (filterOption === 'available') {
        setTempTableList(availableTables);
      }

      if (filterOption === 'unavailable') {
        setTempTableList(unavailableTables);
      }

      if (filterOption === 'type') {
        sortTableList();
      }
    }
  }, [filterOption]);

  useEffect(() => {
    // Search on all values
    const newTableList = tableList.filter((table) => {
      return Object.values(table).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchKeywords.toLowerCase())) 
      || Object.values(table).some((value) => {
          return typeof value === 'number' && value === parseInt(searchKeywords);
        })
      })

    setTempTableList(newTableList);
  }, [searchKeywords])

  const filterTablesByStatus = (tables, isAvailable) => {
    const newTableList = tables.filter((table) => {
      return isAvailable ? table.isAvailable : !table.isAvailable; 
    });

    if (isAvailable) {
      setAvailableTables(newTableList);
    } else {
      setUnavailableTables(newTableList);
    }
  }

  const fetchTables = async () => {
    try {
      const data = await fetchData(
        'diningTables',
        where('restaurantId', '==', restaurantIds.docId)
      );

      const sortedData = data.sort((tableA, tableB) => tableA.tableNumber - tableB.tableNumber);

      setTableList(sortedData);
      setTempTableList(sortedData);
      filterTablesByStatus(sortedData, true);
      filterTablesByStatus(sortedData, false);
    } catch (error) {
      console.log(error, 'Fail to fetch tables');
      setIsLoading(false);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const data = await fetchData(
        'timeSlots',
        where('restaurantId', '==', restaurantIds.docId)
      );

      const sortedData = data.sort(
        (a, b) =>
          convertHourToMinutes(a.startTime) - convertHourToMinutes(b.startTime)
      );

      const formattedData = {};
      for (let day of daysOfWeek) {
        formattedData[day] = [];
      }

      for (let timeSlot of sortedData) {
        // Get the first 3 char in day, ex: Mon, Tue, etc
        formattedData[timeSlot.day.slice(0, 3)] = [
          ...formattedData[timeSlot.day.slice(0, 3)],
          timeSlot,
        ];
      }

      setRestaurantTimeSlots(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.log('Fail to fetch time slots: ', error);
      setIsLoading(false);
    }
  }

  const handleAddTable = async (data) => {
    try {
      const tableCollection = collection(db, 'diningTables');
      await addDoc(tableCollection, {...data, restaurantId: restaurantIds.docId});

      setNotification({
        on: true,
        severity: 'success',
        message: 'Add Table Successfully'
      })
    } catch (error) {
      console.log('Fail to add table: ', error);
      setNotification({
        on: true,
        severity: 'error',
        message: 'Fail to add table: ' + error
      })
    }
  }

  const handleAddTimeSlot = async () => {
    setIsAddTimeSlotLoading(true);
    try {
      const timeSlotCollection = collection(db, 'timeSlots');

      for (const day of selectedDays) {
        const submittedData = {
          startTime: timeSlot,
          day,
          isAvailable: true,
          restaurantId: restaurantIds.docId,
        };
        await addDoc(timeSlotCollection, submittedData);
      }

      await fetchTimeSlots();

      setNotification({
        on: true,
        severity: 'success',
        message: 'Add Time Slot Successfully'
      });
      setIsAddTimeSlotLoading(false);

    } catch (error) {
      console.log('Fail to add time slot: ', error);
      setIsAddTimeSlotLoading(false);
    }
  }

  const handleDeleteTimeSlot = async (timeSlotId) => {
    try {
      const { docRef } = await fetchDoc('timeSlots', timeSlotId);
      await deleteDoc(docRef);
      await fetchTimeSlots();

      setNotification({
        on: true,
        severity: 'success',
        message: 'Delete Time Slot Successfully'
      });
    } catch (error) {
      console.log('Fail to delete time slot: ', error);
    }
  }

  const handleUpdateTable = async (docId, data) => {
    try {
      const { docRef } = await fetchDoc('diningTables', docId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.log('Fail to update table: ', error)
    }
  }

  const handleUpdateTableUI = (targetTable) => {
    const newTableList = tableList.map((table) => {
      if (targetTable.id === table.id) {
        return targetTable;
      }
      return table;
    })

    setTableList(newTableList);
    setTempTableList(newTableList);
    filterTablesByStatus(newTableList, true);
    filterTablesByStatus(newTableList, false);
  }

  const handleAddSelectedDays = (targetDay) => {
    setSelectedDays(prevSelectedDays => {
      if (!prevSelectedDays.includes(targetDay)) {
        return [...prevSelectedDays, targetDay];
      } else {
        return prevSelectedDays.filter(day => day !== targetDay);
      }
    });
  };

  const sortTableList = () => {
    if (filterOption === 'type') {
      const newTableList = tableList.sort((tableA, tableB) => {
        if (tableA.type < tableB.type) {
          return -1;
        }

        if (tableA.type > tableB.type) {
          return 1;
        }

        return 0;
      });
      setTempTableList(newTableList);
      return;
    }
  }

  if (isLoading) {
    return (
      <Sidebar>
        <SplashScreen />
      </Sidebar>
    )
  }

  return (
    <ProtectedRoute>
      <Sidebar>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          width="100%"
          mx={4}
        >
          <Notification
            notification={notification}
            onClose={() => setNotification({ ...notification, on: false })}
          />
          <AddTableModal
            fetchTables={fetchTables}
            handleAddTable={handleAddTable}
            open={isOpenAddTable}
            onClose={() => setIsOpenAddTable(false)}
          />
          <TableOverview
            numberOfAvailable={availableTables.length}
            numberOfUnavailable={unavailableTables.length}
            numberOfTotal={tableList.length}
          />
          <BoxStyled
            display="flex"
            flexDirection="column"
            gap={2}
            p={2}
            width="100%"
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={8}>
                <TextField
                  color="secondary"
                  placeholder="Search by table number or type"
                  fullWidth
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl color="secondary" fullWidth>
                  <InputLabel id="filter">Filter</InputLabel>
                  <Select
                    labelId="filter"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    label="Filter"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="available">Status: Available</MenuItem>
                    <MenuItem value="unavailable">Status: Unavailable</MenuItem>
                    <MenuItem value="type">Type</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <Button
                  color="secondary"
                  fullWidth
                  onClick={() => setIsOpenAddTable(true)}
                  variant="contained"
                  sx={{ height: '100%' }}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
            <TableList
              handleUpdateTable={handleUpdateTable}
              setNotification={setNotification}
              tableList={tempTableList}
              handleUpdateUI={handleUpdateTableUI}
            />
          </BoxStyled>
          <BoxStyled
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            p={2}
            mt={2}
          >
            <Typography variant="h6">Time Slots</Typography>
            <FormControl id="time-slot-label">
              <Select
                labelId="time-slot-label"
                color="secondary"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                {timeSlotList &&
                  timeSlotList.map((timeSlot, index) => {
                    return (
                      <MenuItem color="secondary" key={index} value={timeSlot}>
                        {timeSlot}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="subtitle1">
                Select days of the week you want to add time slot
              </Typography>
              <Box display="flex" gap={2} width="100%">
                {daysOfWeek &&
                  daysOfWeek.map((day, index) => {
                    return (
                      <Chip
                        color="secondary"
                        onClick={() => handleAddSelectedDays(day)}
                        key={index}
                        label={day}
                        variant="outlined"
                        sx={{
                          width: '100%',
                          backgroundColor: selectedDays.includes(day)
                            ? secondary
                            : '',
                          color: selectedDays.includes(day) ? 'white' : '',
                        }}
                      />
                    );
                  })}
              </Box>
            </Box>
            <LoadingButton
              loading={isAddTimeSlotLoading}
              loadingIndicator="Adding..."
              color="secondary"
              fullWidth
              onClick={handleAddTimeSlot}
              variant="contained"
            >
              Add
            </LoadingButton>
            <Box display="flex" width="100%">
              {daysOfWeek &&
                daysOfWeek.map((day, index) => {
                  return (
                    <Fragment key={index}>
                      <DayTimeSlot
                        day={day}
                        timeSlots={restaurantTimeSlots[day]}
                        onDelete={handleDeleteTimeSlot}
                      />
                      <Divider component="div" orientation="vertical" />
                    </Fragment>
                  );
                })}
            </Box>
          </BoxStyled>
        </Box>
      </Sidebar>

    </ProtectedRoute>
  );
}
