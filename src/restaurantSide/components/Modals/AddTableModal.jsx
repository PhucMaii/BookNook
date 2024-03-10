import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Divider,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { BoxStyled } from './styled';
import { generateCapacity } from '../../../utils/generateConstants';
import { tableTypes } from '../../../utils/constants';
import { LoadingButton } from '@mui/lab';

export default function AddTableModal({
  handleAddTable,
  open,
  onClose,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [submittedData, setSubmittedData] = useState({
    tableNumber: 1,
    capacity: 2,
    type: 'Standard',
    isAvailable: true
  });

  const addTable = async () => {
    setIsLoading(true);
    try {
      if (
        !submittedData.tableNumber ||
        !submittedData.capacity ||
        !submittedData.type ||
        submittedData.isAvailable === null
      ) {
        setNotification({
          on: true,
          severity: 'error',
          message: 'Please fill out all blanks',
        });
        return;
      }

      await handleAddTable(submittedData);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log('Fail to add table in modal: ', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <BoxStyled p={4} boxShadow={24}>
          <Grid container rowGap={3} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h4" fontWeight="bold">
                Add Table
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <LoadingButton
                color="secondary"
                onClick={addTable}
                variant="contained"
                loading={isLoading}
                loadingIndicator="Adding..."
              >
                Add
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {notification.on && (
              <Grid item xs={12}>
                <Alert severity={notification.severity}>
                  {notification.message}
                </Alert>
              </Grid>
            )}
            <Grid item xs={6}>
              <Typography variant="h6">Table Number</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="secondary"
                fullWidth
                label="Table Number"
                type="number"
                value={submittedData.tableNumber}
                onChange={(e) =>
                  setSubmittedData({
                    ...submittedData,
                    tableNumber: +e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Capacity</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel color="secondary" id="capacity-label">
                  Capacity
                </InputLabel>
                <Select
                  color="secondary"
                  label="Capacity"
                  labelId="capacity-label"
                  value={submittedData.capacity}
                  onChange={(e) =>
                    setSubmittedData({
                      ...submittedData,
                      capacity: +e.target.value,
                    })
                  }
                >
                  {generateCapacity().map((capacity, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={parseInt(capacity.split(' ')[0])}
                      >
                        {capacity}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Table Type</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel color="secondary" id="type-label">
                  Type
                </InputLabel>
                <Select
                  color="secondary"
                  label="Type"
                  labelId="type-label"
                  value={submittedData.type}
                  onChange={(e) =>
                    setSubmittedData({
                      ...submittedData,
                      type: e.target.value,
                    })
                  }
                >
                  {tableTypes.map((type, index) => {
                    return (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Status</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel color="secondary" id="status-label">
                  Status
                </InputLabel>
                <Select
                  color="secondary"
                  label="Status"
                  labelId="status-label"
                  value={submittedData.isAvailable ? 'available' : 'unavailable'}
                  onChange={(e) =>
                    setSubmittedData({
                      ...submittedData,
                      isAvailable:
                        e.target.value === 'available' ? true : false,
                    })
                  }
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </BoxStyled>
      </Fade>
    </Modal>
  );
}

AddTableModal.propTypes = {
  handleAddTable: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
