import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Avatar
} from '@mui/material';
import { HeaderLogo } from './styled'
import { Link } from 'react-router-dom';
import PersonPin from '@mui/icons-material/PersonPin';

function CustomerHeader() {
    return (
        <Box
            display='flex'
            flexDirection='column'
            height={100}
        >
            <AppBar
                position='static'
                color='background'
            >
                <Toolbar>
                    <HeaderLogo
                        src='/customerLogo.png'
                        alt='Customer Logo'
                        style={{ mr: '200' }}
                    />
                    <PersonPin color='primary' sx={{ fontSize: 40, ml: '25px' }} />
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
                            <Avatar alt='User Settings' />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default CustomerHeader;