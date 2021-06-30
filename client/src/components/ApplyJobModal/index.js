import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../TextInputLayout";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "var(--body-color)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 4),
    textAlign: "center",
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

const ApplyJobModal = () => {
  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className="title-medium">APPLY FOR JOB</h1>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="user"
          placeholder="ENTER YOUR NAME"
          type="text"
        />
      </div>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="mail"
          placeholder="ENTER YOUR EMAIL"
          type="email"
        />
      </div>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="phone"
          placeholder="ENTER YOUR CONTACT"
          type="phone"
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
        >
          APPLY
        </Button>
      </div>
    </Paper>
  );
};

export default ApplyJobModal;
