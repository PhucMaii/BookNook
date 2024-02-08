import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { success, successBackground } from '../../../theme/colors';

export default function StatusText({ text, type }) {
  const [textColor, setTextColor] = useState({
    backgroundColor: null,
    color: null
  });

  useEffect(() => {
    getColor();
  }, [])

  const getColor = () => {
    if (type === 'success') {
      setTextColor({
        backgroundColor: successBackground,
        color: success
      })
    }
  }
  
  return (
    <Typography sx={{...textColor, borderRadius: '20px', textAlign: 'center', margin: 'auto' }}>
      {text}
    </Typography>
  );
}