import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const ApplyJobModal = (props) => {
  const classes = useStyles();
  const [formInput, setFormInput] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  const [ip, setIp] = React.useState(null);

  useEffect(() => {
    const exe = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      console.log(res.data);
      setIp(res.data.IPv4);
    };
    exe();

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  }, [file]);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoadingBar(true);
    console.log(formInput);
    console.log("job id clicked: ", props.jobId);

    try {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("name", formInput.name);
      formData.append("contactEmail", formInput.email);
      formData.append("contactPhone", formInput.contact);
      /*  formData.append("ip", ip.toString()); */
      formData.append("jobId", props.jobId);
      formData.append("companyId", props.companyId);

      const res = await POST(`api/landingpage/company/job/apply`, formData);

      if (res.data.status === 200) {
        setAlert({
          status: true,
          title: "Submitted!",
          message: [
            "Your application has been submitted. Please wait for your call or try searching for more jobs!",
          ],
          severity: "success",
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 1500);

      setLoadingBar(false);
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

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFilename(file.name);
    } else {
      setFile(null);
      setFilename(null);
    }

    if (file && file.name.split(".").pop() !== "pdf") {
      setAlert({
        status: true,
        title: "Wrong file!",
        message: ["You've selected the wrong file. Please check again"],
        severity: "error",
      });
    } else {
      setAlert(null);
    }
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className="title-medium" style={{ textTransform: "uppercase" }}>
        APPLY TO JOB
      </h1>
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
          name="email"
          onInputChange={onInputChange}
        />
      </div>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <TextInputLayout
          icon="phone"
          placeholder="Enter your contact*"
          type="phone"
          name="contact"
          onInputChange={onInputChange}
        />
      </div>
      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
        <input
          accept=".pdf"
          className={classes.input}
          id="contained-button-file"
          required
          type="file"
          onChange={fileHandler}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            component="span"
            fullWidth={true}
            className={classes.buttonUpload}
            startIcon={<PublishIcon />}
          >
            {file ? filename : "UPLOAD RESUME HERE"}
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
            formInput === null ||
            Object.keys(formInput).length < 3 ||
            file === null ||
            filename.split(".").pop() !== "pdf"
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
      {loadingBar && (
        <div style={{ marginTop: "var(--margin-item-spacing)" }}>
          <LinearProgress />
        </div>
      )}
    </Paper>
  );
};

export default ApplyJobModal;
