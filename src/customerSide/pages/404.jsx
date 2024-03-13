import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <img src="/404.jpeg" width="80%" style={{ height: '300px' }} />
      <Typography fontWeight="bold" variant="h4">
        Oops!, it seems like you&apos;ve entered the wrong path
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{color: 'white'}}>
        Back home
      </Button>
    </Box>
  );
}
