import { Button, Table, TableBody, TableCell, TableHead } from '@mui/material'
import React from 'react'
import StatusText from './StatusText/StatusText'
import { blueGrey } from '../../theme/colors'

export default function TableList() {
  return (
    <Table>
        <TableHead>
            <TableCell>TABLE</TableCell>
            <TableCell>CAPACITY</TableCell>
            <TableCell align="center">STATUS</TableCell>
            <TableCell align="center">TYPE</TableCell>
        </TableHead>
        <TableBody>
            <TableCell>Table 2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>
                <StatusText text="Completed" type="success" />
            </TableCell>
            <TableCell align="center">Rooftop</TableCell>
            <TableCell align="center">
                <Button variant="filled" style={{ color: '#64748B', backgroundColor: blueGrey }}>
                    EDIT
                </Button>
            </TableCell>
        </TableBody>
    </Table>
  )
}
