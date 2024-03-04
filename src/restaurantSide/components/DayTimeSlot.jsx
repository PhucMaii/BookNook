import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Typography } from '@mui/material';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { grey } from '@mui/material/colors';

export default function DayTimeSlot({ day, onDelete, timeSlots }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="100%"
    >
      <Typography variant="h6">{day}</Typography>
      <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={1}>
        {!timeSlots || timeSlots.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <DoDisturbOnIcon sx={{ color: grey[500] }} />
            <Typography
              fontWeight="bold"
              color={grey[500]}
              textAlign="center"
              variant="subtitle1"
            >
              No Time Slots
            </Typography>
          </Box>
        )}
        {timeSlots &&
          timeSlots.map((timeSlot, index) => {
            return (
              <Chip
                key={index}
                color="secondary"
                label={timeSlot.startTime}
                onDelete={() => onDelete(timeSlot.id)}
              />
            );
          })}
      </Box>
    </Box>
  );
}

DayTimeSlot.propTypes = {
  day: PropTypes.string,
  onDelete: PropTypes.func,
  timeSlots: PropTypes.array,
};
