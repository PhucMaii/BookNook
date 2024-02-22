import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import StatusText from './StatusText/StatusText';
import EditTableModal from './Modals/EditTableModal';

export default function TableList({
  setNotification,
  tableList,
  handleUpdateTable,
  handleUpdateUI
}) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  return (
    <Table>
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
                  <EditTableModal
                    onClose={() => setIsOpenEditModal(false)}
                    open={isOpenEditModal}
                    tableList={tableList}
                    targetTable={table}
                    handleUpdateTable={handleUpdateTable}
                    setNotification={setNotification}
                    handleUpdateUI={handleUpdateUI}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          );
        })}
    </Table>
  );
}

TableList.propTypes = {
  handleUpdateTable: PropTypes.func,
  handleUpdateUI: PropTypes.func,
  setNotification: PropTypes.func,
  tableList: PropTypes.array,
};
