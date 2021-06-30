import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: (props) => {
    return {
      color: props.color,
    };
  },
}));

function MyToggleButton(props) {
  const { color, ...other } = props;
  const classes = useStyles({ color });
  return <ToggleButton classes={classes} {...other} />;
}

const ToggleAvailableButtonMobile = () => {
  const [color, setColor] = React.useState("available");
  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="circular-button"
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <ToggleButtonGroup
          onChange={handleColor}
          value={color}
          exclusive
          aria-label="text alignment"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          style={{ display: "grid" }}
        >
          <MyToggleButton
            onClick={handleClose}
            color="purple"
            value="not-available"
          >
            UN-AVAILABLE
          </MyToggleButton>
          <MyToggleButton onClick={handleClose} color="green" value="available">
            AVAILABLE
          </MyToggleButton>

          <Button onClick={handleClose} style={{ color: "var(--red)" }}>
            DELETE
          </Button>
        </ToggleButtonGroup>
      </Menu>
    </div>
    // <ToggleButtonGroup
    //   onChange={handleColor}
    //   value={color}
    //   exclusive
    //   aria-label="text alignment"
    //   onClick={(event) => event.stopPropagation()}
    //   onFocus={(event) => event.stopPropagation()}
    // >
    //   <MyToggleButton color="purple" value="not-available">
    //     UN-AVAILABLE
    //   </MyToggleButton>
    //   <MyToggleButton color="green" value="available">
    //     AVAILABLE
    //   </MyToggleButton>

    //   <Button style={{ color: "var(--red)" }}>DELETE</Button>
    // </ToggleButtonGroup>
  );
};

export default ToggleAvailableButtonMobile;
