import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import CustomerHeader from '../../components/TopNavbar/CustomerHeader'
import { dummyAvatar } from '../../../utils/constants'
import AddressInput from '../../../restaurantSide/components/AddressInput'
import UpdateUserPicture from '../../components/Modals/UpdateProfilePictureModal.jsx/UpdateUserPicture'

const UserSettingPage = props => {
    const [_address, setAddress] = useState('');

    return (
        <>
            <CustomerHeader />
            <Grid container direction='column' maxWidth={1200} m='auto' p={2} rowSpacing={2}>
                <Grid item xs={3} justifyContent='flex-start'>
                    <Typography variant='h4' fontWeight='bold'>User Profile</Typography>
                    <Divider sx={{ maxWidth: '200px'}} />
                </Grid>

                <Grid container item alignItems='center' justifyContent='space-between'>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 96, height: 96 }} alt='User profile picture' src={dummyAvatar} />
                    </Grid>
                    <Grid container item direction='column' justifyContent='flex-start' xs={8.5}>
                        <Grid item>
                            <Typography variant='h4' fontWeight='bold'>Random Guy</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h5'>Burnaby,BC</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2} mt={2}>
                        <UpdateUserPicture/>
                    </Grid>
                </Grid>

                <Grid item>
                    <Divider />
                </Grid>

                <Grid container item spacing={4}>
                    <Grid item xs={12} justifyContent='flex-start'>
                        <Typography variant='h4' fontWeight='bold'>General</Typography>
                    </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth id='firstName' label='First Name' value={'Random'} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth id='lastName' label='Last Name' value={'Guy'} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth id='phoneNumber' label='Phone Number' value={123123} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth id='email' label='E-Mail Address' value={'randomGuy@gmail.com'} />
                        </Grid>
                        <Grid item xs={12}>
                            <AddressInput onDataReceived={(data) => setAddress(data)} />
                        </Grid>
                        <Grid item xs={12} textAlign='right'>
                            <Button variant='contained' sx={{ color: 'white', minWidth: '100px' }}>Save</Button>
                        </Grid>
                </Grid>

                <Grid item>
                    <Divider />
                </Grid>

                <Grid container item spacing={4}>
                    <Grid item xs={12} justifyContent='flex-start'>
                        <Typography variant='h4' fontWeight='bold'>Security</Typography>
                    </Grid>

                        <Grid item xs={6}>
                            <Typography variant='h6' fontWeight='bold'>Old Password: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth id='oldName' type='password'/>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant='h6' fontWeight='bold'>New Password: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth id='newName' type='password'/>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant='h6' fontWeight='bold'>Confirm Password: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth id='confirmName' type='password'/>
                        </Grid>
                        <Grid item xs={12} textAlign='right'>
                            <Button variant='contained' sx={{ color: 'white', minWidth: '100px' }}>Change Password</Button>
                        </Grid>
                </Grid>

            </Grid>
        </>
    )
}

UserSettingPage.propTypes = {}

export default UserSettingPage