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
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    setFilter(value);
    handleClose();
  };

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

        <Typography  variant='h5'>
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
              <Button
                style={{ color: '#64748B' }}
                startIcon={<FilterAltOutlinedIcon />}
                aria-controls='filter-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                {filter || 'Filter'}
              </Button>
              <Menu
                id='filter-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleSelect('seated')}>
                  Seated
                </MenuItem>
                <MenuItem onClick={() => handleSelect('confirmed')}>
                  Confirmed
                </MenuItem>
                <MenuItem onClick={() => handleSelect('unseated')}>
                  Unconfirmed
                </MenuItem>
                <MenuItem onClick={() => handleSelect('1')}>
                  Newest to Oldest
                </MenuItem>
                <MenuItem onClick={() => handleSelect('2')}>
                  Oldest to Newest
                </MenuItem>
                <MenuItem onClick={() => handleSelect('3d')}>A to Z</MenuItem>
                <MenuItem onClick={() => handleSelect('u4ated')}>
                  Z to A
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>

          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>TABLE</TableCell>
                <TableCell>TIME</TableCell>
                <TableCell style={{textAlign:'center'}}>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent.map((row) => (
                <TableRow key={row.customerName}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.tableName}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell style={{width:'20%'}}> 
                    <StatusText text={row.status} type={row.status === 'seated' ? 'success' : row.status === 'Confirmed' ? 'warning' : 'error'}/>
                  </TableCell>
                  <TableCell>
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
