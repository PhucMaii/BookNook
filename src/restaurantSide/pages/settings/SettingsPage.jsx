import React, { useContext, useState } from 'react';
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
import { collection, doc, query, updateDoc} from 'firebase/firestore';
import { SplashScreen } from '../../../lib/utils';
import { auth, db } from '../../../../firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { fetchDoc } from '../../utils/firebase';
import Notification from '../../components/Notification';
import EditImageModal from '../../components/Modals/EditImageModal';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function SettingsPage() {
    const [_address, setAddress] = useState({description: ''});
    const [imgURL, setImgURL] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email,setEmail] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [currentPassword, setCurrentPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [showSettingsOldPassword, setSettingsOldPassword] = useState(false);
    const [showSettingsNewPassword, setSettingsNewPassword] = useState(false);
    const [showSettingsConfirmPassword, setSettingsConfirmPassword] = useState(false);
    const [notification,setNotification] = useState({})
    const [modalClosed, setModalClosed] = useState(false);
    const [updateData, setUpdateData] = useState({
      name: null,
      phoneNumber: null,
      email: null,
      address: null
    });

    const handleModalClose = () => {
      setModalClosed(true);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {restaurantIds} = useContext(AuthContext);

    useEffect(() => {
      if (restaurantIds.docId) {
        fetchHostData()
        setModalClosed(false);
      }
    },[restaurantIds, modalClosed])
    
    const fetchHostData = async () => {
      setIsLoading(true);
      try {
        const fetchResult = await fetchDoc('restaurants',restaurantIds.docId)
        const hostData = fetchResult.docData

        setAddress({description: hostData.address})
        setEmail(hostData.email)
        setImgURL(hostData.imgURL)
        setName(hostData.name)
        setPhoneNumber(hostData.phoneNumber)
        setImgURL(hostData.imgURL)

        setIsLoading(false)
      } catch (error) {
        console.log('ERROR: ' + error)
      }
    }
    
    const uploadData = async() => {
      try {
        updateData.address = _address.description
        const hostRef = doc(db,'restaurants',restaurantIds.docId)
        const submitData = {};
        Object.keys(updateData).map((key) => {
          if (updateData[key]) {
            submitData[key] = updateData[key];
          }
        })
        console.log(submitData,'submitData')
        updateDoc(hostRef, submitData)
          .then(() => {
            setNotification({
              on: true,
              severity: 'success',
              message: 'Updated your info successfully.'
            })
          })
      } catch (error) {
        console.log('Error: ' + error)
        setNotification({
          on: true,
          severity: 'error',
          message: 'Failed to update info.'
        })
      }
    }

    const updateHostPassword = async () => {
      try {
        const user = auth.currentUser;
        // Reauthenticate the user before updating the password
        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        await reauthenticateWithCredential(user, credential);
        if (newPassword != confirmPassword) {
          setNotification({
            on: true,
            severity: 'error',
            message: 'Failed to update password. Confirm password and new password are not same.',
          });
        }else{
          await updatePassword(user, newPassword);
        }
    
        // Clear the password fields after successful update
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    
        setNotification({
          on: true,
          severity: 'success',
          message: 'Password updated successfully.',
        });
      } catch (error) {
        console.error('Password update error:', error.message);
    
        setNotification({
          on: true,
          severity: 'error',
          message: 'Failed to update password. Please check your current password.',
        });
      }
    };

    if (isLoading) {
      return (
        <Sidebar>
          <SplashScreen />
        </Sidebar>
      );
    }

    return (
      <ProtectedRoute>
        <Sidebar>
          <Notification
            notification={notification}
            onClose={() => setNotification({ ...notification, on: false })}
          />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                flexDirection="column"
                height={300}
                style={{
                  backgroundImage: `url(${imgURL})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Box display="flex" justifyContent="center" mt={15}>
                  <EditImageModal
                  imgURL={imgURL} 
                  onClose={() => {
                    handleModalClose();
                  }}/>
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
                        textColor="secondary"
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
                                Restaurant Name:
                              </Typography>
                              <Typography variant="h6">
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
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value)
                                  setUpdateData({...updateData, name: e.target.value})
                                }}
                              />
                              <TextField
                                type="number"
                                id="Phone Number"
                                color="secondary"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value)
                                  setUpdateData({...updateData, phoneNumber:e.target.value})
                                }}
                              />
                              <TextField
                                id="Email"
                                color="secondary"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value)
                                  setUpdateData({...updateData, email: e.target.value})
                                }}
                              />
                              <AddressInput
                                onDataReceived={(data) => setAddress(data)}
                                initialValue= {_address}
                              />
                            </Box>
                          </Grid>
                        </Box>
                        <Box display="flex" justifyContent="end" mt={3} mr={5}>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: '10%', height: '105%' }}
                            onClick={uploadData}
                          >
                            Save
                          </Button>
                        </Box>
                      </SettingsPagePanel>
                      <SettingsPagePanel value={value} index={1}>
                        <Box display="flex" flexDirection="row" mb={5}>
                          <Grid item md={4}>
                            <Box
                              display="flex"
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
                          <Grid item md={8}>
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
                                onChange={(e) => {setOldPassword(e.target.value)}}
                                color="secondary"
                                value={oldPassword}
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
                                value={newPassword}
                                id="new-password"
                                type={
                                  showSettingsNewPassword ? 'text' : 'password'
                                }
                                onChange={(e) => {setNewPassword(e.target.value)}}
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
                              value={confirmPassword}
                                id="confirm-password"
                                type={
                                  showSettingsConfirmPassword
                                    ? 'text'
                                    : 'password'
                                }
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
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
                            onClick={updateHostPassword}
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
