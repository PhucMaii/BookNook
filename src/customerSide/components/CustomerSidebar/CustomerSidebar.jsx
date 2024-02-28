import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Radio,
    RadioGroup,
    FormControl
} from '@mui/material';

const CustomerSidebar = () => {

    const [cuisineShowMore, setCuisineShowMore] = useState(false);

    const handleCuisineShowMore = () => {
        setCuisineShowMore(!cuisineShowMore)
    }

    return (
        <>
            <Grid>
                <Box
                    display='flex'
                    flexDirection='column'
                    style={{
                        backgroundColor: 'background',
                    }}
                    width={150}
                    ml={30}
                    borderRadius={2}
                    pl={2}
                >
                    <Box mb={2} pt={2}>
                        <Typography
                            variant='h5'
                            fontWeight='bold'
                        >
                            Filters
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                        >
                            Cuisine
                        </Typography>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label='Asian' />
                                <FormControlLabel control={<Checkbox />} label='Chinese' />
                                {cuisineShowMore && (
                                    <>
                                        <FormControlLabel control={<Checkbox />} label='Vietnamese' />
                                        <FormControlLabel control={<Checkbox />} label='Japanese' />
                                        <FormControlLabel control={<Checkbox />} label='Indian' />
                                        <FormControlLabel control={<Checkbox />} label='Italian' />
                                        <FormControlLabel control={<Checkbox />} label='French' />
                                        <FormControlLabel control={<Checkbox />} label='Fast Food' />
                                        <FormControlLabel control={<Checkbox />} label='Other' />
                                    </>
                                )}
                            </FormGroup>
                        </Box>
                        <Button onClick={handleCuisineShowMore} color='primary'>
                            {cuisineShowMore ? 'See Less' : 'See More'}
                        </Button>
                    </Box>
                    <Box>
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                        >
                            Seating Options
                        </Typography>
                        <Box
                            display='flex'
                            flexDirection='column'
                        >
                            <FormControlLabel control={<Checkbox defaultChecked />} label='Bar' />
                            <FormControlLabel control={<Checkbox />} label='Counter' />
                            <FormControlLabel control={<Checkbox />} label='Standard' />
                            <FormControlLabel control={<Checkbox />} label='Indoor' />
                            <FormControlLabel control={<Checkbox />} label='Outdoor' />
                            <FormControlLabel control={<Checkbox />} label='High Top' />
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                        >
                            Price
                        </Typography>
                        <Box
                            display='flex'
                            flexDirection='column'
                        >
                            <FormControlLabel control={<Checkbox defaultChecked />} label='Less than $25' />
                            <FormControlLabel control={<Checkbox />} label='$25 - $50' />
                            <FormControlLabel control={<Checkbox />} label='$50 - $100' />
                            <FormControlLabel control={<Checkbox />} label='$100 - $200' />
                            <FormControlLabel control={<Checkbox />} label='Greater than $200' />
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            variant='body1'
                            fontWeight='bold'
                        >
                            Rating
                        </Typography>
                        <Box pb={3}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="1 Star" control={<Radio />} label="1 Star" />
                                    <FormControlLabel value="2 Stars" control={<Radio />} label="2 Stars" />
                                    <FormControlLabel value="3 Stars" control={<Radio />} label="3 Stars" />
                                    <FormControlLabel value="4 Stars" control={<Radio />} label="4 Stars" />
                                    <FormControlLabel value="5 Stars" control={<Radio />} label="5 Stars" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default CustomerSidebar;