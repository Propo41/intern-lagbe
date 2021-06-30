import {Paper} from "@material-ui/core";
import iconMapper from "../../utils/icon_mapper";

const Label = (props) => {
  return (
    <Paper className="label vertical-align">
      {iconMapper(props.icon, props.color, "label")}
      <h1 className="label-font">{props.text}</h1>
    </Paper>
  );
};
export default Label;
