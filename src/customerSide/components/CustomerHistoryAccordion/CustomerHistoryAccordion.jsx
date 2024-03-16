import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  AccordionCardContentStyled,
  iconStyles
} from './styled';

const CustomerHistoryAccordion = ({ reservation }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  return (
    <Accordion
      expanded={expandedPanel === `panel-${reservation.id}`}
      onChange={handleAccordionChange(`panel-${reservation.id}`)}
      style={{
        marginLeft: '6%',
        marginRight: '6%',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
      }}
    >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >

          <Grid container spacing={2} alignItems='center'>
              <Grid item xs={1}>
                <span style={iconStyles}>•</span>
              </Grid>
              <Grid item xs={2} >
                <span>{reservation.restaurantId}</span>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body1' style={{ fontWeight: 'bold' }}>{reservation.restaurantName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body1'>Number of Guests: {reservation.numGuests}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='body1' style={{ fontWeight: 'bold' }}>Booked Time: {reservation.bookedTime}</Typography>
              </Grid>
          </Grid>
        </AccordionSummary>

      <AccordionDetails>
        <AccordionCardContentStyled>
          <Grid container spacing={20}>
            <Grid item xs={12} sm={6} md={4} textAlign='left'>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1' >{'Restaurant ID: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.restaurantId}</Typography>
                <Typography variant='subtitle1' >{'Restaurant Name: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.restaurantName}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} textAlign='left'>
              <Box
                display='flex'
                flexDirection='column'
              >
                <Typography variant='subtitle1' >{'Location: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.restaurantLocation}</Typography>
                <Typography variant='subtitle1' >{'Booked Time: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.bookedTime}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} textAlign='left'>
              <Box
                display='flex'
                flexDirection='column'
              >
                <Typography variant='subtitle1' >{'Number of Guests: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.numGuests}</Typography>
                <Typography variant='subtitle1' >{'Status: '}</Typography>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>{reservation.status}</Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionCardContentStyled>
      </AccordionDetails>
    </Accordion>
  );
};

CustomerHistoryAccordion.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    restaurantId: PropTypes.string,
    restaurantName: PropTypes.string,
    restaurantLocation: PropTypes.string,
    numGuests: PropTypes.number,
    bookedTime: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default CustomerHistoryAccordion;
