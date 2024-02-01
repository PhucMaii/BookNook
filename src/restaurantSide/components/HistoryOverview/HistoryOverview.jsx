import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { IconImg, StatusTabStyled } from './styled';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';

export default function HistoryOverview({
  iconImg,
  numberOfReservation,
  status,
}) {
  return (
    <Grid item xs={6}>
      <StatusTabStyled
        p={2}
        sx={{
          '&:hover': {
            backgroundColor: grey[300],
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          },
        }}
      >
        <Grid container alignItems='center'>
          <Grid item xs={4}>
            <IconImg src={iconImg} />
          </Grid>
          <Grid item xs={4} textAlign='center'>
            <Box justifyContent='center' alignItems='center'>
              <Typography variant='h4' fontWeight='bold'>
                {numberOfReservation}
              </Typography>
              <Typography variant='subtitle1'>{status}</Typography>
            </Box>
          </Grid>
        </Grid>
      </StatusTabStyled>
    </Grid>
  );
}

HistoryOverview.propTypes = {
  iconImg: PropTypes.string,
  numberOfReservation: PropTypes.number,
  status: PropTypes.string,
};
