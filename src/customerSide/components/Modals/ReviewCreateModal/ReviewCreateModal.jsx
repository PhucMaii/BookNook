import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Grid, Modal, Rating, TextField, Typography } from '@mui/material'
import { dummyAvatar } from '../../../../utils/constants';
import { primary } from '../../../../theme/colors';
import { doc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';

const ReviewCreateModal = ({data}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [starValue, setStarValue] = useState(0)
    const [message, setMessage] = useState('')
    const [reviewData, setReviewData] = useState({
        stars: 0,
        message: ''
    })

    const uploadData = async() => {
        try {
            const reviewRef = doc(db,'reviews',data.docId)
        } catch (error) {
            console.log('Fail to upload data: ',error)
        }
    }

    return (
        <>

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
    data:PropTypes.object
}

export default ReviewCreateModal