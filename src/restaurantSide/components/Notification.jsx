import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';

export default function Notification({notification, onClose}) {
  return (
    <Snackbar
      open={notification.on}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity={notification.severity}>{notification.message}</Alert>
    </Snackbar>
  );
}

Notification.propTypes = {
    notification: PropTypes.object,
    onClose: PropTypes.func
}
