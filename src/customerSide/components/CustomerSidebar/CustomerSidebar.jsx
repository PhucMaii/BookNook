import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl
} from '@mui/material';
import { restaurantTypes, averagePrices, tableTypes } from '../../../utils/constants';
import { ratings } from '../../utils/constants'

const CustomerSidebar = () => {
    const [showMore, setShowMore] = useState(false);
    const initialOptions = restaurantTypes.slice(0, 2);
    const [selectedTypes, setSelectedTypes] = useState(initialOptions);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    const handleTypeChange = (type) => {
        const index = selectedTypes.indexOf(type);
        if (index === -1) {
            if (selectedTypes.length < 2) {
                setSelectedTypes([...selectedTypes, type]);
            }
        } else {
            setSelectedTypes(selectedTypes.filter((item) => item !== type));
        }
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            style={{
                backgroundColor: 'background',
            }}
            width={200}
            ml={10}
            borderRadius={2}
            pl={2}
            mt={6}
        >
            <Typography
                variant='h5'
                fontWeight='bold'
                mb={2}
                pt={2}
            >
                Filters
            </Typography>
            <Typography
                variant='body1'
                fontWeight='bold'
            >
                Cuisine
            </Typography>
            <FormGroup>
                {selectedTypes.map((type, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox />}
                        label={type}
                        onChange={() => handleTypeChange(type)}
                    />
                ))}
                {showMore && (
                    restaurantTypes.slice(2).map((type, index) => (
                        <FormControlLabel
                            key={index + initialOptions.length}
                            control={<Checkbox />}
                            label={type}
                            onChange={() => handleTypeChange(type)}
                        />
                    ))
                )}
            </FormGroup>
            {restaurantTypes.length > 2 && (
                <Button onClick={handleShowMore} color='primary'>
                    {showMore ? 'Show Less' : 'Show More'}
                </Button>
            )}
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
                {tableTypes.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox />}
                        label={option}
                    />
                ))}
            </Box>
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
                {averagePrices.map((range, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox />}
                        label={range}
                    />
                ))}
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
                            {ratings.map((rating, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={rating}
                                    control={<Radio />}
                                    label={rating}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default CustomerSidebar;