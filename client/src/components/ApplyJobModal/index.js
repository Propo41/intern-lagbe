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
  const [successMsg, setSuccessMsg] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  }, [file]);

  // On submission, file gets always uploaded even if there is form validation error
  const submitForm = async (e) => {
    e.preventDefault();
    setLoadingBar(true);
    try {
      var url = "";
      if (file) {
        const { data } = await GET(`api/landingpage/company/job/apply/resume`);
        console.log(data);
        // uploading resume to uploadCare server
        url = await uploadFile(data);
      }

      const res = await POST(`api/landingpage/company/job/apply`, {
        ...formInput,
        jobId: props.jobId,
        companyId: props.companyId,
        resumeUrl: url,
      });

      if (res.data.status === 200) {
        setSuccessMsg(true);
      }
      setAlert(null);
      setLoadingBar(false);
      console.log("Applying for job :", res.data);
      window.location.reload();
    } catch (error) {
      setSuccessMsg(false);
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

  const uploadFile = async (data) => {
    var resumeForm = new FormData();
    resumeForm.append("file", file);
    resumeForm.append("signature", data.signature);
    resumeForm.append("UPLOADCARE_PUB_KEY", data.pubKey);
    resumeForm.append("expire", data.expiry);

    // create a POST request with axios
    const res = await axios.post(
      "https://upload.uploadcare.com/base/",
      resumeForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return `https://ucarecdn.com/${res.data.file}/`;
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
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className="title-medium" style={{ textTransform: "uppercase" }}>
        APPLYING FOR: {props.title}
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
            file === null
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
      {successMsg && (
        <Alert
          severity="success"
          title="Job successfully applied!"
          message={null}
        />
      )}
    </Paper>
  );
};

export default ApplyJobModal;
