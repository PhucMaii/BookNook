import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Grid, Modal, Rating, TextField, Typography } from '@mui/material'
import { primary } from '../../../theme/colors';
import { Timestamp, addDoc, collection} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import Notification from '../../../restaurantSide/components/Notification';

const ReviewCreateModal = ({ data, uid, restaurantId, onChange }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [notification, setNotification] = useState({})
    const [starValue, setStarValue] = useState(0)
    const [message, setMessage] = useState('')


    const myTimestamp = Timestamp.fromDate(new Date());

    const uploadData = async () => {
        try {
            await addDoc(collection(db, 'reviews'), {
                message: message,
                postTime: myTimestamp,
                reply: '',
                restaurantId: restaurantId,
                stars: starValue,
                userId: uid
            })
                .then(() => {
                    setNotification({
                        on: true,
                        severity: 'success',
                        message: 'Your review posted successfully!.'
                    })
                })
                onChange();
        } catch (error) {
            console.log('Fail to upload review: ', error)
            setNotification({
                on: true,
                severity: 'error',
                message: 'Failed to upload Review.'
            })
        }
    }

    return (
        <>
            <Notification
                notification={notification}
                onClose={() => setNotification({ ...notification, on: false })}
            />
            <Button onClick={handleOpen}>WRITE A REVIEW</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Grid spacing={2} container sx={{
                    backgroundColor: 'white',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    p: 2,
                    m: 'auto'
                }}>
                    <Grid container item alignItems='center' gap={2}>
                        <Avatar sx={{ height: 56, width: 56 }} alt='User Profile Pics' src={data.avatar} />
                        <Typography variant='h6'>{data.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>Rating for restaurant</Typography>
                    </Grid>
                    <Grid container item>
                        <Rating
                            sx={{ color: primary }}
                            name="Rating"
                            value={starValue}
                            onChange={(event, newValue) => {
                                setStarValue(newValue);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>Describe your experience</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={6}
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid container item justifyContent='flex-end'>
                        <Grid item>
                            <Button variant='contained' sx={{ color: 'white' }}
                                onClick={() => {
                                    uploadData()
                                    handleClose()
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}

ReviewCreateModal.propTypes = {
    data: PropTypes.object,
    uid: PropTypes.string,
    restaurantId: PropTypes.string,
    onChange: PropTypes.func
}

export default ReviewCreateModal