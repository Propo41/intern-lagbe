import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const PublicNavbar = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <h1 className="navbar">HOME</h1>
        <h1 className="navbar">ABOUT</h1>
        <Button className="navbar-button">POST A JOB</Button>
      </Toolbar>
    </AppBar>
  );
};

export default PublicNavbar;
