import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Grid, Modal, Rating, TextField, Typography } from '@mui/material'
import { dummyAvatar } from '../../../../utils/constants';
import { primary } from '../../../../theme/colors';

const ReviewCreateModal = props => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    m:'auto'
                }}>
                    <Grid container item alignItems='center' gap={2}>
                        <Avatar sx={{ height: 56, width: 56 }} alt='User Profile Pics' src={dummyAvatar} />
                        <Typography variant='h6'>Remy Random</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>Rating for restaurant</Typography>
                    </Grid>
                    <Grid container item>
                        <Rating name="Overall rating" value={4.5} precision={0.5} size='large' sx={{ color: primary, borderColor: primary }} />
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>Describe your experience</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={6}/>
                    </Grid>
                    <Grid container item justifyContent='flex-end'>
                        <Grid item>
                            <Button variant='contained' sx={{color:'white'}}>Submit</Button>
                        </Grid>                       
                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}

ReviewCreateModal.propTypes = {}

export default ReviewCreateModal