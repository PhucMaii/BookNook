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
import { restaurantTypes, averagePrices, tableTypes } from '../../utils/constants';
import { ratings } from '../utils/constants'

const FilterSidebar = () => {
    const [showMore, setShowMore] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    const handleTypeChange = (targetType) => {
        const index = selectedTypes.indexOf(targetType);
        if (index === -1) {
            setSelectedTypes([...selectedTypes, targetType]);
        } else {
            setSelectedTypes((prevTypes) => {
                return prevTypes.filter((type) => type !== targetType);
            })
        }
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            maxWidth={200}
            style={{
                backgroundColor: 'background',
            }}
            borderRadius={2}
            p={2}
        >
            <Typography
                variant='h5'
                fontWeight='bold'
                mb={2}
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
                {restaurantTypes.slice(0, 2).map((type, index) => (
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
                            key={index + 2}
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

export default FilterSidebar;