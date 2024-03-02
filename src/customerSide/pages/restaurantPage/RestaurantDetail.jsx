import { Grid, Typography, Box, Divider, Rating} from '@mui/material'
import React from 'react'
import { dummyImg } from '../../../utils/constants'
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { primary } from '../../../theme/colors';
import { ProgressStyled, StyledAvatar, iconStyled } from './styled';

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
      <img src={dummyImg} alt='Restaurant picture' width='100%' height='350px'/>
      <Grid container p={3} m={0.5} justifyContent='space-between'>
        <Grid xs={8} item container direction='column' rowGap={2} p={2} sx={{backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
            <Typography variant='h4' fontWeight='bold'>Miku Restaurant</Typography>
            <Grid container>
              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <StyledAvatar>
                      <StarIcon sx={iconStyled} />
                    </StyledAvatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h4' fontWeight='bold' color={primary}>4.3</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>(300 reviews)</Typography>
                  </Grid>
                  <Grid item>
                    <Divider component='span' orientation='vertical' />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <StyledAvatar>
                      <RestaurantIcon sx={iconStyled} />
                    </StyledAvatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h4' fontWeight='bold' color={primary}>Asian</Typography>
                  </Grid>
                  <Grid item>
                    <Divider component='span' orientation='vertical' />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container justifyContent="space-around" alignItems="center">
                  <Grid item>
                    <StyledAvatar>
                      <LocalAtmIcon sx={iconStyled} />
                    </StyledAvatar>
                  </Grid>
                  <Grid item>
                    <Typography variant='h4' fontWeight='bold' color={primary}>Less than $50</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography variant='h6' fontWeight='bold'>Description</Typography>
            <Divider />
            <Typography variant='subtitle2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus quis dolorum suscipit. Unde veniam libero iure dicta consequuntur ut dolor eveniet cumque porro quis. Reprehenderit dolor temporibus quis suscipit!</Typography>
            <Typography variant='h6' fontWeight='bold'>Reviews</Typography>
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
                  <Rating name="Overall rating" value={4.5} precision={0.5} size='large' sx={{ color: primary, borderColor: primary }} readOnly />
                  <Typography variant='h6' sx={{ marginLeft: '5px' }}>4.5</Typography>
                </Box>
                <Typography variant='h6' sx={{ marginLeft: '5px' }}>200 reviews</Typography>
              </Grid>

              <Grid item xs={6} container 
                direction='column'
                justifyContent="center"
              >
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth='75px' >5 Stars</Typography>
                  <ProgressStyled variant="determinate" value={60} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth='75px'>4 Stars</Typography>
                  <ProgressStyled variant="determinate" value={20} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth='75px'>3 Stars</Typography>
                  <ProgressStyled variant="determinate" value={10} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth='75px'>2 Stars</Typography>
                  <ProgressStyled variant="determinate" value={5} />
                </Box>
                <Box display='flex' alignItems="center">
                  <Typography variant='h6' minWidth='75px'>1 Stars</Typography>
                  <ProgressStyled variant="determinate" value={5} />
                </Box>
              </Grid>
            </Grid>
        </Grid>

        <Grid xs={3.7} item container direction='column' sx={{backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
            <Typography variant='h3'>Resevation Making</Typography>
        </Grid>
      </Grid>
    </>

  )
}
