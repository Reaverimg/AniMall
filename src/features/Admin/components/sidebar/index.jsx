import { useTheme } from "@emotion/react";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const drawserStyle = {
  backgroundColor: "#CEDEBD",
  height: "100vh",
};

AdminSideBar.propTypes = {};

function AdminSideBar(props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: "white" }}>{anchor}</MenuIcon>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
              }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
              style={drawserStyle}
            >
              {/* Button */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/admin/account"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Account Manage"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List>
              {/* Button */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LocalActivityIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/admin/ticket"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Ticket Manage"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List>
              {/* Button */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                    <SettingsSuggestIcon  />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/admin/setting"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Setting"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List>

              {/* Button */}
              {/* <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/trainer/feedingSchedule"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Feeding Schedule"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List> */}
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default AdminSideBar;
