import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Button, Divider }  from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const drawerWidth = 300;
const logoURL = "https://cdn.discordapp.com/attachments/1198067297517051995/1199890391118381117/blue.JPG?ex=65c43002&is=65b1bb02&hm=1f6fc371eec1deffb670578da5f06d117e0b104ee6d212b8adca6574d7acb003&";

const Sidebar = (props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
    setOpen(!open);
    };
    
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
        },
        backgroundColor:"#ffffff",
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <img
          style={{ maxWidth: "100%", height: "auto" }}
          alt="Blue Logo"
          src={logoURL}
        />
      </Toolbar>

      <List
        sx={{ width: "100%", maxWidth: 300, bgcolor: "background"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton style={{ marginBottom: "10px" }}>
          <ListItemIcon>
            <GridViewOutlinedIcon sx={{ color: "black" }}/>
          </ListItemIcon>
          <ListItemText primary="Overview"/>
        </ListItemButton>
        <ListItemButton style={{ marginBottom: "10px" }}>
          <ListItemIcon>
            <PieChartOutlinedIcon sx={{ color: "black" }}/>
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
        <ListItemButton style={{ marginBottom: "10px" }}>
          <ListItemIcon>
            <ReviewsRoundedIcon sx={{ color: "black" }}/>
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItemButton>
        <ListItemButton onClick={handleClick} style={{ marginBottom: "10px" }}>
          <ListItemIcon>
            <SettingsOutlinedIcon sx={{ color: "black" }}/>
          </ListItemIcon>
          <ListItemText primary="Settings"/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 10 }}>
              <ListItemText primary="Restaurant" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 10 }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider/>
      <div style={{ width: '80%', margin: 'auto', marginTop:'20px'}}>
        <Button startIcon={<LogoutIcon/>} variant="filled" fullWidth sx={{backgroundColor:"#EEEFF1"}}>
          Sign Out
        </Button>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
