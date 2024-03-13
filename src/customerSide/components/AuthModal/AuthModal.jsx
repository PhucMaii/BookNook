import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Tab, Tabs } from '@mui/material';
import { BoxStyled } from '../../../restaurantSide/components/Modals/styled'
import EditProfileProps from '../../../restaurantSide/pages/settings/EditProfileProps';
import Panel from '../../../restaurantSide/pages/settings/Panel';
import LoginSection from '../../pages/auth/LoginSection';
import SignupSection from '../../pages/auth/SignupSection';

export default function AuthModal({
  open,
  onClose
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Modal open={open} onClose={onClose}>
      <BoxStyled p={4}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Sign in" {...EditProfileProps(0)} />
            <Tab label="Sign up" {...EditProfileProps(1)} />
          </Tabs>
          <Box display="flex" flexDirection="column">
            <Panel value={value} index={0}>
              <LoginSection />
            </Panel>
            <Panel>
              <SignupSection />
            </Panel>
          </Box>
        </Box>
      </BoxStyled>
    </Modal>
  );
}

AuthModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}