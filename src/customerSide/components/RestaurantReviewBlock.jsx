import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Rating, Select, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { dummyAvatar } from '../../utils/constants';
import { Box } from '@mui/system';
import { primary } from '../../theme/colors';
import ReviewCreateModal from './Modals/ReviewCreateModal/ReviewCreateModal';

const RestaurantReviewBlock = ({reviews}) => {
    return (
        <>
            <Grid container justifyContent='space-between' spacing={2} alignItems='center'>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id='filter' color='secondary'>Filter</InputLabel>
                        <Select
                            color='secondary'
                            labelId='filter'
                            id='filter-select'
                            label='Filter'>
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
                        placeholder='Hit ENTER to search name, table name, etc.'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ReviewCreateModal/>
                </Grid>
            </Grid>

                        {/* Map through the comment data with layout below */}
            <Grid container justifyContent='space-between'>
                <Grid container item xs={3} direction='row' alignItems='center' justifyContent='center'>
                    <Avatar sx={{ height: 56, width: 56 }} alt='User Profile Pics' src={dummyAvatar} />
                    <Box ml={1}>
                        <Typography variant='subtitle1' fontWeight='bold'>Remy Random</Typography>
                        <Typography variant='subtitle2'>1 hour ago</Typography>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box display={'flex'} alignItems="center">
                        <Rating name="Overall rating" value={4.5} precision={0.5} size='large' sx={{ color: primary }} readOnly />
                        <Typography variant='h6' sx={{ marginLeft: '5px' }}>4.5</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} p={2}>
                    <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia consequuntur nisi voluptate perspiciatis quod suscipit aliquid exercitationem eius, repellendus necessitatibus natus ullam officiis accusamus cupiditate quaerat rerum aspernatur totam.</Typography>
                </Grid>
            </Grid>
        </>
    )
}

RestaurantReviewBlock.propTypes = {
    reviews:PropTypes.array
}

export default RestaurantReviewBlock