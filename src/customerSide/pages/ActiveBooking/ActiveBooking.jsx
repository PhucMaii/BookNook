import React, { useState } from 'react';
import {
    Typography,
    Paper,
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TopHeader from '../../components/TopNavbar/CustomerHeader';
// import { formatHoursAndMinutes } from '../../../utils/time';
// import StatusText from '../../../restaurantSide/';

export default function ActiveBooking() {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState([]);
    const [reservationList, setReservationList] = useState([])

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

    const handleSelect = (e) => {
        setFilter(e.target.value)
    }

    const options = [
        { label: 'All', value: 'All' },
        { label: 'Confirmed Status', value: 'Completed' },
        { label: 'Unconfirmed Status', value: 'Incomplete' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    return (
        <>
            <TopHeader />
            <Typography
                variant='h3'
                fontWeight='bold'
                textAlign='center'
                mt={4}
            >
                Active Booking
            </Typography>

            <Paper sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: 2, mt: 5 }}>
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
                                {/* Map over options array */}
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>CUSTOMER</TableCell>
                            <TableCell>SEATING CAPACITY</TableCell>
                            <TableCell>TIME</TableCell>
                            <TableCell align='center' >STATUS</TableCell>
                            <TableCell align='center'>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>1
                        {tableData.length > 0 && tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.tableNumber}</TableCell>
                                <TableCell>{formatHoursAndMinutes(row.date)}</TableCell>
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
                                    <ReservationEditModal data={row} tableData={tableIdList} updateUI={updateReservation} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}