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
  Button,
  InputAdornment,
  MenuItem,
  Menu,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import HomepageCard from '../components/HomepageCard/HomepageCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { blueGrey } from '../../theme/colors';
import { cardContent, tableContent } from '../utils/constants';
import StatusText from '../components/StatusText/StatusText';

export default function HomePage() {

  const [filter, setFilter] = useState('');

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }


  return (
    <Sidebar>
      <Box display='flex' flexDirection='column' gap={4} width='100%' mx={8}>
        <Grid container spacing={3} marginTop={0.5}>
          {cardContent.map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <HomepageCard
                data={card.data}
                title={card.title}
                icon={card.img}
              />
            </Grid>
          ))}
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
                placeholder='Search name, table name, etc.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
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
                  <MenuItem value='Seated'>
                    Seated
                  </MenuItem>
                  <MenuItem value='Confirmed'>
                    Confirmed
                  </MenuItem>
                  <MenuItem value='Unconfirmed'>
                    Unconfirmed
                  </MenuItem>
                  <MenuItem value='Newest to Oldest'>
                    Newest to Oldest
                  </MenuItem>
                  <MenuItem value='Oldest to Newest'>
                    Oldest to Newest
                  </MenuItem>
                  <MenuItem value='A to Z'>
                    A to Z
                  </MenuItem>
                  <MenuItem value='Z to A'>
                    Z to A
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
              {tableContent.map((row) => (
                <TableRow key={row.customerName}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.tableName}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell style={{ width: '12%' }}>
                    <StatusText text={row.status} type={row.status === 'seated' ? 'success' : row.status === 'Confirmed' ? 'warning' : 'error'} />
                  </TableCell>
                  <TableCell align='center'>
                    <Button variant="filled" style={{ color: '#64748B', backgroundColor: blueGrey }}>
                      EDIT
                    </Button>
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
