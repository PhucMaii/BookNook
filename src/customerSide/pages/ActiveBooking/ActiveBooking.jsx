import React, { useState, useEffect } from 'react';
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
    TableBody,
    Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TopHeader from '../../components/TopNavbar/CustomerHeader';
import dayjs from 'dayjs';
import StatusText from '../../../restaurantSide/components/StatusText/StatusText';

export default function ActiveBooking() {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState([]);
    const [date] = useState(dayjs());
    const [time] = useState(dayjs());

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const handleSearch = (word) => {
        const filteredItems = userInfo.filter(item =>
            item.customerName.toLowerCase().includes(word.toLowerCase()) ||
            item.seatingCap.toString().includes(word.toLowerCase()) ||
            dayjs(item.bookingDate).format('YYYY-MM-DD').includes(word.toLowerCase()) ||
            dayjs(item.bookingTime).format('HH:mm').includes(word.toLowerCase())
        );
        setTableData(filteredItems)
    }

    const handleSelect = (e) => {
        setFilter(e.target.value)
    }

    const options = [
        { label: 'All', value: 'All' },
        { label: 'Confirmed Status', value: 'Confirmed' },
        { label: 'Unconfirmed Status', value: 'Unconfirmed' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    const userInfo = [
        {
            id: 1,
            customerName: 'John Doe',
            seatingCap: 2,
            bookingDate: date,
            bookingTime: time,
            bookingStatus: 'Unconfirmed'
        },
        {
            id: 2,
            customerName: 'Jane Doe',
            seatingCap: 5,
            bookingDate: date,
            bookingTime: time,
            bookingStatus: 'Confirmed'
        },
        {
            id: 3,
            customerName: 'Alice',
            seatingCap: 3,
            bookingDate: date,
            bookingTime: time,
            bookingStatus: 'Unconfirmed'
        },
        {
            id: 4,
            customerName: 'Bob',
            seatingCap: 4,
            bookingDate: date,
            bookingTime: time,
            bookingStatus: 'Confirmed'
        },
    ];

    useEffect(() => {
        setTableData(userInfo);
    }, []);

    return (
        <>
            <TopHeader />
            <Typography
                variant='h2'
                fontWeight='bold'
                textAlign='center'
                mt={4}
            >
                Active Booking
            </Typography>
            <Box
                display='flex'
                justifyContent='center'
            >
                <Paper
                    sx={{
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        borderRadius: 2,
                        mt: 5,
                        width: '80%'
                    }}>
                    <Grid
                        container
                        spacing={2}
                        alignItems='center'
                        padding={2}
                        justifyContent='space-between'
                    >
                        <Grid item xs={6}>
                            <TextField
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
                                <InputLabel id='filter'>Filter</InputLabel>
                                <Select
                                    labelId='filter'
                                    id='filter-select'
                                    value={filter}
                                    label='Filter'
                                    onChange={handleSelect}>
                                    {options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CUSTOMER</TableCell>
                                <TableCell>SEATING CAPACITY</TableCell>
                                <TableCell>DATE</TableCell>
                                <TableCell>TIME</TableCell>
                                <TableCell>STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 && tableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.customerName}</TableCell>
                                    <TableCell>{row.seatingCap}</TableCell>
                                    <TableCell>{dayjs(row.bookingDate).format('MM-DD-YYYY')}</TableCell>
                                    <TableCell>{dayjs(row.bookingTime).format('h:mm A')}</TableCell>
                                    <TableCell style={{ textAlign: 'center', paddingRight: 0 }}>
                                        <StatusText text={row.bookingStatus} type={row.bookingStatus === 'Unconfirmed' ? 'error' : 'success'} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </>
    )
}