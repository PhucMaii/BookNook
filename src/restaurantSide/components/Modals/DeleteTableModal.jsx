import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Modal, Typography } from '@mui/material';
import { BoxStyled } from './styled';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { red } from '@mui/material/colors';

export default function DeleteTableModal({
    open,
    onClose,
    handleDeleteTable
}) {
    const [isOpen, setIsOpen] = useState(open || false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteTableChange = async () => {
        setIsLoading(true);
        await handleDeleteTable();
        setIsLoading(false);
        onClose();
    }
  return (
    <>
      <Button color="error" onClick={() => setIsOpen(true)}>Remove</Button>
      <Modal open={isOpen} onClose={onClose}>
        <BoxStyled
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            p={4} 
            boxShadow={24}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <ErrorOutlineIcon sx={{ fontSize: 80, color: red[800] }} />
            </Box>
            <Typography variant="h4">
                Are you sure to delete this table ?
            </Typography>
            <Box display="flex" gap={4}>
                <Button
                    onClick={onClose} 
                    variant="outlined"
                    sx={{px: 4, py:1}}
                >
                    Cancel
                </Button>
                <Button 
                    sx={{px: 4, py:1}} 
                    color="error" 
                    variant="contained"
                    onClick={handleDeleteTableChange}
                >
                    Remove
                </Button>
            </Box>
        </BoxStyled>
      </Modal>
    </>
  )
}

DeleteTableModal.propTypes = {
    handleDeleteTable: PropTypes.func,
    open: PropTypes.bool,
    onClose: PropTypes.func
}