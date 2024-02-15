import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import TableOverview from '../components/TableOverview';
import TableList from '../components/TableList';
import { 
  Box, 
  Button, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
        <Box 
          display="flex" 
          flexDirection="column" 
          gap={2} 
          p={2}
          width="100%"
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            }}
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
        </Box>

      </Box>
    </Sidebar>
  )
}
