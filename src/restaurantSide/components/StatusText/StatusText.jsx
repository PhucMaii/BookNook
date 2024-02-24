import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  error,
  errorBackground,
  success,
  successBackground,
  warning,
  warningBackground,
} from '../../../theme/colors';

export default function StatusText({ text, type }) {
  const [textColor, setTextColor] = useState({
    backgroundColor: null,
    color: null,
  });

  useEffect(() => {
    getColor();
  }, [type]);

  const getColor = () => {
    if (type === 'success') {
      setTextColor({
        backgroundColor: successBackground,
        color: success,
      });
    }
    if (type === 'warning') {
      setTextColor({
        backgroundColor: warningBackground,
        color: warning,
      });
    }
    if (type === 'error') {
      setTextColor({
        backgroundColor: errorBackground,
        color: error,
      });
    }
  };

  return (
    <Typography
      sx={{
        ...textColor,
        borderRadius: 2,
        textAlign: 'center',
        py: '5px',
        px: '10px',
        width: 'fit-content',
      }}
    >
      {text}
    </Typography>
  );
}

StatusText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};
