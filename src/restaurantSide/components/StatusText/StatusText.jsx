import { Typography } from '@mui/material';
import React from 'react';

export default function StatusText({ text, type }) {
  if (type === 'success') {
    
  }

  const style = {
    backgroundColor: backgroundColor,
    color: textColor,
  };
  
  return (
    <Typography sx={style}>
      {text}
    </Typography>
  );
}