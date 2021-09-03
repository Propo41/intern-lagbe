import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_job_post_edit";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GET, GET_AUTH, POST_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import Alert from "../../components/AlertCustom";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";
import errorHandling from "../../utils/error_handling";

const OrganisationJobPostEdit = (props) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [formInput, setFormInput] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [districtList, setDistrictList] = React.useState(null);
  const [categoryList, setCategoryList] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [remunerationList, setRemunerationList] = React.useState(null);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/job/${jobId}`);
          console.log(data);
          setJob(data);
          setDescription(data.requirements);
          setFormInput(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/districts");
          console.log(data);
          setDistrictList(data.districts);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    const promise3 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/remuneration");
          console.log(data);
          setRemunerationList(data.remuneration);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    const promise4 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/job-categories");
          console.log(data);
          setCategoryList(data.jobCategories);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2, promise3, promise4])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, [jobId]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // sending the form input to server
      const res = await POST_AUTH(`api/company/job/edit`, {
        ...formInput,
      });
      console.log(res.data);
      navigate(`/job/${jobId}`, { replace: true });
    } catch (e) {
      if (e) {
        setAlert(errorHandling(e));
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

  if (error) {
    return (
      <div>
        <p>Failed to load. Try again..</p>
      </div>
    );
  } else if (loading) {
    return <LoadingAnimation />;
  } else {
    return (
      <>
        <PrivateNavbar />
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <Grid container spacing={5}>
                <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
                  <h1 className="title-medium">MAKE CHANGES</h1>

                  <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                    <TextInputLayout
                      icon="bookmark"
                      placeholder="Enter job title"
                      type="text"
                      value={job.title}
                      onInputChange={onInputChange}
                      name="title"
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="mail"
                      placeholder="Enter email (optional)"
                      type="text"
                      value={job.contactEmail}
                      onInputChange={onInputChange}
                      name="contactEmail"
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="phone"
                      placeholder="Enter contact number (optional)"
                      type="text"
                      value={job.contactPhone}
                      onInputChange={onInputChange}
                      name="contactPhone"
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <SelectTextInputLayout
                      icon="company"
                      placeholder="Select company category"
                      value={job.category}
                      list={categoryList}
                      onInputChange={onInputChange}
                      name="category"
                      setSelectedValue={setFormInput}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <SelectTextInputLayout
                      icon="map"
                      placeholder="Select district"
                      value={job.district}
                      onInputChange={onInputChange}
                      list={districtList}
                      name="district"
                      setSelectedValue={setFormInput}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <SelectTextInputLayout
                      icon="map"
                      placeholder="Select remuneration"
                      value={job.remuneration}
                      onInputChange={onInputChange}
                      list={remunerationList}
                      name="remuneration"
                      setSelectedValue={setFormInput}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="location"
                      placeholder="Enter contact number (optional)"
                      type="text"
                      value={job.address}
                      onInputChange={onInputChange}
                      name="address"
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <MarkdownEditor
                      description={description}
                      setDescription={setDescription}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                    <Button
                      variant="contained"
                      fullWidth={true}
                      className={classes.buttonPurple}
                      disabled={formInput === job}
                      onClick={onFormSubmit}
                    >
                      SAVE CHANGES
                    </Button>
                  </div>

                  {alert && alert.status && (
                    <Alert
                      severity={alert.severity}
                      title={alert.title}
                      message={alert.message}
                    />
                  )}
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
        {/* <div
          style={{
            marginTop: "var(--margin-footer-spacing)",
          }}
        >
          <Footer />
        </div> */}
      </>
    );
  }
};
export default OrganisationJobPostEdit;
