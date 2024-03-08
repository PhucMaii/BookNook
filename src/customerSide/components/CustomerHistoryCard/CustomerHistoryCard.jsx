import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import { CardStyled, IconBackground } from './styled';

const CustomerHistoryCard = ({ title, data, icon, marginLeft, marginRight}) => {
  return (
    <CardStyled style={{ height: '90px', width: '250px', padding: '16px', marginLeft, marginRight}}>
      <Grid container justifyContent="center" alignItems="center" spacing={5} style={{ height: '100%' }}>
        <Grid item xs={4}>
          <IconBackground>
            <img
              src={icon}
              alt={`Icon for ${title}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </IconBackground>
        </Grid>
        <Grid item xs={8}>
          <Typography fontWeight="bold" variant="h4" align="left">
            {data}
          </Typography>
          <Typography variant="subtitle1" marginTop="auto" align="left">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </CardStyled>
  );
};

CustomerHistoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  marginLeft: PropTypes.string, 
  marginRight: PropTypes.string,
};

export default CustomerHistoryCard;
