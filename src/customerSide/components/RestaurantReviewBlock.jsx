import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Grid, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { primary } from '../../theme/colors';
import { fetchDoc } from '../../utils/firebase';
import { SplashScreen } from '../../lib/utils';
import moment from 'moment/moment';

const RestaurantReviewBlock = ({ data }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUserData(data.userId)
    }, [data.userId])

    const fetchUserData = async (userId) => {
        try {
            const fetchResult = await fetchDoc('users', userId)
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
                    <Avatar sx={{ height: 45, width: 45 }} alt='User Profile Pics' src={userData.avatar} />
                    <Box ml={1}>
                        <Typography variant='subtitle1' fontWeight='bold'>{userData.name}</Typography>
                        <Typography variant='subtitle2'>{moment(data.postTime.toDate()).fromNow()}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={3}>
                    <Box display={'flex'} alignItems="center">
                        <Typography variant='h6' sx={{ marginRight: '10px' }}>{data.stars}</Typography>
                        <Rating name="Overall rating" value={data.stars} precision={0.5} size='large' sx={{ color: primary }} readOnly />
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
    data: PropTypes.object,
}

export default RestaurantReviewBlock