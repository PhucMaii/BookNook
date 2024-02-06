import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { PingStyled } from './styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { background, error, success } from '../../../theme/colors';
import { green, red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { convertTimestampToDate } from '../../utils/time';

export default function HistoryAccordion({ data }) {
  return (
    <Accordion 
      elevation={0}
      sx={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        borderRadius: '10px',
        '&.MuiAccordion-root::before': {
          backgroundColor: background
        },
        '&.MuiAccordion-root:last-of-type': {
          borderRadius: '10px'
        },
      }} 
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={4}>
              <PingStyled $isCompleted={data['Status'] === 'Completed'} />
              <Avatar />
              <Box display="flex" flexDirection="column" alignItems="left">
                <Typography fontWeight="light" variant="subtitle1">{data['Booking Id']}</Typography>
                <Typography fontWeight="bold" variant="h6">
                  {data['Customer Name']}
                </Typography>  
                </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" flexDirection="column" alignItems="left">
              <Typography>Number of guests: {data['Number of guests']}</Typography>
              <Typography>Booked Time:{convertTimestampToDate(data['Booked Time'])}</Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container mx={4}>
          {
            data && Object.keys(data).map((key, index) => {
              if (key === 'Status') {
                return;
              }
              return (
                <Grid key={index} item xs={12} sm={6} md={4} textAlign="left" mt={2}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1">{key}</Typography>
                    <Typography fontWeight="bold" variant="h6">{data[key]}</Typography>
                  </Box>
                </Grid>
              )
            })
          }
          <Grid item xs={12} sm={6} md={4} textAlign="left" mt={2}>
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">Status</Typography>
              <Typography 
                color={data['Status'] === 'Completed' ? success : error} 
                fontWeight="bold" 
                variant="h6"
                sx={{
                  backgroundColor: data['Status'] === 'Completed' ? green[100] : red[100] ,
                  mr: 'auto', 
                  px: 2, 
                  borderRadius: '10px'
                }}
              >
                {data['Status']}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

HistoryAccordion.propTypes = {
  data: PropTypes.object
}