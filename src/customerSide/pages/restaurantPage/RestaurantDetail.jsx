import { Grid, Typography, Box, Divider, Rating, Paper, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
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
import { where } from 'firebase/firestore';
import SearchIcon from '@mui/icons-material/Search';
import ReviewCreateModal from '../../components/Modals/ReviewCreateModal/ReviewCreateModal';
import { AuthContext } from '../../context/AuthContext';


const RestaurantDetail = () => {
  const [avgStar, setAvgStar] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hostData, setHostData] = useState()
  const [hostReviews, setHostReviews] = useState()
  const [reviewData, setReviewData] = useState();
  const [_reservationFilter, _setReservationFilter] = useState({})
  const [reviewFilter, setReviewFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('');
  const [modalClosed, setModalClosed] = useState(false);
  const [starsObj, setStarsObj] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0
  })
  const [userData, setUserData] = useState()

  const { customerIds: { docId } } = useContext(AuthContext)

  const { restaurantId } = useParams();

  useEffect(() => {
    if (restaurantId) {
      fetchHostData()
      fetchReviews()
    }
    if (docId) {
      fetchUser();
      setModalClosed(false);
    }
  }, [restaurantId, docId, modalClosed])

  useEffect(() => {
    switch (reviewFilter) {
      case 'All': {
        setReviewData(hostReviews);
        break;
      }
      case 'NEWEST': {
        // Sort reviews by timestamp in descending order to get the newest first
        const newestFirst = hostReviews.slice().sort((a, b) => {
          return b.postTime.seconds - a.postTime.seconds || b.postTime.nanoseconds - a.postTime.nanoseconds;
        });
        setReviewData(newestFirst);
        break;
      }
      case 'HIGHEST': {
        // Sort reviews by stars in descending order to get the highest rated first
        const highestFirst = hostReviews.slice().sort((a, b) => b.stars - a.stars);
        setReviewData(highestFirst);
        break;
      }
      case 'LOWEST': {
        // Sort reviews by stars in ascending order to get the lowest rated first
        const lowestFirst = hostReviews.slice().sort((a, b) => a.stars - b.stars);
        setReviewData(lowestFirst);
        break;
      }
      default: {
        setReviewData(hostReviews);
        break;
      }
    }
  }, [reviewFilter, hostReviews]);

  const handleModalClose = () => {
    setModalClosed(true);
  };

  const fetchHostData = async () => {
    try {
      const fetchResult = await fetchDoc('restaurants', restaurantId)
      setHostData({...fetchResult.docData, id: restaurantId})
    } catch (error) {
      console.log('Fail to fetch host data: ', error)
      setIsLoading(false);
    }
  }

  const fetchReviews = async () => {
    try {
      const fetchResult = await fetchData('reviews', where('restaurantId', '==', restaurantId))
      setHostReviews(fetchResult)
      setReviewData(fetchResult)
      processReviews(fetchResult)
      setIsLoading(false);
    } catch (error) {
      console.log('Fail to fetch reviews: ', error)
      setIsLoading(false);
    }
  }

  const processReviews = (reviews) => {
    let totalStar = 0;
    let tempStarsObj = {
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };

    if (!reviews) {
      console.error('Reviews is undefined or null.');
      return;
    }
    reviews.map((reviews) => {
      totalStar += reviews.stars
      switch (reviews.stars) {
        case 1: {
          tempStarsObj.oneStar++
          break;
        }
        case 2: {
          tempStarsObj.twoStar++
          break;
        }
        case 3: {
          tempStarsObj.threeStar++
          break;
        }
        case 4: {
          tempStarsObj.fourStar++
          break;
        }
        case 5: {
          tempStarsObj.fiveStar++
          break;
        }
        default: {
          console.log('Unable to group reviews.')
          break;
        }
      }
    })
    setStarsObj(tempStarsObj);

    const avgStar = parseFloat((totalStar / reviews.length).toFixed(1))
    setAvgStar(avgStar)
  }

  const fetchUser = async () => {
    try {
      const fetchResult = await fetchDoc('users', docId)
      setUserData(fetchResult.docData)
      setIsLoading(false)
    } catch (error) {
      console.log('Fail to fetch user data: ', error)
      setIsLoading(false);
    }
  }

  const getStarValue = (starCount) => {
    if (hostReviews.length === 0) {
      return 0;
    }

    console.log((starCount / hostReviews.length) * 100);
    return (starCount / hostReviews.length) * 100;
  }

  const handleSelect = (e) => {
    setReviewFilter(e.target.value)
  }

  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleSearch = (word) => {
    const filteredReviews = reviewData.filter(item => {
      const itemMessage = item.message.toLowerCase();
      const searchKeyword = word.toLowerCase();
      return itemMessage.includes(searchKeyword) || item.stars == word
    }
    );
    setReviewData(filteredReviews)
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
      <CustomerHeader />
      <img src={hostData.imgURL ? hostData.imgURL : '/unavailable_image.png'} alt='Restaurant picture' width='100%' height='350px' />
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
                  <Typography variant='h4' fontWeight='bold' color={primary}>{avgStar || 0}</Typography>
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
                  <Divider component='span' orientation='vertical'/>
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
          <Typography variant='subtitle2'>{hostData.description || 'N/A'}</Typography>
          <Typography variant='h6' fontWeight='bold'>Reviews</Typography>
          <Divider />
          <Grid container
            justifyContent='space-around'
            alignItems='center'
            mt={2}>
            <Grid item xs={6} container
              direction='column'
              alignItems="space-around"
            >
              <Typography variant='h6' sx={{ marginLeft: '5px' }}>Overall Rating</Typography>
              <Box display={'flex'} alignItems="center">
                <Rating name="Overall rating" value={avgStar || 0} precision={0.1} size='large' sx={{ color: primary, borderColor: primary }} readOnly />
                <Typography variant='h6' sx={{ marginLeft: '5px' }}>{avgStar || 0}</Typography>
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

          <Grid container justifyContent='space-between' spacing={2} alignItems='center'>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id='filter' color='secondary'>Filter</InputLabel>
                <Select
                  color='secondary'
                  labelId='filter'
                  id='filter-select'
                  value={reviewFilter}
                  label='Filter'
                  onChange={handleSelect}>
                  <MenuItem value='ALL'>
                    ALL
                  </MenuItem>
                  <MenuItem value='NEWEST'>
                    NEWEST
                  </MenuItem>
                  <MenuItem value='HIGHEST'>
                    HIGHEST
                  </MenuItem>
                  <MenuItem value='LOWEST'>
                    LOWEST
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                color='secondary'
                fullWidth
                variant='standard'
                placeholder='Hit ENTER to search content or stars.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onInput={(event) => setSearchTerm(event.target.value)}
                onKeyDown={handleKeyDown}
                onChange={() => {
                  setReviewData(hostReviews)
                }}
              />
            </Grid>
            {
              userData && (
                <Grid item xs={3}>
                  <ReviewCreateModal
                    data={userData}
                    uid={docId}
                    restaurantId={restaurantId}
                    onChange={()=>{
                      handleModalClose()
                    }}/>
                </Grid>

              )
            }
          </Grid>
          {/* Review Block */}
          {reviewData.map((review, index) => {
            return <RestaurantReviewBlock key={index} data={review} 
          />
          })}


        </Grid>

        <Grid xs={3.7} item container>
          <Paper sx={{ maxHeight: '50vh', position: 'sticky', top: 0 }}>
            <ReservationMakingBlock restaurantData = {hostData} />
          </Paper>
        </Grid>
      </Grid>
    </>

  )
}

export default RestaurantDetail;