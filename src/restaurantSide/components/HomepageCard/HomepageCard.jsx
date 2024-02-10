import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import { CardStyled, IconBackground } from './styled';

const HomepageCard = ({ title, data, icon }) => {
console.log()
  return (
    <CardStyled>
      <Grid
        container
        spacing={2}
        margin={'auto'}
      >
        <Grid item xs={4}>
          <IconBackground>
            <img
              src={icon}
              alt='icon'
              style={{ maxWidth: '100%', height: 'auto'}}
            />
          </IconBackground>
        </Grid>
        <Grid item xs={8}>
          <Typography fontWeight='bold' variant='h4'>
            {data}
          </Typography>
          <Typography marginTop={'8px'}>{title}</Typography>
        </Grid>
      </Grid>
    </CardStyled>
  );
};

HomepageCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.number,
  icon: PropTypes.string,
};

export default HomepageCard;
