import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import {
    Grid,
    Button,
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddressInput from '../../components/AddressInput';
import DummyImage from '/settingsDummyImg.png'
import SettingsPagePanel from './SettingsPagePanel'
import EditProfileProps from './EditProfileProps'
import ProtectedRoute from '../../context/ProtectedRoute';


export default function SettingsPage() {
    const [_address, setAddress] = useState(null);
    const [value, setValue] = useState(0);
    const [showSettingsOldPassword, setSettingsOldPassword] = useState(false);
    const [showSettingsNewPassword, setSettingsNewPassword] = useState(false);
    const [showSettingsConfirmPassword, setSettingsConfirmPassword] = useState(false);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
      <ProtectedRoute>
        <Sidebar>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                flexDirection="column"
                height={300}
                style={{
                  backgroundImage: `url(${DummyImage})`,
                  backgroundSize: 'cover',
                }}
              >
                <Box display="flex" justifyContent="center" mt={15}>
                  <Button variant="contained" color="secondary">
                    Change Picture
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} md={12}>
              <Box
                display="flex"
                alignContent="center"
                flexDirection="column"
                mt={2}
                mx={5}
              >
                <Paper>
                  <Box borderBottom="1" borderColor="divider" mx={3}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs"
                        textColor="black"
                        indicatorColor="secondary"
                      >
                        <Tab label="General" {...EditProfileProps(0)} />
                        <Tab label="Settings" {...EditProfileProps(1)} />
                      </Tabs>
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <SettingsPagePanel value={value} index={0}>
                        <Box display="flex" flexDirection="row" mb={5}>
                          <Grid item md={4}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              my={2}
                              gap={8}
                            >
                              <Typography variant="h6">
                                {' '}
                                Restaurant Name:
                              </Typography>
                              <Typography variant="h6">
                                {' '}
                                Phone Number:
                              </Typography>
                              <Typography variant="h6"> Email:</Typography>
                              <Typography variant="h6">Address:</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={8}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              my={1}
                              gap={5}
                              mr={5}
                            >
                              <TextField
                                id="Restaurant Name"
                                color="secondary"
                              />
                              <TextField
                                type="number"
                                id="Phone Number"
                                color="secondary"
                              />
                              <TextField
                                id="Restaurant Name"
                                color="secondary"
                              />
                              <AddressInput
                                onDataReceived={(data) => setAddress(data)}
                              />
                            </Box>
                          </Grid>
                        </Box>
                        <Box display="flex" justifyContent="end" mt={3} mr={5}>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: '10%', height: '105%' }}
                          >
                            Save
                          </Button>
                        </Box>
                      </SettingsPagePanel>
                      <SettingsPagePanel value={value} index={1}>
                        <Box display="flex" flexDirection="row" mb={5}>
                          <Grid md={4}>
                            <Box
                              display="flex"
                              container
                              spacing={2}
                              flexDirection="column"
                              my={4}
                              gap={8}
                            >
                              <Typography variant="h6">
                                Old Password:
                              </Typography>
                              <Typography variant="h6">
                                New Password:
                              </Typography>
                              <Typography variant="h6">
                                Confirm Password:
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid md={8}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              my={3}
                              gap={5}
                            >
                              <OutlinedInput
                                id="old-password"
                                type={
                                  showSettingsOldPassword ? 'text' : 'password'
                                }
                                color="secondary"
                                value={showSettingsOldPassword}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setSettingsOldPassword((show) => !show)
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showSettingsOldPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              ></OutlinedInput>
                              <OutlinedInput
                                id="old-password"
                                type={
                                  showSettingsNewPassword ? 'text' : 'password'
                                }
                                color="secondary"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setSettingsNewPassword((show) => !show)
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showSettingsNewPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              ></OutlinedInput>
                              <OutlinedInput
                                id="old-password"
                                type={
                                  showSettingsConfirmPassword
                                    ? 'text'
                                    : 'password'
                                }
                                color="secondary"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setSettingsConfirmPassword(
                                          (show) => !show
                                        )
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showSettingsConfirmPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              ></OutlinedInput>
                            </Box>
                          </Grid>
                        </Box>
                        <Box display="flex" justifyContent="end">
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: '10%', height: '105%' }}
                          >
                            Update
                          </Button>
                        </Box>
                      </SettingsPagePanel>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Sidebar>
      </ProtectedRoute>
    );
}
