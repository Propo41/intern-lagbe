import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import iconMapper from "../../utils/icon_mapper";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--ash)",
    borderRadius: 4,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "Sen",
    color: "var(--darkash)",
    padding: "var(--text-input-padding)",
  },
}));

/**
 * A component that returns the Filled Text Input component
 * @param icon bookmark, mail, location, requirements, phone, delete, upload, user, lock, key, company, description
 * @param placeholder A String for the hint text
 * @param type email, file, date, image, text
 * @param  readOnly true or false
 * @param rowsMax integer value (optional)
 * @param value String: default value on the input layout
 * @param name String: name of the input, ie email or password
 * @param onInputChange a function passed that handles the input change event
 */
const TextInputLayout = (props) => {
  const classes = useStyles();
  const [value, setValues] = useState(props.value ? props.value : "");

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      {iconMapper(props.icon, "darkash", "textinputlayout")}
      <InputBase
        name={props.name}
        className={classes.input}
        placeholder={props.placeholder}
        fullWidth={true}
        onChange={props.onInputChange}
        type={props.type}
        defaultValue={value}
        multiline={
          props.icon === "description" ||
          props.icon === "requirements" ||
          props.icon === "location"
            ? true
            : false
        }
        maxRows={10}
        readOnly={props.readOnly}
      />
    </Paper>
  );
};

export default TextInputLayout;
