import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Grid } from '@mui/material';

const HomepageCard = ({ title, data, icon }) => {
  return (
    <Card sx={{borderRadius:'14px', maxWidth:'100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',}}>
      <Grid container spacing={2} alignItems="center" margin={'auto'}>
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
          <Typography sx={{ fontFamily: 'Barlow', fontWeight: 'bold', fontSize: 46}}>
            {data}
          </Typography>
          <Typography sx={{ fontFamily: 'Barlow', fontSize: 16, marginBottom: 5 }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

HomepageCard.propTypes = {
  title: PropTypes.String,
  data: PropTypes.number,
  icon: PropTypes.String,
};

export default HomepageCard;
