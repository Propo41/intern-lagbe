import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LogoutComponent from "../LogoutComponent";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "../../styles/private_navbar";
import { useEffect } from "react";
import { GET_AUTH } from "../../api/api";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

const PrivateNavbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({
    profilePictureUrl: "/assets/images/company_img_preview.svg",
    name: "Company",
    status: false,
  });
  const open = Boolean(anchorEl);

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`api/company/profile-config`);
        const temp = data.companyInfo;
        temp.email = data.email;
        setUserInfo(temp);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    console.log("log out");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        {/* Place brand logo here */}
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
            <Avatar
              alt="brand logo"
              className={classes.logoSize}
              src="/assets/images/brand_logo.svg"
            />
          </Link>
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
                      userInfo.profilePictureUrl
                        ? userInfo.profilePictureUrl
                        : "/assets/images/company_img_preview.svg"
                    }
                    className={classes.large}
                  />
                  <h1 className={classes.userInfoText}>{userInfo.name}</h1>
                  <h1
                    className={classes.userInfoText}
                    style={{
                      fontSize: "var(--font-size-dialog-content",
                    }}
                  >
                    {userInfo.email}
                  </h1>
                </div>
              </div>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">
                  <Link to="/">MY POSTINGS</Link>
                </h1>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">
                  <Link to="/applicants">APPLICANTS</Link>
                </h1>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <h1 className="navbar">
                  <Link to="/profile">PROFILE</Link>
                </h1>
              </MenuItem>
              <MenuItem style={{ backgroundColor: "#F5FAFF" }}>
                <SettingsIcon className={classes.menuItemIcon} />
                CHANGE PASSWORD
              </MenuItem>
              <MenuItem
                onClick={onLogoutClick}
                style={{
                  color: "#D67979",
                  backgroundColor: "#F5FAFF",
                }}
              >
                <ExitToAppIcon
                  className={classes.menuItemIcon}
                  style={{ color: "#D67979" }}
                />
                LOGOUT
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className={classes.headerOptions}>
            <Button className="navbar">
              <Link to="/">MY POSTINGS</Link>
            </Button>
            <Button className="navbar">
              <Link to="/applicants">APPLICANTS</Link>
            </Button>
            <Button className="navbar">
              <Link to="/profile">PROFILE</Link>
            </Button>
            <div className={classes.rightToolbar}>
              <LogoutComponent
                avatar={userInfo.profilePictureUrl}
                name={userInfo.name}
                email={userInfo.email}
              />
            </div>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

export default PrivateNavbar;
