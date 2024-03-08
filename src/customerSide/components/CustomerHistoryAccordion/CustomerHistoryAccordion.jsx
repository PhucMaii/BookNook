import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  AccordionContainerStyled,
  AccordionCardContentStyled,
  AccordionContentWrapper,
  iconStyles,
} from './styled';

const CustomerHistoryAccordion = ({ reservation }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => {
    setExpandedPanel(panel === expandedPanel ? null : panel);
  };

  const accordionSummaryStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <Accordion
      expanded={expandedPanel === 'panel'}
      onChange={() => handleAccordionChange('panel')}
    >
      <AccordionContainerStyled>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={accordionSummaryStyles}>
          <AccordionContentWrapper>
            <span style={{ ...iconStyles, marginLeft: '125px' }}>•</span>
            <span style={{ marginLeft: '1px' }}> <strong></strong>
            <span>{reservation.restaurantId || 'N/A'}</span> </span>
          </AccordionContentWrapper>
          <AccordionContentWrapper>
          <span style={{ marginLeft: '90px' }}>
            <strong></strong>
            <span>{reservation.restaurantName || 'N/A'}</span></span>
          </AccordionContentWrapper>
          <AccordionContentWrapper>
            <strong>Number of Guests:</strong>
            <span>{reservation.numGuests || 'N/A'}</span>
          </AccordionContentWrapper>
          <AccordionContentWrapper>
          <span style={{ marginLeft: '0px' }}>
            <strong>Booked Time:</strong>
            <span>{reservation.bookedTime || 'N/A'}</span></span>
          </AccordionContentWrapper>
        </AccordionSummary>
      </AccordionContainerStyled>

      <AccordionDetails>
        <AccordionCardContentStyled>
          
              <Typography variant="body2">
              <strong>Restaurant ID:</strong> {reservation.restaurantId || 'N/A'}
                <br />
                <strong>Restaurant Name:</strong> {reservation.restaurantName || 'N/A'}
                <br />
                <strong>Restaurant Location:</strong> {reservation.restaurantLocation || 'N/A'}
                <br />
                <strong>Number of Guests:</strong> {reservation.numGuests || 'N/A'}
                <br />
                <strong>Booked Time:</strong> {reservation.bookedTime || 'N/A'}
                <br />
                <strong>Status:</strong> {reservation.status || 'N/A'}
              </Typography>
           
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
