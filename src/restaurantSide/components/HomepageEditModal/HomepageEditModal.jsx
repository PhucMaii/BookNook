import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blueGrey } from '../../../theme/colors';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { guestSelect, timeSelect } from '../../utils/constants';
import { doc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

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

const saveEdit = () => {
  const reservationRef = doc(db, 'reservations', data.reservationId)
  const userRef = doc(db, 'users', data.userId)

  const tempResObj = {
    date: date,
    numberOfGuests: guestNumber,
    status: stauts,

  }
}

const fetchTableId = async () => {

}

export const HomepageEditModal = ({ data, tableData }) => {
  console.log(data, 'data')
  const [open, setOpen] = useState(false);

  //Store Table ID instaed of Table Number
  
  const [tableNumber, setTableNumber] = useState();
  const [date, setDate] = useState(dayjs(data.date));
  const [time, setTime] = useState(data.time);
  const [guestNumber, setGuestNumber] = useState(data.numberOfGuests);
  const [stauts, setStatus] = useState(data.status);
  const [name, setName] = useState(data.customerName);
  const [email, setEmail] = useState(data.email);
  // const [phoneNumber, setPhoneNumber] = useState();

  const updateTable = (e) => { setTableNumber(e.target.value) }
  const updateTime = (e) => { setTime(e.target.value) }
  const updateGuestNumber = (e) => { setGuestNumber(e.target.value); }
  const updateStatus = (e) => { setStatus(e.target.value); }
  const updateName = (e) => { setName(e.target.value); }
  const updateEmail = (e) => { setEmail(e.target.value); }
  // const updatePhoneNumber = (e) => {setPhoneNumber(e.target.value);}

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(tableNumber, 'number')

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
                <Button variant='contained' color='secondary'>SAVE</Button>
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
                    value={tableNumber}
                    label='Table Number'
                    onChange={(e) => setTableNumber(e.target.value) }
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
                    onChange={(newValue) => setDate(newValue)}
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
                    onChange={updateTime}
                  >
                    {timeSelect.map((item, index) =>
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
                    onChange={updateGuestNumber}
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
                    value={stauts}
                    label='Status'
                    onChange={updateStatus}
                  >
                    <MenuItem value={'Completed'}>Seated</MenuItem>
                    <MenuItem value={'Incomplete'}>Confirmed</MenuItem>
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
                  <TextField fullWidth color='secondary' label={'Client Name'} onChange={updateName} defaultValue={name} />
                </Grid>
                <Grid item xs={6}>
                  <Typography>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth color='secondary' label={'Email'} onChange={updateEmail} defaultValue={email} />
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
