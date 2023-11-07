import { useTheme } from "@emotion/react";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import GiteIcon from "@mui/icons-material/Gite";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SetMealIcon from "@mui/icons-material/SetMeal";

const drawserStyle = {
  backgroundColor: "#CEDEBD",
  height: "100vh",
};

StaffSideBar.propTypes = {};

function StaffSideBar(props) {
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
                      <GpsNotFixedIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Areas"
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
                      <GiteIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/cages"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Cages"
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
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/trainer-manage"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Trainer Accounts"
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
                      <NewspaperIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/news"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage News"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NewspaperIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/species"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Species"
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
                      <EqualizerIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Data Statistic"
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
                      to="/staff/order-manage"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Ticket Order"
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
                      <SetMealIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Foods"
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
                      <PetsIcon />
                    </ListItemIcon>
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/staff/animal-manage"
                      activeClassName="active"
                    >
                      <ListItemText
                        style={{ color: "#5B6253" }}
                        primary="Manage Animal"
                      ></ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default StaffSideBar;
