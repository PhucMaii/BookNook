import { Grid, Typography, Box, Divider, Rating, Paper} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { dummyImg } from '../../../utils/constants'
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { primary } from '../../../theme/colors';
import { ProgressStyled, StyledAvatar, iconStyled } from './styled';
import RestaurantReviewBlock from '../../components/restaurantReviewBlock';
import ReservationMakingBlock from '../../components/ReservatioinMakingBlock/ReservationMakingBlock';
import CustomerHeader from '../../components/TopNavbar/CustomerHeader';
import { SplashScreen } from '../../../lib/utils';
import { fetchData, fetchDoc } from '../../../utils/firebase';
import { useParams } from 'react-router-dom';
import { getAggregateFromServer, where } from 'firebase/firestore';

const RestaurantDetail = () => {
  const [avgStar, setAvgStar] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hostData, setHostData] = useState()
  const [hostReviews, setHostReviews] = useState()
  const [reservationFilter, setReservationFilter] = useState({})
  const [reviewFilter, setReviewFilter] = useState()
  const [starsObj, setStarsObj] = useState({
    '1 Star':0,
    '2 Star':0,
    '3 Star':0,
    '4 Star':0,
    '5 Star':0
  })

  const {restaurantId} = useParams();

  useEffect(() => {
    if (restaurantId) {
      fetchHostData()
      fetchReviews()
    }
  }, [restaurantId])

  const fetchHostData = async() => {
    try {
      const fetchResult = await fetchDoc('restaurants',restaurantId)
      setHostData(fetchResult.docData)
    } catch (error) {
      console.log('Fail to fetch host data: ',error)
      setIsLoading(false);
    }
  }

  const fetchReviews = async() => {
    try {
      const fetchResult = await fetchData('reviews', where('restaurantId', '==', restaurantId))
      setHostReviews(fetchResult)
      console.log(fetchResult)
      processReviews(fetchResult)
      setIsLoading(false)
    } catch (error) {
      console.log('Fail to fetch reviews: ', error)
      setIsLoading(false);
    }
  }

  const processReviews = (reviews) => {
    let totalStar = 0;
    if (!reviews) {
      console.error('Reviews is undefined or null.');
      return;
    }
    reviews.map((reviews) => {
      totalStar += reviews.stars
      switch(reviews.stars){
        case 1:{

        }

      }
    })
    const avgStar = parseFloat((totalStar / reviews.length).toFixed(1))
    setAvgStar(avgStar)
  }

  if (isLoading) {
    return (
      <>
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <CustomerHeader/>
      <img src={hostData.imgURL} alt='Restaurant picture' width='100%' height='350px' />
      <Grid container p={3} m={0.5} justifyContent='space-between'>
        <Grid xs={8} item container direction='column' rowGap={2} p={2} sx={{ backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
          <Typography variant='h4' fontWeight='bold'>{hostData.name}</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item>
                  <StyledAvatar>
                    <StarIcon sx={iconStyled} />
                  </StyledAvatar>
                </Grid>
                <Grid item>
                  <Typography variant='h4' fontWeight='bold' color={primary}>{avgStar}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>({hostReviews.length} reviews)</Typography>
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
                  <Typography variant='h4' fontWeight='bold' color={primary}>{hostData.type}</Typography>
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
                  <Typography variant='h4' fontWeight='bold' color={primary}>{hostData.avgPrice}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Typography variant='h6' fontWeight='bold'>Description</Typography>
          <Divider />
          <Typography variant='subtitle2'>{hostData.description}</Typography>
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
                <Rating name="Overall rating" value={avgStar} precision={0.5} size='large' sx={{ color: primary, borderColor: primary }} readOnly />
                <Typography variant='h6' sx={{ marginLeft: '5px' }}>{avgStar}</Typography>
              </Box>
              <Typography variant='h6' sx={{ marginLeft: '5px' }}>{hostReviews.length} reviews</Typography>
            </Grid>

            <Grid item xs={6} container
              direction='column'
              justifyContent="center"
            >
              <Box display='flex' alignItems="center">
                <Typography variant='h6' minWidth='75px' >5 Stars</Typography>
                <ProgressStyled variant="determinate" value={50} />
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

          {/* Review Block */}
          <RestaurantReviewBlock/>
          
        </Grid>

        <Grid xs={3.7} item container>
          <Paper sx={{maxHeight:'50vh', position: 'sticky', top: 0}}>
            <ReservationMakingBlock/>
          </Paper>
        </Grid>
      </Grid>
    </>

  )
}

export default RestaurantDetail;