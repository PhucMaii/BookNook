import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Divider, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import CustomerHeader from '../../components/TopNavbar/CustomerHeader'
import AddressInput from '../../../restaurantSide/components/AddressInput'
import UpdateUserPicture from '../../components/Modals/UpdateUserPicture'
import { AuthContext } from '../../context/AuthContext'
import { fetchDoc } from '../../../utils/firebase'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { auth, db } from '../../../../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { fetchLatLong } from '../../../utils/location'
import Notification from '../../../restaurantSide/components/Notification'
import { SplashScreen } from '../../../lib/utils'
import { LoadingButton } from '@mui/lab'

const UserSettingPage = () => {
    const [address, setAddress] = useState({ description: '' });
    const [imgURL, setImgURL] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [showSettingsOldPassword, setSettingsOldPassword] = useState(false);
    const [showSettingsNewPassword, setSettingsNewPassword] = useState(false);
    const [showSettingsConfirmPassword, setSettingsConfirmPassword] = useState(false);
    const [notification, setNotification] = useState({})
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

    const { customerIds: { docId } } = useContext(AuthContext)

    useEffect(() => {
        if (docId) {
            fetchUserData()
            setModalClosed(false);
        }
    }, [docId, modalClosed])

    const fetchUserData = async () => {
        try {
            const fetchResult = await fetchDoc('users', docId)
            const userData = fetchResult.docData

            setAddress({ description: userData.address.description })
            setEmail(userData.email)
            setImgURL(userData.avatar)
            console.log(imgURL,'  image')
            setName(userData.name)

            const nameArr = name.split(' ')
            if (nameArr.length > 1) {
                setFirstName(nameArr[0])
                setFirstName(nameArr[1])
            } else {
                setFirstName(name)
            }

            setIsLoading(false)
        } catch (error) {
            console.log('ERROR: ' + error);
            setIsLoading(false)
        }
    }

    const uploadData = async () => {
        try {
            setIsUploading(true)
            const fullName = `${firstName} ${lastName}`;
            const location = await fetchLatLong(address.description);

            const updatedAddress = { description: address.description, ...location };
            const submittedData = {...updateData, name: fullName, address: updatedAddress, imgURL};
            console.log(submittedData, 'sunmittedData');
            const userRef = doc(db, 'users', docId);

            updateDoc(userRef, submittedData)
            .then(() => {
                setNotification({
                    on: true,
                    severity: 'success',
                    message: 'Updated your info successfully.'
                })
            })
            setUpdateData({ ...updateData, name: fullName })
            setIsUploading(false);
            setImgURL(submittedData.imgURL);
            setName(submittedData.name);
        } catch (error) {
            console.log('Error: ' + error)
            setNotification({
                on: true,
                severity: 'error',
                message: 'Failed to update info.'
            })
            setIsUploading(false)
        }
    }

    const updateUserPassword = async () => {
        try {
            setIsUploading(true)
            const user = auth.currentUser;
            // Reauthenticate the user before updating the password
            const credential = EmailAuthProvider.credential(
                user.email,
                oldPassword
            );
            await reauthenticateWithCredential(user, credential);

            if (newPassword !== confirmPassword) {
                setNotification({
                    on: true,
                    severity: 'error',
                    message: 'Confirm password and new password are not same.',
                })
                throw new Error('New password and confirm password do not match.');
            }

            await updatePassword(user, newPassword);
            // Clear the password fields after successful update
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setNotification({
                on: true,
                severity: 'success',
                message: 'Password updated successfully.',
            });
            setIsUploading(false)
        } catch (error) {
            console.error('Password update error:', error.message);

            setNotification({
                on: true,
                severity: 'error',
                message: error.message,
            });
            setIsUploading(false)
        }
    };

    if (isLoading) {
        return (
            <>
                <SplashScreen />
            </>
        );
    }

    return (
        <>
            <CustomerHeader />
            <Notification
                notification={notification}
                onClose={() => setNotification({ ...notification, on: false })}
            />
            <Grid container direction='column' maxWidth={1200} m='auto' p={2} rowSpacing={2}>
                <Grid item xs={3} justifyContent='flex-start'>
                    <Typography variant='h4' fontWeight='bold'>User Profile</Typography>
                    <Divider sx={{ maxWidth: '200px' }} />
                </Grid>

                <Grid container item alignItems='center' justifyContent='space-between'>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 96, height: 96 }} alt='User profile picture' src={imgURL} />
                    </Grid>
                    <Grid container item direction='column' justifyContent='flex-start' xs={8.5}>
                        <Grid item>
                            <Typography variant='h4' fontWeight='bold'>{name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2} mt={2}>
                        <UpdateUserPicture imgURL={imgURL} onClose={() => { handleModalClose() }} />
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
                        <TextField fullWidth id='firstName' label='First Name'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth id='lastName' label='Last Name'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth id='email' label='E-Mail Address'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setUpdateData({ ...updateData, email: e.target.value })
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AddressInput
                            onDataReceived={(data) => setAddress(data)}
                            initialValue={address} />
                    </Grid>
                    <Grid item xs={12} textAlign='right'>
                        <LoadingButton
                            loading={isUploading}
                            loadingIndicator='Uploading...'
                            variant='contained'
                            sx={{ color: 'white' }}
                            onClick={uploadData}
                        >
                            Save
                        </LoadingButton>
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
                        <OutlinedInput
                            fullWidth
                            id="old-password"
                            type={
                                showSettingsOldPassword ? 'text' : 'password'
                            }
                            onChange={(e) => { setOldPassword(e.target.value) }}
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
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6' fontWeight='bold'>New Password: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <OutlinedInput
                            fullWidth
                            value={newPassword}
                            id="new-password"
                            type={
                                showSettingsNewPassword ? 'text' : 'password'
                            }
                            onChange={(e) => { setNewPassword(e.target.value) }}
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
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6' fontWeight='bold'>Confirm Password: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <OutlinedInput
                            fullWidth
                            value={confirmPassword}
                            id="confirm-password"
                            type={
                                showSettingsConfirmPassword
                                    ? 'text'
                                    : 'password'
                            }
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
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
                    </Grid>
                    <Grid item xs={12} textAlign='right'>
                        <LoadingButton
                            loading={isUploading}
                            loadingIndicator='Updating'
                            variant='contained'
                            sx={{ color: 'white', minWidth: '100px' }}
                            onClick={updateUserPassword}
                        >Change Password</LoadingButton>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}

UserSettingPage.propTypes = {}

export default UserSettingPage