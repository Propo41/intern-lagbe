import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../TextInputLayout";
import PublishIcon from "@material-ui/icons/Publish";
import errorHandling from "../../utils/error_handling.js";
import Alert from "../../components/AlertCustom";
import { LinearProgress } from "@material-ui/core";
import { GET, POST } from "../../api/api.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "var(--body-color)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 4),
    textAlign: "center",
    borderRadius: 10,
  },
  buttonPurple: {
    backgroundColor: "var(--purple)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
  buttonUpload: {
    backgroundColor: "var(--green)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
  input: {
    display: "none",
  },
}));

const ApplyJobModal = (props) => {
  const classes = useStyles();
  const [formInput, setFormInput] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoadingBar(true);

    try {
      const { data } = await POST(`company/job/apply`, {
        ...formInput,
        jobId: props.id,
      });
      setAlert(null);
      console.log(data);
      window.location.reload();
    } catch (e) {
      setLoadingBar(false);
      console.log(e);
      if (e.response) {
        setAlert(errorHandling(e));
      }
    }
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    console.log("deleting");
    console.log(value, name);

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formInput);
  };

  return (
    <>
      {loadingBar && <LinearProgress />}
      <Paper elevation={5} className={classes.paper}>
        <h1 className="title-medium">APPLYING FOR: {props.title}</h1>
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <TextInputLayout
            icon="user"
            placeholder="Enter your name*"
            type="text"
            name="name"
            onInputChange={onInputChange}
          />
        </div>
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <TextInputLayout
            icon="mail"
            placeholder="Enter your email*"
            type="email"
            name="contactEmail"
            onInputChange={onInputChange}
          />
        </div>
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <TextInputLayout
            icon="phone"
            placeholder="Enter your contact*"
            type="phone"
            name="contactPhone"
            onInputChange={onInputChange}
          />
        </div>
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <input
            accept=".pdf,.doc,.docx"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              fullWidth={true}
              className={classes.buttonUpload}
              startIcon={<PublishIcon />}
            >
              UPLOAD RESUME
            </Button>
          </label>
        </div>
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <Button
            variant="contained"
            fullWidth={true}
            className={classes.buttonPurple}
            onClick={submitForm}
            disabled={
              formInput === null || Object.keys(formInput).length < 3
              // || description === null
            }
          >
            APPLY
          </Button>
        </div>
        {alert && alert.status && (
          <Alert
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
          />
        )}
      </Paper>
    </>
  );
};

export default ApplyJobModal;
