import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LogoutComponent from "../LogoutComponent";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: 50,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
    fontFamily: "Sen",
  },
  logoSize: {
    width: 60,
    height: 60,
  },
  headerOptions: {
    display: "contents",
  },
  rightToolbar: {
    display: "flex",
    marginLeft: "auto",
  },
}));

const PrivateNavbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openNestedList, setOpenNestedList] = React.useState(true);

  const handleClick = () => {
    setOpenNestedList(!openNestedList);
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        {/* Place brand logo here */}
        <Typography variant="h6" className={classes.title}>
          <Avatar
            alt="brand logo"
            className={classes.logoSize}
            src="/assets/images/brand_logo.svg"
          />
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon
                style={{
                  width: "1.4em",
                  height: "1.4em",
                  color: "var(--black)",
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">MY POSTINGS</h1>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">APPLICANTS</h1>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">PROFILE</h1>
              </MenuItem>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{ backgroundColor: "var(--ash)" }}
              >
                <ListItem button onClick={handleClick}>
                  <ListItemText>
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                      }}
                      alt="company logo"
                      src="/assets/images/dummy_logo.png"
                    />
                  </ListItemText>
                  {openNestedList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      style={{ display: "grid", justifyContent: "center" }}
                    >
                      <ListItemText primary="microapplesoft@micro.com" />
                    </ListItem>
                    <Divider
                      style={{
                        backgroundColor: "var(--darkash)",
                        margin: "0 15px",
                      }}
                    />
                    <ListItem
                      button
                      style={{ display: "grid", justifyContent: "center" }}
                      onClick={handleClose}
                    >
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Menu>
          </>
        ) : (
          <div className={classes.headerOptions}>
            <Button className="navbar">MY POSTINGS</Button>
            <Button className="navbar">APPLICANTS</Button>
            <Button className="navbar">PROFILE</Button>
            <div className={classes.rightToolbar}>
              <LogoutComponent />
            </div>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

export default PrivateNavbar;
