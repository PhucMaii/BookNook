import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import HistoryOverview from '../../components/HistoryOverview/HistoryOverview';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryAccordion from '../../components/HistoryAccordion/HistoryAccordion';

export default function HistoryPage() {
  const [rangeDayAnchor, setRangeDayAnchor] = useState(null);

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
            <Button
              color='secondary'
              variant='outlined'
              onClick={(e) => setRangeDayAnchor(e.currentTarget)}
              endIcon={<ArrowForwardIosIcon />}
            >
              Today
            </Button>
            <Menu
              anchorEl={rangeDayAnchor}
              open={Boolean(rangeDayAnchor)}
              onClose={() => setRangeDayAnchor(null)}
            >
              <MenuItem>Last 3 days</MenuItem>
              <MenuItem>Last week</MenuItem>
              <MenuItem>Last month</MenuItem>
            </Menu>
          </Box>
          <Grid container columnSpacing={4} mt={2}>
            <HistoryOverview
              iconImg='/checked.png'
              numberOfReservation={114}
              status='Completed'
            />
            <HistoryOverview
              iconImg='/cancel.png'
              numberOfReservation={3}
              status='Cancelled'
            />
          </Grid>
        </Paper>
        <HistoryAccordion
          data={{
            ['Booking ID']: '000000',
            ['Booked Time']: '22 Jan 2024, 12:20 PM',
            ['Table Number']: 1,
            ['Customer Name']: 'Jeremy Passion',
            ['Number of Guests']: 2,
            ['Status']: 'Completed',
          }}
        />
        <HistoryAccordion
          data={{
            ['Booking ID']: '000000',
            ['Booked Time']: '22 Jan 2024, 12:20 PM',
            ['Table Number']: 1,
            ['Customer Name']: 'Jeremy Passion',
            ['Number of Guests']: 2,
            ['Status']: 'Cancelled',
          }}
        />
      </Box>
    </Sidebar>
  );
}
