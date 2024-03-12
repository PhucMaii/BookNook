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
    oneStar:0,
    twoStar:0,
    threeStar:0,
    fourStar:0,
    fiveStar:0
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
      processReviews(fetchResult)
      setIsLoading(false)
    } catch (error) {
      console.log('Fail to fetch reviews: ', error)
      setIsLoading(false);
    }
  }

  const processReviews = (reviews) => {
    let totalStar = 0;
    let tempStarsObj = { ...starsObj };

    if (!reviews) {
      console.error('Reviews is undefined or null.');
      return;
    }
    reviews.map((reviews) => {
      totalStar += reviews.stars
      switch(reviews.stars){
        case 1:{
          tempStarsObj.oneStar++
          break;
        }
        case 2:{
          tempStarsObj.twoStar++
          break;
        }
        case 3:{
          tempStarsObj.threeStar++
          break;
        }
        case 4:{
          tempStarsObj.fourStar++
          break;
        }
        case 5:{
          tempStarsObj.fiveStar++
          break;
        }
        default:{
          console.log('Unable to group reviews.')
          break;
        }
      }
    })
    setStarsObj(tempStarsObj);

    const avgStar = parseFloat((totalStar / reviews.length).toFixed(1))
    setAvgStar(avgStar)
  }

  const getStarValue = (star) => {
    return (star/hostReviews.length)*100
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
                <ProgressStyled variant="determinate" value={getStarValue(starsObj.fiveStar)} />
              </Box>
              <Box display='flex' alignItems="center">
                <Typography variant='h6' minWidth='75px'>4 Stars</Typography>
                <ProgressStyled variant="determinate" value={getStarValue(starsObj.fourStar)} />
              </Box>
              <Box display='flex' alignItems="center">
                <Typography variant='h6' minWidth='75px'>3 Stars</Typography>
                <ProgressStyled variant="determinate" value={getStarValue(starsObj.threeStar)} />
              </Box>
              <Box display='flex' alignItems="center">
                <Typography variant='h6' minWidth='75px'>2 Stars</Typography>
                <ProgressStyled variant="determinate" value={getStarValue(starsObj.twoStar)} />
              </Box>
              <Box display='flex' alignItems="center">
                <Typography variant='h6' minWidth='75px'>1 Stars</Typography>
                <ProgressStyled variant="determinate" value={getStarValue(starsObj.oneStar)} />
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