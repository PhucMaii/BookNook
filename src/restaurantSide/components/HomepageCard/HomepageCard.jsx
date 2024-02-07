import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import { CardStyled } from './styled';

const HomepageCard = ({ title, data, icon }) => {
  return (
    <CardStyled>
      <Grid container spacing={2} justifyContent="center" alignItems="center" margin={'auto'}>
        <Grid item xs={4}>
          <div
            style={{
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(52, 152, 219, 0.15)', // #3498DB with 15% opacity
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              marginBottom: '16px',
            }}
          >
            <img src={icon} alt='icon' style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%' }} />
          </div>
        </Grid>
        <Grid item xs={8}>
          <Typography fontWeight="bold" variant="h4">
            {data}
          </Typography>
          <Typography>
            {title}
          </Typography>
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
