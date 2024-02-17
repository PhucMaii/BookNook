import { Box, Chip, Typography } from '@mui/material'
import React from 'react'

export default function DayTimeSlot() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
        <Typography variant="h6">Mon</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Chip color="secondary" label="9:00 AM" onDelete={() => {}}/>
            <Chip color="secondary" label="9:00 AM" onDelete={() => {}}/>
            <Chip color="secondary" label="9:00 AM" onDelete={() => {}}/>
            <Chip color="secondary" label="9:00 AM" onDelete={() => {}}/>
            <Chip color="secondary" label="9:00 AM" onDelete={() => {}}/>
        </Box>
    </Box>
  )
}
