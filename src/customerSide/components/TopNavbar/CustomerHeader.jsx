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
import PersonPin from '@mui/icons-material/PersonPinCircleOutlined';


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
                mt={2}
            >
                <Toolbar>
                    <Box>
                        <HeaderLogo
                            src='/customerLogo.png'
                            alt='Customer Logo'
                        />

                        <PersonPin />
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                    >
                        <Link component='button' to='/'>
                            Merchant Login
                        </Link>

                        <IconButton color='inherit'>
                            <Avatar alt='User Settings' src='/path/to/user-avatar.png' />
                        </IconButton>
                    </Box>
                    {/* Title */}
                    {/* <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Your Company Name
                    </Typography> */}


                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default CustomerHeader;