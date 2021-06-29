import { makeStyles } from "@material-ui/core/styles";
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
 */
const TextInputLayout = (props) => {
  const classes = useStyles();
  const [value, setValues] = useState("");

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      {iconMapper(props.icon, "darkash", "textinputlayout")}
      <InputBase
        className={classes.input}
        placeholder={props.placeholder}
        fullWidth={true}
        onChange={(event) => {
          setValues(event.target.value);
        }}
        type={props.type}
      />
    </Paper>
  );
};

export default TextInputLayout;
