import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Modal, TextField } from '@mui/material';
import { primary } from '../../../theme/colors';
import { BoxStyled } from '../../../restaurantSide/components/Modals/styled';
import { AuthContext } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

const UpdateUserPicture = ({ imgURL, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userImage, setUserImage] = useState(imgURL)

    const { customerIds: { docId } } = useContext(AuthContext)

    const updateURL = async () => {
        try {
            const hostRef = doc(db, 'users', docId)
            updateDoc(hostRef, { avatar : userImage })
            setIsOpen(false)
            onClose();
        } catch (error) {
            console.log('Error: ' + error)
        }
    };


    return (
        <>
            <Button
                variant="filled"
                fullWidth
                style={{ color: '#ffffff', backgroundColor: primary }}
                onClick={() => setIsOpen(true)}
            >
                UPLOAD NEW PHOTO
            </Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <BoxStyled p={2} boxShadow={24}>
                    <Grid container style={{ textAlign: 'center' }}>
                        <Grid item md={12}>
                            <TextField
                                id='imgTextfield'
                                label='imgURL'
                                variant='standard'
                                onChange={(e) => setUserImage(e.target.value)}
                                defaultValue={userImage}
                            />
                        </Grid>
                        <Grid item md={12} mt={'10px'}>
                            <Button
                                onClick={updateURL}
                                variant='filled'
                                style={{ color: '#ffffff', backgroundColor: primary }}
                            >
                                SAVE
                            </Button>
                        </Grid>
                    </Grid>
                </BoxStyled>
            </Modal>
        </>
    )
}

UpdateUserPicture.propTypes = {
    imgURL: PropTypes.string,
    onClose: PropTypes.func
}

export default UpdateUserPicture