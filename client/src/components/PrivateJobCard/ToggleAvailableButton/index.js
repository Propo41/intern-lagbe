import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

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

const ToggleAvailableButton = () => {
  const [color, setColor] = React.useState("available");
  const handleColor = (e, value) => {
    if (value !== null) {
      setColor(value);
    }
  };
  return (
    <ToggleButtonGroup
      onChange={handleColor}
      value={color}
      exclusive
      aria-label="text alignment"
    >
      <MyToggleButton color="green" value="available">
        <HourglassEmptyIcon />
      </MyToggleButton>
      <MyToggleButton color="purple" value="not-available">
        <HourglassFullIcon />
      </MyToggleButton>
      <Button>
        <DeleteIcon style={{ color: "#FEB8B8" }} />
      </Button>
    </ToggleButtonGroup>
  );
};

export default ToggleAvailableButton;
