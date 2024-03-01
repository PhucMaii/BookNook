import { Avatar, Grid, Paper, Typography, Box, Divider, Rating, LinearProgress } from '@mui/material'
import React from 'react'
import { dummyImg } from '../../../utils/constants'
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { primary, primary15 } from '../../../theme/colors';

export const RestaurantDetail = () => {
  return (
    <>
      {/* Placeholder for Navbar */}
      <Box
        height={95}
        sx={{ bgcolor: 'orange', justifyContent: 'center', textAlign: 'center' }}
      >
        <Typography variant='h1'>Navbar Placeholder</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        height={300}
        style={{
          backgroundSize: 'auto',
          backgroundImage: `url(${dummyImg})`
        }}
      />
      <Grid container p={3} spacing={5}>
        <Grid xs={8} item container direction='column'>
          <Paper sx={{ padding: '30px' }}>
            <Typography variant='h3' mb={4}>Miku Restaurant</Typography>
            <Grid container mb={4}>
              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <Avatar sx={{ bgcolor: primary15, width: 56, height: 56 }}>
                      <StarIcon sx={{ color: primary, width: 30, height: 30 }} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h3' color={primary}>4.3</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>(300 reviews)</Typography>
                  </Grid>
                  <Grid item>
                    <Divider orientation='vertical' />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <Avatar sx={{ bgcolor: primary15, width: 56, height: 56 }}>
                      <RestaurantIcon sx={{ color: primary, width: 30, height: 30 }} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h3' color={primary}>Asian</Typography>
                  </Grid>
                  <Grid item>
                    <Divider orientation='vertical' />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <Avatar sx={{ bgcolor: primary15, width: 56, height: 56 }}>
                      <LocalAtmIcon sx={{ color: primary, width: 30, height: 30 }} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h5' color={primary}>Less than $50</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography variant='h4'>Description</Typography>
            <Divider />
            <Typography variant='subtitle1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus quis dolorum suscipit. Unde veniam libero iure dicta consequuntur ut dolor eveniet cumque porro quis. Reprehenderit dolor temporibus quis suscipit!</Typography>
            <Typography variant='h4'>Reviews</Typography>
            <Divider />
            <Grid container 
              justifyContent='space-around' 
              alignItems='center'
              mt={2}>
              <Grid item xs={6} container 
                direction='column' 
                justifyContent="space-between" 
                alignItems="space-around"
                mt={4}>
                <Typography variant='h6' sx={{ marginLeft: '5px' }}>Overall Rating</Typography>
                <Box display={'flex'} alignItems="center">
                  <Rating name="Overall rating" value={4.5} precision={0.5} size='large' sx={{ color: primary }} readOnly />
                  <Typography variant='h6' sx={{ marginLeft: '5px' }}>4.5</Typography>
                </Box>
                <Typography variant='h6' sx={{ marginLeft: '5px' }}>200 reviews</Typography>
              </Grid>

              <Grid item xs={6} container 
                direction='column'
                justifyContent="center"
                alignItems="stretch">
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth={'75px'}>5 Stars</Typography>
                  <LinearProgress variant="determinate" value={60} sx={{ width: '100%', height:'15px', borderRadius:5 }} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth={'75px'}>4 Stars</Typography>
                  <LinearProgress variant="determinate" value={20} sx={{ width: '100%', height:'15px', borderRadius:5 }} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth={'75px'}>3 Stars</Typography>
                  <LinearProgress variant="determinate" value={10} sx={{ width: '100%', height:'15px', borderRadius:5 }} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth={'75px'}>2 Stars</Typography>
                  <LinearProgress variant="determinate" value={5} sx={{ width: '100%', height:'15px', borderRadius:5 }} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth={'75px'}>1 Stars</Typography>
                  <LinearProgress variant="determinate" value={5} sx={{ width: '100%', height:'15px', borderRadius:5 }} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={4} item container direction='column'>
          <Paper>
            <Typography variant='h3'>Miku Restaurant</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>

  )
}
