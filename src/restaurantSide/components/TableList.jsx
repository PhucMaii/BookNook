import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import StatusText from './StatusText/StatusText';
import EditTableModal from './Modals/EditTableModal';
import DeleteTableModal from './Modals/DeleteTableModal';

export default function TableList({
  handleDeleteTable,
  setNotification,
  tableList,
  handleUpdateTable,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>TABLE</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>CAPACITY</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>TYPE</TableCell>
          </TableRow>
        </TableHead>
        {tableList &&
          tableList.map((table, index) => {
            return (
              <TableBody key={index}>
                <TableRow>
                  <TableCell>Table {table.tableNumber}</TableCell>
                  <TableCell>{table.capacity}</TableCell>
                  <TableCell>
                    <StatusText
                      text={table.isAvailable ? 'Available' : 'Unavailable'}
                      type={table.isAvailable ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell>{table.type}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={2}>
                      <EditTableModal
                        tableList={tableList}
                        targetTable={table}
                        handleUpdateTable={handleUpdateTable}
                        setNotification={setNotification}
                      />
                      <DeleteTableModal 
                        handleDeleteTable={() => handleDeleteTable(table.id)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
      </Table>

    </TableContainer>
  );
}

TableList.propTypes = {
  handleDeleteTable: PropTypes.func,
  handleUpdateTable: PropTypes.func,
  handleUpdateUI: PropTypes.func,
  setNotification: PropTypes.func,
  tableList: PropTypes.array,
};
