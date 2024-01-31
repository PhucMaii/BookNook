import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Box, Button, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 300;

const tabList = [
  {
    name: "Overview",
    path: "/overview",
    icon: GridViewOutlinedIcon,
  },
  {
    name: "History",
    path: "/history",
    icon: PieChartOutlinedIcon,
  },
  {
    name: "Reviews",
    path: "/reviews",
    icon: ReviewsRoundedIcon,
  },
  {
    name: "Restaurant",
    path: "/restaurant",
    icon: null,
  },
  {
    name: "Profile",
    path: "/hostProfile",
    icon: null,
  },
];

const Sidebar = (props) => {
  const upperTabs = tabList.filter(
    (tab) =>
      tab.path !== "/restaurant" &&
      tab.path !== "/hostProfile" &&
      tab.path !== null
  );
  const lowerTabs = tabList.filter(
    (tab) => tab.path === "/restaurant" || tab.path === "/hostProfile"
  );

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
        backgroundColor: "#ffffff",
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <img
          style={{ maxWidth: "100%", height: "auto" }}
          alt="Blue Logo"
          src={"../src/images/blueLogo.JPG"}
        />
      </Toolbar>

      <List
        sx={{ width: "100%", maxWidth: 300, bgcolor: "background" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {upperTabs.map((tab, index) => (
          <ListItemButton
            key={index}
            style={{ marginBottom: "10px" }}
            onClick={() => {
              // Add logic for handling tab clicks (e.g., navigating to the specified path)
              console.log(`Clicked on ${tab.name}`);
            }}
          >
            <ListItemIcon>
              {tab.icon && <tab.icon sx={{ color: "black" }} />}
            </ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItemButton>
        ))}
         <ListItemButton onClick={handleClick} style={{ marginBottom: "10px" }}>
          <ListItemIcon>
            <SettingsOutlinedIcon sx={{ color: "black" }}/>
          </ListItemIcon>
          <ListItemText primary="Settings"/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lowerTabs.map((nestedTab, index) => (
              <ListItemButton
                key={index}
                sx={{ pl: 10 }}
                onClick={() => {
                  // Add logic for handling nested tab clicks (e.g., navigating to the specified path)
                  console.log(`Clicked on ${nestedTab.name}`);
                }}
              >
                <ListItemText primary={nestedTab.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />
      <Box sx={{ m: 2 }}>
        <Button
          startIcon={<LogoutIcon />}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: "#EEEFF1" }}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
