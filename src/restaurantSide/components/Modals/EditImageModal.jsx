import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Modal, TextField } from '@mui/material';
import { BoxStyled } from './styled';
import { secondary } from '../../../theme/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { AuthContext } from '../../context/AuthContext';

const EditImageModal = ({imgURL, onClose}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hostImage, setHostImage] = useState(imgURL)

    const {restaurantIds} = useContext(AuthContext);

    const updateURL = async () => {
        try {
            const hostRef = doc(db,'restaurants',restaurantIds.docId)
            updateDoc(hostRef, {imgURL: hostImage})
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
         style={{ color: '#ffffff', backgroundColor: secondary }}
         onClick={() => setIsOpen(true)}
       >
         CHANGE PICTURE
       </Button>
       <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <BoxStyled p={2} boxShadow={24}>
                <Grid container style={{ textAlign: 'center' }}>
                    <Grid item md={12}>
                        <TextField
                            id='imgTextfield'
                            label='imgURL'
                            variant='standard'
                            color='secondary'
                            onChange={(e) => setHostImage(e.target.value)}
                            defaultValue={hostImage}
                        />
                    </Grid>
                    <Grid item md = {12} mt={'10px'}>
                        <Button
                            variant='filled'
                            style={{ color: '#ffffff', backgroundColor: secondary }}
                            onClick={updateURL}
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

EditImageModal.propTypes = {
    imgURL: PropTypes.string,
    onClose: PropTypes.func
}

export default EditImageModal