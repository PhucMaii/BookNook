import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Button,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    useMediaQuery,
    Drawer
} from '@mui/material';
import { restaurantTypes, averagePrices, tableTypes } from '../../utils/constants';
import MenuIcon from '@mui/icons-material/Menu';

const FilterSidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSeatingOptions, setSelectedSeatingOptions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [rating, setRating] = useState();

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (props.onDataReceived) {
      const filterOptions = handleFilterSearch();
      props.onDataReceived(filterOptions);
    }
  }, [selectedTypes, selectedSeatingOptions, selectedPrice, rating]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSelectedCheckBox = (targetValue, arrayState, setState) => {
    const index = arrayState.indexOf(targetValue);
    if (index === -1) {
      setState([...arrayState, targetValue]);
    } else {
      setState((prevState) => {
        return prevState.filter((value) => value !== targetValue);
      });
    }
  };

  const handleFilterSearch = () => {
    const filterOptions = {};

    if (selectedTypes.length > 0) {
      filterOptions.selectedTypes = selectedTypes;
    }

    if (selectedSeatingOptions.length > 0) {
      filterOptions.selectedSeatingOptions = selectedSeatingOptions;
    }

    if (selectedPrice.length > 0) {
      filterOptions.selectedPrice = selectedPrice;
    }

    if (rating) {
      filterOptions.rating = rating;
    }

    const params = new URLSearchParams(filterOptions).toString();
    return params;
  }

  const sidebar = (
    <Box
      display="flex"
      flexDirection="column"
      minWidth={180}
      style={{
        backgroundColor: 'background',
      }}
      borderRadius={2}
      p={2}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Filters
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        Cuisine
      </Typography>
      <FormGroup>
        {restaurantTypes.slice(0, 2).map((type, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox />}
            label={type}
            onChange={() =>
              handleSelectedCheckBox(type, selectedTypes, setSelectedTypes)
            }
          />
        ))}
        {showMore &&
          restaurantTypes
            .slice(2)
            .map((type, index) => (
              <FormControlLabel
                key={index + 2}
                control={<Checkbox />}
                label={type}
                onChange={() =>
                  handleSelectedCheckBox(type, selectedTypes, setSelectedTypes)
                }
              />
            ))}
      </FormGroup>
      {restaurantTypes.length > 2 && (
        <Button onClick={handleShowMore} color="primary">
          {showMore ? 'Show Less' : 'Show More'}
        </Button>
      )}
      <Typography variant="body1" fontWeight="bold">
        Seating Options
      </Typography>
      <Box display="flex" flexDirection="column">
        {tableTypes.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox />}
            label={option}
            onChange={() =>
              handleSelectedCheckBox(option, selectedSeatingOptions, setSelectedSeatingOptions)
            }
          />
        ))}
      </Box>
      <Typography variant="body1" fontWeight="bold">
        Price
      </Typography>
      <Box display="flex" flexDirection="column">
        {averagePrices.map((range, index) => (
          <FormControlLabel 
            key={index} 
            control={<Checkbox />} 
            label={range} 
            onClick={() => handleSelectedCheckBox(range, selectedPrice, setSelectedPrice)}
          />
        ))}
        <Typography variant="body1" fontWeight="bold">
          Rating
        </Typography>
        <Box pb={3}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {[1, 2, 3, 4, 5].map((star, index) => (
                <FormControlLabel
                  key={index}
                  value={star}
                  control={<Radio />}
                  label={`${star} stars`}
                  onChange={(e) => setRating(e.target.value)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );

  if (mdDown) {
    return (
      <React.Fragment>
        <Button onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon />
        </Button>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        >
          {sidebar}
        </Drawer>
      </React.Fragment>
    );
  }

  return sidebar;
};

FilterSidebar.propTypes = {
  onDataReceived: PropTypes.func
}

export default FilterSidebar;