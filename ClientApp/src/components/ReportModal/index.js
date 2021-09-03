import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../TextInputLayout";
import PublishIcon from "@material-ui/icons/Publish";
import errorHandling from "../../utils/error_handling.js";
import Alert from "../../components/AlertCustom";
import { LinearProgress } from "@material-ui/core";
import { GET, POST } from "../../api/api.js";
import axios from "axios";

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

const ReportModal = (props) => {
  const classes = useStyles();
  const [formInput, setFormInput] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoadingBar(true);
    console.log(formInput);
    console.log("job id clicked: ", props.jobId);

    try {
      var formData = new FormData();
      formData.append("contactEmail", formInput.email);
      formData.append("reason", formInput.reason);
      formData.append("jobId", props.jobId);
      formData.append("companyId", props.companyId);

      const res = await POST(`api/landingpage/company/job/report`, formData);

      if (res.data.status === 200) {
        setAlert({
          status: true,
          title: "Submitted!",
          message: ["Your report has been submitted."],
          severity: "success",
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setLoadingBar(false);
      if (error.response) {
        setAlert(errorHandling(error));
      }
    }
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className="title-medium" style={{ textTransform: "uppercase" }}>
        Report Job
      </h1>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="user"
          placeholder="ENTER YOUR EMAIL"
          type="email"
          name="email"
          onInputChange={onInputChange}
        />
      </div>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="description"
          placeholder="REASON"
          type="text"
          name="reason"
          onInputChange={onInputChange}
        />
      </div>

      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <Button
          variant="contained"
          fullWidth={true}
          className={classes.buttonPurple}
          onClick={submitForm}
          disabled={
            formInput === null ||
            Object.keys(formInput).length < 2 ||
            loadingBar
          }
        >
          REPORT
        </Button>
      </div>
      {alert && alert.status && (
        <Alert
          severity={alert.severity}
          title={alert.title}
          message={alert.message}
        />
      )}
      {loadingBar && (
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <LinearProgress />
        </div>
      )}
    </Paper>
  );
};

export default ReportModal;
