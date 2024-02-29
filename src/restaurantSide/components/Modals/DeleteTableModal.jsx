import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Modal, Typography } from '@mui/material';
import { BoxStyled } from './styled';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { red } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';

export default function DeleteTableModal({
    handleDeleteTable
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteTableChange = async () => {
        setIsLoading(true);
        await handleDeleteTable();
        setIsLoading(false);
        setIsOpen(false);
    }
  return (
    <>
      <Button color="error" onClick={() => setIsOpen(true)}>Remove</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
                Are you sure to remove this table ?
            </Typography>
            <Box display="flex" gap={4}>
                <Button
                    onClick={() => setIsOpen(false)} 
                    variant="outlined"
                    sx={{px: 4, py:1}}
                >
                    Cancel
                </Button>
                <LoadingButton
                    loading={isLoading}
                    loadingIndicator="Removing" 
                    sx={{px: 4, py:1}} 
                    color="error" 
                    variant="contained"
                    onClick={handleDeleteTableChange}
                >
                    Remove
                </LoadingButton>
            </Box>
        </BoxStyled>
      </Modal>
    </>
  )
}

DeleteTableModal.propTypes = {
    handleDeleteTable: PropTypes.func,
}