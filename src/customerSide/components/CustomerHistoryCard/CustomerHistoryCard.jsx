import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import { CardStyled, IconBackground } from './styled';

const CustomGrid = styled(Grid)`
  height: 100%;
`;

const CustomTypography = styled(Typography)`
  color: rgba(0, 0, 0, 0.7); 
`;

const CustomerHistoryCard = ({ title, data, icon, marginLeft, marginRight }) => {
  return (
    <CardStyled style={{ marginLeft, marginRight }}>
      <CustomGrid container justifyContent="center" alignItems="center" spacing={5}>
        <Grid item xs={4}>
          <IconBackground>
            <img
              src={icon}
              alt={`Icon for ${title}`}
              style={{ maxWidth: '50%', height: 'auto', 'auto': 'auto' }}
            />
          </IconBackground>
        </Grid>
        <Grid item xs={8}>
          <CustomTypography fontWeight="bold" variant="h4" align="left">
            {data}
          </CustomTypography>
          <CustomTypography variant="subtitle1" marginTop="auto" align="left">
            {title}
          </CustomTypography>
        </Grid>
      </CustomGrid>
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
