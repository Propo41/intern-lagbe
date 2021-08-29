import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { GET_AUTH, POST_AUTH, DELETE_AUTH } from "../../api/api.js";
import AlertDialog from "../AlertDialog/index.jsx";

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
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [toggleType, setToggleType] = React.useState(null);
  const [alertContent, setAlertContent] = React.useState(null);

  const _DELETE = "delete";
  const _AVAILABLE = "available";
  const _UNAVAILABLE = "unavailable";

  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  // make it unavailable
  const onToggleUnavailableClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("unavailable");

    setToggleType(_UNAVAILABLE);
    setAlertOpen(true);
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action will make your job status unavailable to the users. This means that your company currently does not have an empty position for this job.",
    });
  };

  // make it available
  const onToggleAvailableClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setToggleType(_AVAILABLE);
    setAlertOpen(true);
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action will make your job status available to the users. This means that your company currently has an empty position for this job.",
    });
  };

  // delete the job
  const onDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleType(_DELETE);

    // open a confirm dialog
    // if the user clicks ok, delete the job
    setAlertOpen(true);
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action is irreversible and will delete the job from your job postings.",
    });
  };

  const onAlertClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("alert closed");
    setAlertOpen(false);
  };

  // util function to delete job
  const deleteJob = async () => {
    console.log("deleting..");
    var form = new FormData();
    form.append("id", props.id);
    props.loadingBar(true);

    try {
      const { data } = await DELETE_AUTH(`api/company/job`, form);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    setToggleType(null);
    props.loadingBar(false);
  };

  // util function to make job available
  const makeAvailable = async () => {
    let formData = new FormData();
    formData.append("id", props.id);
    formData.append("isAvailable", true);
    props.loadingBar(true);

    try {
      const { data } = await POST_AUTH(`api/company/job/status`, formData);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    props.loadingBar(false);
    setToggleType(null);
  };

  // util function to make job unavailable
  const makeUnAvailable = async () => {
    let formData = new FormData();
    formData.append("id", props.id);
    formData.append("isAvailable", false);
    props.loadingBar(true);

    try {
      const { data } = await POST_AUTH(`api/company/job/status`, formData);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    props.loadingBar(false);
    setToggleType(null);
  };

  const onAlertConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAlertOpen(false);
    console.log("alert confirmed");
    switch (toggleType) {
      case _DELETE:
        const exe1 = async () => {
          await deleteJob();
        };
        exe1();
        console.log("hookstate: ", toggleType);
        break;
      case _AVAILABLE:
        const exe2 = async () => {
          await makeAvailable();
        };
        exe2();
        console.log("hookstate: ", toggleType);
        break;
      case _UNAVAILABLE:
        const exe3 = async () => {
          await makeUnAvailable();
        };
        exe3();
        console.log("hookstate: ", toggleType);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AlertDialog
        open={alertOpen}
        handleClose={onAlertClose}
        handleConfirm={onAlertConfirm}
        title={alertContent && alertContent.title}
        subtitle={alertContent && alertContent.subtitle}
      />
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
            onClick={onDeleteClick}
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
