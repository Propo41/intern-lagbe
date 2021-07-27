import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { GET_AUTH, POST_AUTH, DELETE_AUTH } from "../../api/api.js";

const useStyles = makeStyles((theme) => ({
  root: (props) => {
    return {
      color: props.color,
    };
  },
}));

function MyToggleButton(props) {
  const { color, event, ...other } = props;
  const classes = useStyles({ color });
  return <ToggleButton classes={classes} {...other} onClick={event} />;
}

/* entry point */
const ToggleAvailableButtonMobile = (props) => {
  const [color, setColor] = React.useState(
    props.status ? "available" : "not-available"
  );
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteJob = async (e) => {
    setAnchorEl(null);
    console.log("deleted");
    e.stopPropagation();
    e.preventDefault();
    try {
      const { data } = await DELETE_AUTH(`api/company/job`, {
        id: props.id,
      });
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // make it unavailable
  const onToggleUnavailableClick = async (e) => {
    e.stopPropagation();
    console.log("unavailable");
    try {
      const { data } = await POST_AUTH(`api/company/job/status`, {
        id: props.id,
        isAvailable: false,
      });
      window.location.reload();
      console.log(data);
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  };

  // make it available
  const onToggleAvailableClick = async (e) => {
    e.stopPropagation();
    console.log("available");

    try {
      const { data } = await POST_AUTH(`api/company/job/status`, {
        id: props.id,
        isAvailable: true,
      });
      window.location.reload();
      // @TODO: add loading animation
      console.log(data);
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
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
        <ToggleButtonGroup
          onChange={handleColor}
          value={color}
          exclusive
          aria-label="text alignment"
          style={{ display: "grid" }}
        >
          <MyToggleButton
            color="var(--purple)"
            value="not-available"
            event={onToggleUnavailableClick}
          >
            UN-AVAILABLE
          </MyToggleButton>
          <MyToggleButton
            color="var(--green)"
            value="available"
            event={onToggleAvailableClick}
          >
            AVAILABLE
          </MyToggleButton>

          <Button
            onClick={onDeleteJob}
            style={{ color: "var(--red)", fontWeight: "bold" }}
          >
            DELETE
          </Button>
        </ToggleButtonGroup>
      </Menu>
    </div>
  );
};

export default ToggleAvailableButtonMobile;
