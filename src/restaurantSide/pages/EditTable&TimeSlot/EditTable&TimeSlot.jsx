import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TableOverview from '../../components/TableOverview';
import TableList from '../../components/TableList';
import { 
  Box, 
  Button, 
  Chip, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoxStyled } from './styled';
import { daysOfWeek } from '../../utils/constants';
import { secondary } from '../../../theme/colors';

export default function EditTableTimeSlot() {
  return (
    <Sidebar>
      <Box 
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        width="100%" 
        mx={4}
      >
        <TableOverview />
        <BoxStyled 
          display="flex" 
          flexDirection="column" 
          gap={2}
          p={2} 
          width="100%"
        >
          <Grid container columnSpacing={4}>
            <Grid item xs={8}>
              <TextField 
                color="secondary"
                placeholder="Search by table number"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl color="secondary" fullWidth>
                <InputLabel id="filter">Filter</InputLabel>
                <Select
                  labelId="filter"
                  color='secondary'
                  variant='outlined'
                  fullWidth
                  label="Filter"
                >
                  <MenuItem value='available'>Status: Available</MenuItem>
                  <MenuItem value='unavailable'>Status: Unavailable</MenuItem>
                  <MenuItem value='table'>Table</MenuItem>
                  <MenuItem value='type'>Type</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Button color="secondary" variant="contained" sx={{height: '100%'}}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <TableList />
        </BoxStyled>
        <BoxStyled 
          display="flex" 
          flexDirection="column" 
          gap={2} 
          width="100%" 
          p={2} 
          mt={2}
        >
          <Typography variant="h6">Time Slots</Typography>
          <FormControl id="time-slot-label">
            <Select
              labelId="time-slot-label"
              color="secondary"
            >
              
            </Select>

          </FormControl>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle1">Select days of the week you want to add time slot</Typography>
            <Box display="flex" gap={2} width="100%">
              {
                daysOfWeek && daysOfWeek.map((day, index) => {
                  return <Chip
                    color="secondary"
                    key={index} 
                    label={day} 
                    variant="outlined"
                    sx={{
                      width: '100%',
                      '&:hover': {
                        backgroundColor: secondary,
                        color: 'white'
                      }
                    }} 
                  />
                })
              }
            </Box>
          </Box>
        </BoxStyled>
      </Box>
    </Sidebar>
  )
}
