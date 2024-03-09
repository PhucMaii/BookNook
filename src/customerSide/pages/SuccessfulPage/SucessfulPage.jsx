import React from 'react';
import { 
    Box,
    Typography,
    Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessfulPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <CheckCircleIcon color='primary' sx={{ fontSize: '7rem', mb: 3}} />
            <Typography align='center' variant='h2' fontWeight='bold' gutterBottom>
                Your Reservation is booked successfully
            </Typography>
            <Typography align='center' variant='h4' mb={5} gutterBottom>
                Thank you for using our platform
            </Typography>
            <Button
                variant='contained'
                sx={{
                    color: 'white',
                    height: '35px',
                    width: '7%',
                }}
            >
                BACK TO HOME
            </Button>
        </Box>
    );
}
