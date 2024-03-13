import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Modal, TextField } from '@mui/material';
import { primary } from '../../../../theme/colors';
import { BoxStyled } from '../../../../restaurantSide/components/Modals/styled';

const UpdateUserPicture = props => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="filled"
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
                            />
                        </Grid>
                        <Grid item md={12} mt={'10px'}>
                            <Button
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

UpdateUserPicture.propTypes = {}

export default UpdateUserPicture