import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { DELETE_AUTH, GET_AUTH, POST_AUTH } from "../../../api/api.js";
import AlertDialog from "../../AlertDialog/index.jsx";

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

const ToggleAvailableButton = (props) => {
  const [color, setColor] = React.useState(
    props.status ? "available" : "not-available"
  );
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [toggleType, setToggleType] = React.useState(null);
  const [alertContent, setAlertContent] = React.useState(null);

  const _DELETE = "delete";
  const _AVAILABLE = "available";
  const _UNAVAILABLE = "unavailable";

  console.log(props);
  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
    }
  };

  // make it unavailable
  const onToggleUnavailableClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("unavailable");
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action will make your job status unavailable to the users. This means that your company currently does not have an empty position for this job.",
    });

    setToggleType(_UNAVAILABLE);
    setAlertOpen(true);
  };

  // make it available
  const onToggleAvailableClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("available..");
    setToggleType(_AVAILABLE);
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action will make your job status available to the users. This means that your company currently has an empty position for this job.",
    });

    setAlertOpen(true);
  };

  // delete the job
  const onDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleType(_DELETE);
    setAlertContent({
      title: "Are you sure?",
      subtitle:
        "This action is irreversible and will delete the job from your job postings.",
    });

    // open a confirm dialog
    // if the user clicks ok, delete the job
    setAlertOpen(true);
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
    try {
      const { data } = await DELETE_AUTH(`api/company/job`, form);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    setToggleType(null);
  };

  // util function to make job available
  const makeAvailable = async () => {
    let formData = new FormData();
    formData.append("id", props.id);
    formData.append("isAvailable", true);

    try {
      const { data } = await POST_AUTH(`api/company/job/status`, formData);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
    setToggleType(null);
  };

  // util function to make job unavailable
  const makeUnAvailable = async () => {
    let formData = new FormData();
    formData.append("id", props.id);
    formData.append("isAvailable", false);
    try {
      const { data } = await POST_AUTH(`api/company/job/status`, formData);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
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
    <>
      <AlertDialog
        open={alertOpen}
        handleClose={onAlertClose}
        handleConfirm={onAlertConfirm}
        title={alertContent && alertContent.title}
        subtitle={alertContent && alertContent.subtitle}
      />
      <ToggleButtonGroup
        onChange={handleColor}
        value={color}
        exclusive
        aria-label="text alignment"
      >
        <MyToggleButton
          color="purple"
          value="not-available"
          event={onToggleUnavailableClick}
        >
          <HourglassFullIcon />
        </MyToggleButton>

        <MyToggleButton
          color="green"
          value="available"
          event={onToggleAvailableClick}
        >
          <HourglassEmptyIcon />
        </MyToggleButton>

        <Button className="circular-button" onClick={onDeleteClick}>
          <DeleteIcon style={{ color: "var(--red)" }} />
        </Button>
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleAvailableButton;
