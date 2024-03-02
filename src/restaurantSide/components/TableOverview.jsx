import React from 'react';
import PropTypes from 'prop-types';
import TableBarIcon from '@mui/icons-material/TableBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { error, success, warning } from '../../theme/colors';

export default function TableOverview({
    numberOfAvailable,
    numberOfUnavailable,
    numberOfTotal
}) {
  return (
    <Paper sx={{
        width: '100%', 
        m: 2, 
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        p: 2
    }}>
        <Grid container rowGap={2} p={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} textAlign="center">
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <CheckCircleIcon sx={{fontSize: 50, color: success}} />
                    <Box>
                        <Typography variant="h4" color={success}>{numberOfAvailable}</Typography>
                        <Typography color="success">Available</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <CancelIcon sx={{fontSize: 50, color: error}} />
                    <Box>
                        <Typography variant="h4" color={error}>{numberOfUnavailable}</Typography>
                        <Typography color="success">Unavailable</Typography>
                    </Box>
                </Box>
                </Grid>
            <Grid item xs={12} md={4} textAlign="center">
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <TableBarIcon sx={{fontSize: 50, color: warning}} />
                    <Box>
                        <Typography variant="h4" color={warning}>{numberOfTotal}</Typography>
                        <Typography color="success">Total</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Paper>
  )
}

TableOverview.propTypes = {
    numberOfAvailable: PropTypes.number,
    numberOfUnavailable: PropTypes.number,
    numberOfTotal: PropTypes.number
}