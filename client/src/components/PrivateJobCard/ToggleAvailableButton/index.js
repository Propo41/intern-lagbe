import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { DELETE_AUTH, GET_AUTH, POST_AUTH } from "../../../api/api.js";

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
  console.log(props);
  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
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
      console.log(data);
      window.location.reload();
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
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  };

  const onDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("deleting..");

    try {
      const { data } = await DELETE_AUTH(`api/company/job`, {
        id: props.id,
        isAvailable: true,
      });
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  };

  return (
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
  );
};

export default ToggleAvailableButton;
