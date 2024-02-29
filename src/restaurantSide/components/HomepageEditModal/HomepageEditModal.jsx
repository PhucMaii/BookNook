import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blueGrey } from '../../../theme/colors';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { guestSelect } from '../../../utils/constants';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import PropTypes from 'prop-types';
import { generateTimeSlots } from '../../../utils/time';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const HomepageEditModal = ({ data, tableData, updateUI}) => {
  const [open, setOpen] = useState(false);
  const [tableId, setTableId] = useState(data.tableId);
  const [date, setDate] = useState(dayjs(data.date));
  const [time, setTime] = useState(data.time);
  const [guestNumber, setGuestNumber] = useState(data.numberOfGuests);
  const [status, setStatus] = useState(data.status);

  // setUpdatedData({...updatedData, date: value})
  const [updatedData, setUpdatedData] = useState({
    tableId: null,
    date: null,
    time: null,
    numberOfGuests: null,
    status: null
  });
  // const [phoneNumber, setPhoneNumber] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveEdit = () => {
    const reservationRef = doc(db, 'reservations', data.reservationId);

    const submittedData = {};
    Object.keys(updatedData).map((key) => {
      if (updatedData[key]) {
        submittedData[key] = updatedData[key]; 
      }
    });

    console.log(submittedData, 'submittedData');

    updateDoc(reservationRef, submittedData)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      })

      const targetTable = tableData.find((table) => table.tableId === tableId);
      const updatedUIData = {
        ...data,
        ...submittedData,
        tableNumber: targetTable.tableNumber,
      };

      updateUI(data.reservationId, updatedUIData);
      console.log(updatedUIData, 'updatedUIData' );

  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant='filled'
        style={{ color: '#64748B', backgroundColor: blueGrey }}
      >
        EDIT
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container justifyContent={'space-between'} mb={'10px'}>
              <Grid item xs={10}>
                <Typography fontWeight={'bold'} variant='h4'>Edit Reservation</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  saveEdit();
                  handleClose();
                }}>SAVE</Button>
              </Grid>
            </Grid>

            <Divider />

            <Grid container justifyContent={'space-between'} spacing={1} mt={'auto'} alignItems={'center'}>
              <Grid item xs={12}>
                <Typography variant='h6' fontWeight={'bold'}>Reservation Details</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Table Number:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='tableSelectLabel'>Table Number</InputLabel>
                  <Select
                    color='secondary'
                    labelId='tableSelectLabel'
                    value={tableId}
                    label='Table Number'
                    onChange={(e) => {
                      setTableId(e.target.value)
                      setUpdatedData({...updatedData, tableId: e.target.value})
                    }}
                  >
                    {tableData && tableData.map((item, index) =>
                      <MenuItem key={index} value={item.tableId}>{item.tableNumber}</MenuItem>
                    )
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>Reservation Date:</Typography>
              </Grid>
              <Grid item xs={6} color={'secondary'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="datePicker"
                    value={date}
                    onChange={(newValue) => {
                      // Converting Dayjs date object to a JavaScript Date object
                      const jsDate = newValue.toDate();
                      console.log(jsDate)
                      // Update the state with the new selected date
                      setDate(jsDate);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Typography>Reservation Time:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='timeSelectLabel'>Time</InputLabel>
                  <Select
                    color='secondary'
                    labelId='timeSelectLabel'
                    value={time}
                    label='Time'
                    onChange={(e) => {
                      setTime(e.target.value)
                      setUpdatedData({...updatedData, time: e.target.value})
                    }}
                  >
                    {generateTimeSlots().map((item, index) =>
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>Guest Number:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='guestSelectLabel'>No. Guests</InputLabel>
                  <Select
                    color='secondary'
                    labelId='guestSelectLabel'
                    value={guestNumber}
                    label='No. Guests'
                    onChange={(e) => {
                      setGuestNumber(e.target.value) 
                      setUpdatedData({...updatedData, numberOfGuests: e.target.value})
                    }}
                  >
                    {guestSelect.map((item, index) =>
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel color='secondary' id='statusSelectLabel'>Status</InputLabel>
                  <Select
                    color='secondary'
                    labelId='statusSelectLabel'
                    value={status}
                    label='Status'
                    onChange={(e) => {
                      setStatus(e.target.value)
                      setUpdatedData({...updatedData, status: e.target.value})}}
                  >
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                    <MenuItem value={'Incomplete'}>Incomplete</MenuItem>
                    <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Divider />

              <Grid container justifyContent={'space-between'} spacing={1} mt={'auto'} alignItems={'center'}>
                <Grid item xs={12}>
                  <Typography variant='h6' fontWeight={'bold'}>Client Details</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Client Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{data.customerName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{data.email}</Typography>
                </Grid>

                {/* TODO: When data is updated with user phoneNumber. */}
                {/* <Grid item xs={6}>
                  <Typography>Phone Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth color='secondary' label={'Phone Number'} onChange={updatePhoneNumber}>123{phoneNumber}</TextField>
                </Grid> */}


              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

HomepageEditModal.propTypes = {
  data: PropTypes.object,
  tableData: PropTypes.array,
  updateUI: PropTypes.func
}