import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Avatar,
    Typography,
    Button
} from '@mui/material';
import { HeaderLogo } from './styled'
import { Link } from 'react-router-dom';
import PersonPin from '@mui/icons-material/PersonPin';

const headerPages = ['Merchant Login'];
const settings = ['Profile', 'Logout'];


function CustomerHeader() {
    return (
        <Box
            display='flex'
            flexDirection='row'
            height={100}
        >
            <AppBar
                position='static'
                color='background'
            >
                <Toolbar>
                    <Box
                        display='flex'
                        flexDirection='row'
                    >
                        <HeaderLogo
                            src='/customerLogo.png'
                            alt='Customer Logo'
                            style={{ mr: '200', mt: '20px' }}
                        />
                    </Box>
                    <PersonPin color='primary' sx={{ fontSize: 40, ml: '25px', mt: '10px' }} />
                    <Box
                        display='flex'
                        alignItems='center'
                        ml='auto'
                        justifyContent='center'
                        mt={2}
                    >
                        <Link component='button' to='/' >
                            Merchant Login
                        </Link>

                        <IconButton color='inherit' sx={{ ml: '20px', }}>
                            <Avatar alt='User Settings' src='/path/to/user-avatar.png' />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default CustomerHeader;