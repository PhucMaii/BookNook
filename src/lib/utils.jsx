import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const SplashScreen = () => (
    <Box 
        display="flex" 
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
    >
        <CircularProgress color="secondary"/>
    </Box>
)