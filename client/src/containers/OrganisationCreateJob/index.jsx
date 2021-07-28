import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_create_job";
import { GET_AUTH, POST_AUTH } from "../../api/api.js";
import MDEditor from "@uiw/react-md-editor";

const OrganisationCreateJob = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [error, setError] = React.useState(false);
  const [form, setFormInput] = React.useState(null);
  const [description, setDescription] = React.useState(
    "Enter your job requirements in details"
  );

  // check profile status
  // only allow creating jobs iff profile is completed
  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`api/company/profile-completion`);
        console.log(data);
        if (!data) {
          window.location.href = `/`;
        }
      } catch (e) {
        console.log(e);
        window.location.href = `/`;
      }
    };
    exe();
  }, []);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    console.log("deleting");
    console.log(value, name);

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(form);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await POST_AUTH(`api/company/job`, {
        ...form,
        requirements: description,
      });
      setError(false);
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <PrivateNavbar />
      <div className="content-grid-padding">
        <div className={classes.root}>
          <Paper elevation={5} className="semi-rounded-card">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
                <h1 className="title-medium">ADD NEW JOB LISTING</h1>

                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <TextInputLayout
                    icon="bookmark"
                    placeholder="Enter job title"
                    type="text"
                    onInputChange={onInputChange}
                    name="title"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="mail"
                    placeholder="Enter email"
                    type="email"
                    onInputChange={onInputChange}
                    name="contactEmail"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="phone"
                    placeholder="Enter contact number"
                    type="text"
                    onInputChange={onInputChange}
                    name="contactPhone"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter district"
                    type="text"
                    onInputChange={onInputChange}
                    name="district"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter address"
                    type="text"
                    onInputChange={onInputChange}
                    name="address"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <MDEditor
                    height={200}
                    value={description}
                    onChange={setDescription}
                    preview="preview"
                    className="markdown-area-style"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    className={classes.buttonPurple}
                    onClick={submitForm}
                    disabled={
                      form === null ||
                      Object.keys(form).length < 5 ||
                      description === null
                    }
                  >
                    CREATE NEW LISTING
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} lg={5} style={{ textAlign: "right" }}>
                {mobileViewBreakpoint && (
                  <img
                    src="/assets/images/job_offers_blob.svg"
                    alt="landing page"
                    className={classes.image}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <div
        style={{
          marginTop: "var(--margin-footer-spacing)",
        }}
      >
        <Footer />
      </div>
    </>
  );
};
export default OrganisationCreateJob;
