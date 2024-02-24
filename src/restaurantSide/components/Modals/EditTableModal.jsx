import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { BoxStyled } from './styled';
import { LoadingButton } from '@mui/lab';
import { generateCapacity } from '../../utils/generateConstants';
import { tableTypes } from '../../utils/constants';
import { blueGrey } from '@mui/material/colors';

export default function EditTableModal({
  handleUpdateTable,
  handleUpdateUI,
  tableList,
  targetTable,
  setNotification,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState(targetTable);
  const [tableNumber, setTableNumber] = useState(targetTable.tableNumber);

  useEffect(() => {
    if (targetTable) {
      setTableData(targetTable);
    }
  }, [targetTable]);

  const updateTable = async () => {
    setIsLoading(true);
    await handleUpdateTable(targetTable.id, tableData);
    handleUpdateUI(tableData);
    setNotification({
        on: true,
        severity: 'success',
        message: 'Update Table Successfully'
    });
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant="filled"
        style={{ color: '#64748B', backgroundColor: blueGrey }}
        onClick={() => setIsOpen(true)}
      >
        EDIT
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <BoxStyled p={4} boxShadow={24}>
          <Grid container alignItems="center" rowGap={3}>
            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="h4">
                Edit Table
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <LoadingButton
                loading={isLoading}
                loadingIndicator="Saving..."
                onClick={updateTable}
                color="secondary"
                variant="contained"
              >
                Save
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Table Number</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel color="secondary" id="table-number-label">
                  Table Number
                </InputLabel>
                <Select
                  color="secondary"
                  labelId="table-number-label"
                  input={<OutlinedInput label="Table Number" />}
                  value={tableNumber}
                  onChange={(e) => setTableNumber(+e.target.value)}
                >
                  {tableList &&
                    tableList.map((table, index) => {
                      return (
                        <MenuItem key={index} value={table.tableNumber}>
                          {table.tableNumber}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
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
                  labelId="capacity-label"
                  value={tableData.capacity}
                  onChange={(e) =>
                    setTableData({ ...tableData, capacity: +e.target.value })
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
                  labelId="type-label"
                  value={tableData.type}
                  onChange={(e) =>
                    setTableData({ ...tableData, type: e.target.value })
                  }
                >
                  {tableTypes &&
                    tableTypes.map((type, index) => {
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
                  labelId="status-label"
                  value={tableData.isAvailable}
                  onChange={(e) =>
                    setTableData({
                      ...tableData,
                      isAvailable: e.target.value,
                    })
                  }
                >
                  <MenuItem value={true}>Available</MenuItem>
                  <MenuItem value={false}>Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </BoxStyled>
      </Modal>
    </>
  );
}

EditTableModal.propTypes = {
  handleUpdateTable: PropTypes.func,
  handleUpdateUI: PropTypes.func,
  tableList: PropTypes.array,
  targetTable: PropTypes.object,
  setNotification: PropTypes.func,
};
