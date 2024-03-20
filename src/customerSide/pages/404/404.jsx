import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='flex-end'
      alignItems='center'
      gap={2}
      sx={{
        backgroundImage: 'url("/404background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Typography sx={{color: 'white'}} fontWeight='bold' variant='h4'>
        Oops!, it seems like you&apos;ve entered the wrong path
      </Typography>
      <Button variant='contained' onClick={() => navigate('/')} sx={{backgroundColor: 'white', mb: 20, width: '50%'}}>
        Back home
      </Button>
    </Box>
  );
}
