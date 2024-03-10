import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

export const SplashScreen = ({color}) => (
    <Box 
        display="flex" 
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
    >
        <CircularProgress color={color}/>
    </Box>
)

SplashScreen.propTypes = {
    color: PropTypes.string
}
