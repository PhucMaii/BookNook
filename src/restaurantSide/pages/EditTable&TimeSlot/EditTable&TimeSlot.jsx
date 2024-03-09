import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TableOverview from '../../components/TableOverview';
import TableList from '../../components/TableList';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoxStyled } from './styled';
import { daysOfWeek } from '../../../utils/constants';
import { generateTimeSlots } from '../../../utils/time';
import { addDoc, collection, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { SplashScreen } from '../../../lib/utils';
import { fetchData, fetchDoc } from '../../../utils/firebase';
import AddTableModal from '../../components/Modals/AddTableModal';
import { db } from '../../../../firebaseConfig';
import Notification from '../../components/Notification';
import ProtectedRoute from '../../context/ProtectedRoute';
import { lightSecondary } from '../../../theme/colors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditTableTimeSlot() {
  const [availableTables, setAvailableTables] = useState([]);
  const [availableTime, setAvailableTime] = useState({
    openTime: '',
    closeTime: ''
  });
  const [closedDays, setClosedDays] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAddTable, setIsOpenAddTable] = useState(false);
  const [notification, setNotification] = useState({});
  const [tableList, setTableList] = useState([]);
  const [tempTableList, setTempTableList] = useState([]);

  const [searchKeywords, setSearchKeywords] = useState('');
  const [unavailableTables, setUnavailableTables] = useState([]);
  const { restaurantIds } = useContext(AuthContext);

  useEffect(() => {
    if (restaurantIds.docId) {
      fetchTables();
      fetchClosedDays();
      fetchRestaurantTimes();
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
  }, [searchKeywords]);

  const fetchClosedDays = async () => {
    try {   
      const closedDaysData = await fetchData('closedDays', where('restaurantId', '==', restaurantIds.docId));
      const restaurantClosedDays = closedDaysData[0];
      setClosedDays(restaurantClosedDays.closedDays);
    } catch (error) {
      console.log('Fail to fetch closed days: ', error);
    }
  }

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

  const fetchRestaurantTimes = async () => {
    try {
      const restaurant = await fetchDoc('restaurants', restaurantIds.docId);
      setAvailableTime({
        openTime: restaurant.docData.openTime,
        closeTime: restaurant.docData.closeTime,
      })
      setIsLoading(false);
    } catch (error) {
      console.log('Fail to fetch restaurant times: ', error);
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

  const handleAddTable = async (data) => {
    // check is table valid to be added
    const isTableNumberExisted = tableList.find((table) => table.tableNumber === data.tableNumber);
    if (isTableNumberExisted) {
      setNotification({
        on: true,
        severity: 'error',
        message: 'Table Number Existed Already'
      })
      return;
    }

    try {
      const submittedData = { ...data, restaurantId: restaurantIds.docId };
      const tableCollection = collection(db, 'diningTables');
      await addDoc(tableCollection, submittedData);

      const newTableList = [...tableList, submittedData];
      handleUpdateTableUI(newTableList);

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

  const handleDeleteTable = async (tableId) => {
    try {
      const { docRef } = await fetchDoc('diningTables', tableId);
      await deleteDoc(docRef);

      const newTableList = tableList.filter((table) => {
        return table.id !== tableId
      })

      handleUpdateTableUI(newTableList);
      setNotification({
        on: true,
        severity: 'success',
        message: 'Remove table successfully'
      })
    } catch (error) {
      console.log('Fail to delete table: ', error);
    }
  }

  const handleUpdateTable = async (docId, data) => {
    try {
      const { docRef } = await fetchDoc('diningTables', docId);
      await updateDoc(docRef, data);

      const newTableList = tableList.map((table) => {
        if (table.id === docId) {
          return data;
        }
        return table;
      })

      handleUpdateTableUI(newTableList);
    } catch (error) {
      console.log('Fail to update table: ', error)
    }
  }

  const handleUpdateTableUI = (newTableList) => {
    setTableList(newTableList);
    setTempTableList(newTableList);
    filterTablesByStatus(newTableList, true);
    filterTablesByStatus(newTableList, false);
  }

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

  const handleUpdateTime = async (time) => {
    try {
      const restaurantRef = await fetchDoc('restaurants', restaurantIds.docId)
      await updateDoc(restaurantRef.docRef, time);
      setAvailableTime(time);
    } catch(error) {
      console.log('Fail to update time: ', error);
    }
  }

  const handleUpdateUnavailableDays = async (e) => {
    try {
      const selectedDays = e.target.value;
      const newClosedDays = typeof selectedDays === 'string' ? selectedDays.split(',') : selectedDays;
      
      setClosedDays(newClosedDays);

      const restaurantClosedDays = await fetchData('closedDays', where('restaurantId', '==', restaurantIds.docId));
      const restaurantClosedDaysDoc = await fetchDoc('closedDays', restaurantClosedDays[0].id);
      await updateDoc(restaurantClosedDaysDoc.docRef, {closedDays: newClosedDays});
      } catch (error) {
      console.log('Fail to update unavailable days: ', error);
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
            handleAddTable={handleAddTable}
            open={isOpenAddTable}
            onClose={() => setIsOpenAddTable(false)}
          />
          <BoxStyled
            display="flex"
            flexDirection="column"
            gap={2}
            p={2}
            width="100%"
          >
            <Typography variant='h5' fontWeight='bold'>Edit Time</Typography>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={5.8}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='timeSelectLabel'>Opening</InputLabel>
                  <Select
                    color='secondary'
                    labelId='timeSelectLabel'
                    value={availableTime.openTime}
                    label='startTime'
                    onChange={(e) => {
                      const time = { ...availableTime, openTime: e.target.value };
                      handleUpdateTime(time);
                    }}
                  >
                    {generateTimeSlots().map((item, index) =>
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          '&.Mui-selected:hover, &.Mui-selected ': {
                            backgroundColor: lightSecondary,
                          },
                        }}>{item}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={0.4} textAlign="center">
                <Typography variant='h6' fontWeight='bold'>-</Typography>
              </Grid>
              <Grid item xs={5.8}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='timeSelectLabel'>Closing</InputLabel>
                  <Select
                    color='secondary'
                    labelId='timeSelectLabel'
                    value={availableTime.closeTime}
                    label='startTime'
                    onChange={(e) => {
                      const time = { ...availableTime, closeTime: e.target.value };
                      handleUpdateTime(time);
                    }}
                  >
                    {generateTimeSlots().map((item, index) =>
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          '&.Mui-selected:hover, &.Mui-selected ': {
                            backgroundColor: lightSecondary,
                          },
                        }}
                      >
                        {item}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h5" fontWeight="bold">
              Select Unavailable Days
            </Typography>
            <FormControl color="secondary" sx={{ m: 1 }}>
              <InputLabel id="demo-multiple-checkbox-label">Days</InputLabel>
              <Select
                color="secondary"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={closedDays}
                onChange={handleUpdateUnavailableDays}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem
                    key={day}
                    value={day}
                    sx={{
                      '&.Mui-selected:hover, &.Mui-selected ': {
                        backgroundColor: lightSecondary,
                      },
                    }}
                  >
                    <Checkbox color="secondary" checked={closedDays.indexOf(day) > -1} />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </BoxStyled>
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
              <Grid item md={8} xs={6}>
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
              handleDeleteTable={handleDeleteTable}
              handleUpdateTable={handleUpdateTable}
              setNotification={setNotification}
              tableList={tempTableList}
            />
          </BoxStyled>
        </Box>
      </Sidebar>

    </ProtectedRoute>
  );
}
