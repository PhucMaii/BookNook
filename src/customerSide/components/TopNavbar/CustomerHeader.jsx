import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
} from '@mui/material';
import { HeaderLogo } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import PersonPin from '@mui/icons-material/PersonPin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { AuthContext } from '../../context/AuthContext';

function CustomerHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { customerIds } = useContext(AuthContext);

  useEffect(() => {
    if (customerIds.uid && customerIds.docId) {
      setIsLogin(true);
    }
  }, [customerIds]);

  const handleSignout = async () => {
    try {
      if (isLogin) {
        await signOut(auth);
      }
      navigate('/customer/login');
    } catch (error) {
      console.log('Fail to sign out: ', error);
    }
  };

  const handleProfile = async () => {
    try {
      if (isLogin) {
        await signOut(auth);
      }
      navigate('/customer/setting');
    } catch (error) {
      console.log('Fail to sign out: ', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height={100}>
      <AppBar position="static" color="background">
        <Toolbar>
          <HeaderLogo
            src="/customerLogo.png"
            alt="Customer Logo"
            style={{ mr: '200' }}
            onClick={() => navigate('/')}

          />
          <PersonPin color="primary" sx={{ fontSize: 40, ml: '25px' }} />
          <Box
            display="flex"
            alignItems="center"
            ml="auto"
            justifyContent="center"
            mt={2}
            gap={2}
          >
            <Link component="button" to="/restaurant/login">
              Merchant Login
            </Link>

            {isLogin ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ ml: '20px' }}
                >
                  <Avatar alt="User Settings" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleSignout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    Sign out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/customer/login')}
                variant="contained"
                sx={{color: 'white'}}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomerHeader;
