import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Modal, TextField } from '@mui/material';
import { BoxStyled } from './styled';

const EditImageModal = ({imgURL}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textBoxContent, setTextBoxContent] = useState(imgURL)

    const updateURL = async () => {
        setIsLoading(true);

        setIsOpen(false);
        setIsLoading(false);
      };

  return (
    <>
     <Button
         variant="filled"
         style={{ color: '#64748B', backgroundColor: blueGrey }}
         onClick={() => setIsOpen(true)}
       >
         CHANGE PICTURE
       </Button>
       <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <BoxStyled p={4} boxShadow={24}>
                <Grid container>
                    <Grid item md = {12}>
                        <TextField id='imgTextfield' label='imgTextfield' variant='standard' />
                    </Grid>
                    <Grid item md = {12}>
                        <Button
                            variant='filled'
                            style={{ color: '#64748B', backgroundColor: blueGrey }}
                            onClick={() => setIsOpen(false)}
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

EditImageModal.propTypes = {}

export default EditImageModal