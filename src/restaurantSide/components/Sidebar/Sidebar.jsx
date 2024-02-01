import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Box, Button, Divider, IconButton, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { blueGrey } from '../../../theme/colors';
import { ListItemButtonStyled } from './styled';
import { drawerWidth, lowerTabs, upperTabs } from '../../utils/constants';

const Sidebar = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  const handleOpenSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleChangeTab = (tab) => {
    navigate(tab.path);
  };

  const content = (
    <>
      <Toolbar sx={{ mt: 4 }}>
        <img
          style={{ maxWidth: '80%', height: 'auto' }}
          alt='Blue Logo'
          src='/blueLogo.JPG'
        />
      </Toolbar>

      <List
        sx={{ width: '100%', maxWidth: 300, bgcolor: 'background', mt: 2 }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <Box display='flex' flexDirection='column' rowGap={2}>
          {upperTabs.map((tab, index) => (
            <ListItemButtonStyled
              $currentTab={currentTab === tab.path}
              key={index}
              onClick={() => handleChangeTab(tab)}
            >
              <ListItemIcon>
                {tab.icon && <tab.icon sx={{ color: 'black' }} />}
              </ListItemIcon>
              <ListItemText primary={tab.name} />
            </ListItemButtonStyled>
          ))}
          <ListItemButtonStyled onClick={handleOpenSettings}>
            <ListItemIcon>
              <SettingsOutlinedIcon sx={{ color: 'black' }} />
            </ListItemIcon>
            <ListItemText primary='Settings' />
            {isSettingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonStyled>
          <Collapse in={isSettingsOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {lowerTabs.map((nestedTab, index) => (
                <ListItemButtonStyled
                  key={index}
                  $currentTab={currentTab === nestedTab.path}
                  sx={{ pl: 10 }}
                  onClick={() => handleChangeTab(nestedTab)}
                >
                  <ListItemText primary={nestedTab.name} />
                </ListItemButtonStyled>
              ))}
            </List>
          </Collapse>
        </Box>
      </List>

      <Divider sx={{ mt: 4 }} />
      <Box sx={{ m: 2, mt: 4 }}>
        <Button
          startIcon={<LogoutIcon />}
          variant='filled'
          fullWidth
          sx={{ backgroundColor: blueGrey }}
        >
          Sign Out
        </Button>
      </Box>
    </>
  );

  if (mdDown) {
    return (
      <>
        <IconButton onClick={() => setIsNavOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Box display='flex' gap={4}>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: 'none',
              },
            }}
            variant='temporary'
            anchor='left'
            open={isNavOpen}
            onClose={() => setIsNavOpen(false)}
          >
            {content}
          </Drawer>
          {children}
        </Box>
      </>
    );
  }

  return (
    <Box display='flex' gap={4}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        {content}
      </Drawer>
      {children}
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
