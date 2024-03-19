import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Tab, Tabs } from '@mui/material';
import EditProfileProps from '../../../restaurantSide/pages/settings/EditProfileProps';
import Panel from '../../../restaurantSide/pages/settings/Panel';
import LoginSection from '../../pages/auth/LoginSection';
import SignupSection from '../../pages/auth/SignupSection';
import { BoxModal } from './styled';

export default function AuthModal({
  open,
  onClose,
  setNotification
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Modal sx={{overflow: 'scroll'}} open={open}>
      <BoxModal p={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Sign in" {...EditProfileProps(0)} />
            <Tab label="Sign up" {...EditProfileProps(1)} />
          </Tabs>
        </Box>
        <Box display="flex" flexDirection="row" sx={{overflow: 'scroll'}}>
          <Panel sx={{overflow:'scroll'}} value={value} index={0}>
            <LoginSection modal onCloseModal={onClose} setNotification={setNotification} />
          </Panel>
          <Panel sx={{overflow:'scroll'}} value={value} index={1}>
            <SignupSection modal onCloseModal={onClose} setNotification={setNotification}/>
          </Panel>
        </Box>
      </BoxModal>
    </Modal>
  );
}

AuthModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setNotification: PropTypes.func
}