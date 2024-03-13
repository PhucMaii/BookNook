import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Rating, Select, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { dummyAvatar } from '../../utils/constants';
import { Box } from '@mui/system';
import { primary } from '../../theme/colors';
import ReviewCreateModal from './Modals/ReviewCreateModal/ReviewCreateModal';
import { fetchDoc } from '../../utils/firebase';
import { SplashScreen } from '../../lib/utils';
import { convertTimestampToDate } from '../../utils/time';
import moment from 'moment/moment';

const RestaurantReviewBlock = ({ data }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUserData()
    },[])

    const fetchUserData = async () => {
        try {
            const fetchResult = await fetchDoc('users', data.userId)
            setUserData(fetchResult.docData)
            setIsLoading(false)
        } catch (error) {
            console.log('Fail to get user info: ', error)
            setIsLoading(false)
        }
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
            {/* Map through the comment data with layout below */}
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid container item xs={9} p={1} direction='row' alignItems='center' justifyContent='flex-start'>
                    <Avatar sx={{ height: 56, width: 56 }} alt='User Profile Pics' src={userData.avatar} />
                    <Box ml={1}>
                        <Typography variant='subtitle1' fontWeight='bold'>{userData.name}</Typography>
                        <Typography variant='subtitle2'>{moment(data.postTime.toDate()).fromNow()}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={3}>
                    <Box display={'flex'} alignItems="center">
                        <Rating name="Overall rating" value={data.stars} precision={0.5} size='large' sx={{ color: primary }} readOnly />
                        <Typography variant='h6' sx={{ marginLeft: '5px' }}>{data.stars}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} p={2}>
                    <Typography variant='body2'>{data.message}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

RestaurantReviewBlock.propTypes = {
    data: PropTypes.object
}

export default RestaurantReviewBlock