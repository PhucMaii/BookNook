import React from 'react';
import { Grid } from '@mui/material';

const AccordionPingStyled = (
  <div
    style={{
      width: 'px',
      height: '10px',
      borderRadius: '50%',
      
    }}
  />
);

const AccordionContainerStyled = (props) => (
  <Grid container justifyContent="space-evenly" {...props} />
);

const AccordionCardStyled = (props) => (
  <Grid
    container
    justifyContent="center"
    spacing={2}
    style={{
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      borderRadius: '8px',
    }}
    {...props}
  />
);

const AccordionCardContentStyled = (props) => (
  <Grid
    container
    spacing={2}
    justifyContent="center"
    style={{
      padding: '20px',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 0px 0px',
      margin: '10px',
    }}
    {...props}
  />
);

const AccordionContentWrapper = (props) => (
  <Grid item {...props} />
);

const iconStyles = {
  color: 'green',
  fontSize: '1.2em',
  marginRight: '1px',
};

export {
  AccordionPingStyled,
  AccordionContainerStyled,
  AccordionCardStyled,
  AccordionCardContentStyled,
  AccordionContentWrapper,
  iconStyles,
};
