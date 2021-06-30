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

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: 50,
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
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

const PublicNavbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <MenuIcon style={{ width: "1.4em", height: "1.4em" }} />
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
                <h1 className="navbar">HOME</h1>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">ABOUT</h1>
              </MenuItem>
              <MenuItem className="navbar-button" onClick={handleClose}>
                POST A JOB
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className={classes.headerOptions}>
            <Button className="navbar">HOME</Button>
            <Button className="navbar">ABOUT</Button>
            <div className={classes.rightToolbar}>
              <Button className="navbar-button">POST A JOB</Button>
            </div>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

export default PublicNavbar;
