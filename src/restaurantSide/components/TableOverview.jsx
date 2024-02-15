import React from 'react';
import TableBarIcon from '@mui/icons-material/TableBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { error, success, warning } from '../../theme/colors';

export default function TableOverview() {
  return (
    <Paper sx={{width: '100%', m: 4}}>
        <Grid container p={4}>
            <Grid item xs={4}>
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <CheckCircleIcon sx={{fontSize: 50, color: success}} />
                    <Box>
                        <Typography variant="h4" color={success}>3</Typography>
                        <Typography color="success">Available</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <CancelIcon sx={{fontSize: 50, color: error}} />
                    <Box>
                        <Typography variant="h4" color={error}>3</Typography>
                        <Typography color="success">Unavailable</Typography>
                    </Box>
                </Box>
                </Grid>
            <Grid item xs={4}>
                <Box display="flex" alignItems="top" gap={2} justifyContent="center">
                    <TableBarIcon sx={{fontSize: 50, color: warning}} />
                    <Box>
                        <Typography variant="h4" color={warning}>3</Typography>
                        <Typography color="success">Total</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Paper>
  )
}
