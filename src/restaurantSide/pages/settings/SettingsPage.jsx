import * as React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import {
    Grid,
    Button,
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    FormControl
} from '@mui/material'
import { HeaderImg } from './styled';
import PropTypes from 'prop-types'

function SettingsPagePanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

SettingsPagePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SettingsPage() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Sidebar>
            <Grid
                container
                columnSpacing={2}
                width='100%'
            >
                <Grid item xs={12}>
                    <Box display='flex' height='40vh'>
                        <HeaderImg
                            src='/settingsDummyImg.png'
                            alt='Header Image'
                        />
                    </Box>
                        <Button variant='contained' color='secondary'>Change Picture</Button>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        display='flex'
                        alignContent='center'
                        flexDirection='column'
                    >
                        <Box
                            borderBottom='1'
                            borderColor='divider'
                            width='100vw'
                        >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', height: '100%' }}>
                                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                                    <Tab label='General' {...a11yProps(0)} />
                                    <Tab label='Settings' {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <Box display='flex' alignItems='center' flexDirection='row' width='100vw'>
                                <SettingsPagePanel value={value} index={0}>
                                    <Box display='flex' flexDirection='row' alignItems='center' gap={10}>
                                        <Typography variant='body2'> Restaurant Name:</Typography>
                                        <TextField
                                            id='Restaurant Name'
                                            label='Restaurant Name'
                                            defaultValue='Miku Restaurant'
                                        />
                                    </Box>
                                    {/* <Box display='flex' flexDirection='row'>
                                    <Typography variant='body2'> Restaurant Name:</Typography>
                                    <TextField
                                        id='Restaurant Name'
                                        label='Restaurant Name'
                                        defaultValue='Miku Restaurant'
                                    />
                                    </Box>
                                    <Box display='flex' flexDirection='row'>
                                    <Typography variant='body2'> Restaurant Name:</Typography>
                                    <TextField
                                        id='Restaurant Name'
                                        label='Restaurant Name'
                                        defaultValue='Miku Restaurant'
                                    />
                                    </Box>
                                    <Box display='flex' flexDirection='row'>
                                    <Typography variant='body2'> Restaurant Name:</Typography>
                                    <TextField
                                        id='Restaurant Name'
                                        label='Restaurant Name'
                                        defaultValue='Miku Restaurant'
                                    />
                                    </Box> */}
                                </SettingsPagePanel>
                                <SettingsPagePanel value={value} index={1}>

                                </SettingsPagePanel>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Sidebar>
    )
}
