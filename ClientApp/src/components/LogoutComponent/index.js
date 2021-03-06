import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Avatar,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  userInfoText: {
    margin: 0,
    color: "var(--white)",
    fontFamily: "var(--font-family-poppins)",
    fontWeight: 200,
    fontSize: "var(--font-size-content)",
  },
  menuItemSecondary: {
    color: "var(--black)",
    padding: "0.8rem",
    fontSize: "var(--font-size-navbar) !important",
  },
  logoutButton: {
    borderRadius: "10px",
  },
  logoutButtonAvatar: {
    width: "40px",
    height: "40px",
    margin: "2px",
    borderRadius: 50,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  menuItemIcon: {
    marginRight: "5px",
    color: "var(--darkash)",
  },
  logoutContainer: {
    justifyItems: "center",
    display: "grid",
    padding: "0.8rem 1rem",
  },
}));

const LogoutComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    event.stopPropagation();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = (event) => {
    event.stopPropagation();

    localStorage.clear();
    window.location.href = "/";
    console.log("log out");

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleChangePass = (event) => {
    event.stopPropagation();

    console.log("change pass");

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.logoutButton}
      >
        <img
          className={classes.logoutButtonAvatar}
          alt="company logo"
          src={
            props.avatar
              ? props.avatar
              : "/assets/images/company_img_preview.svg"
          }
        />
        <KeyboardArrowDownIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 500 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  style={{
                    backgroundColor: "var(--white)",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--purple)",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className={classes.logoutContainer}>
                      <Avatar
                        alt="company image"
                        src={
                          props.avatar
                            ? props.avatar
                            : "/assets/images/company_img_preview.svg"
                        }
                        className={classes.large}
                      />
                      <h1 className={classes.userInfoText}>{props.name}</h1>
                      <h1
                        className={classes.userInfoText}
                        style={{
                          fontSize: "var(--font-size-dialog-content",
                        }}
                      >
                        {props.email}
                      </h1>
                    </div>
                  </div>
                  <MenuItem
                    onClick={handleChangePass}
                    className={classes.menuItemSecondary}
                  >
                    <SettingsIcon className={classes.menuItemIcon} />
                    CHANGE PASSWORD
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItemSecondary}
                    onClick={handleLogout}
                    style={{
                      color: "#D67979",
                    }}
                  >
                    <ExitToAppIcon
                      className={classes.menuItemIcon}
                      style={{ color: "#D67979" }}
                    />
                    LOGOUT
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default LogoutComponent;
