import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { error, errorBackground, success, successBackground, warning, warningBackground } from '../../../theme/colors';

export default function StatusText({ text, type }) {
  console.log(type,'type')
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
    if (type === 'warning') {
      setTextColor({
        backgroundColor: warningBackground,
        color: warning
      })
    }
    if (type === 'error') {
      setTextColor({
        backgroundColor: errorBackground,
        color: error
      })
    }
  }
  
  return (
    <Typography sx={{...textColor, borderRadius: '20px', textAlign: 'center', margin: 'auto' }}>
      {text}
    </Typography>
  );
}