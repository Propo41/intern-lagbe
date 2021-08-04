import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import iconMapper from "../../utils/icon_mapper";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

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
  mentuItem: {
    justifyContent: "left !important",
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

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const SelectTextInputLayout = (props) => {
  const classes = useStyles();
  const [value, setValues] = useState(props.value ? props.value : "");
  const [currency, setCurrency] = React.useState("SELECT JOB CATEGORY");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      {iconMapper(props.icon, "darkash", "textinputlayout")}
      {/* <InputBase
        name={props.name}
        className={classes.input}
        placeholder={props.placeholder}
        fullWidth={true}
        onChange={props.onInputChange}
        type={props.type}
        defaultValue={value}
        multiline={
          props.icon === "description" || props.icon === "requirements"
            ? true
            : false
        }
        rowsMax={10}
        readOnly={props.readOnly}
      /> */}
      <TextField
        className={classes.input}
        id="outlined-select-currency"
        select
        value={currency}
        onChange={handleChange}
        variant="standard"
        fullWidth="true"
        placeholder="Job effecat"
      >
        {currencies.map((option) => (
          <MenuItem
            className={classes.mentuItem}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
};

export default SelectTextInputLayout;
