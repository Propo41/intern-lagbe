import { useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import PrivateJobCard from "../../components/PrivateJobCard";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_homepage";
import { Link, useHistory } from "react-router-dom";
import { GET_AUTH, POST_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";

const OrganisationHomepage = () => {
  const classes = useStyles();
  const [profileStatus, setProfileStatus] = React.useState(false);
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [jobsPosted, setJobsPosted] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const history = useHistory();

  useEffect(() => {
    // fetch all jobs posted
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(
            `api/company/${localStorage.getItem("uid")}`
          );

          setJobsPosted(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    // fetch profile completion
    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(
            `api/company/profile-completion/${localStorage.getItem("uid")}`
          );
          console.log(data);
          setProfileStatus(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return (
      <div>
        <Alert color="error"></Alert>
      </div>
    );
  }

  if (jobsPosted.length > 0) {
    return (
      <>
        <PrivateNavbar />
        <Collapse in={!profileStatus}>
          <Alert
            severity="warning"
            className={classes.alertStyle}
            classes={{
              icon: classes.alertIcon,
              message: classes.alertMessage,
            }}
            action={
              <Button
                color="inherit"
                size="small"
                className={classes.alertButton}
              >
                <Link to="/profile">SETUP PROFILE</Link>
              </Button>
            }
          >
            PLEASE SETUP YOUR PROFILE TO START POSTING JOBS.
          </Alert>
        </Collapse>
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <Grid container spacing={5}>
                <Grid item xs={12} lg={8} style={{ textAlign: "left" }}>
                  <h1 className="title-medium">MY JOB POSTINGS</h1>

                  {jobsPosted.map((job, index) => {
                    return (
                      <div
                        key={job.id}
                        style={{
                          marginTop:
                            index === 0
                              ? "var(--margin-item-spacing-lg)"
                              : "var(--margin-item-spacing)",
                        }}
                      >
                        <PrivateJobCard
                          title={job.title}
                          location={job.address}
                          status={job.isAvailable}
                          id={job.id}
                        />
                      </div>
                    );
                  })}

                  <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                    <Button
                      variant="contained"
                      fullWidth={true}
                      className={classes.buttonPurple}
                      disabled={profileStatus ? false : true}
                      onClick={() => {
                        history.push("/create-job");
                      }}
                    >
                      POST MORE JOBS
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} lg={4} style={{ textAlign: "right" }}>
                  {mobileViewBreakpoint && (
                    <img
                      src="/assets/images/job_posting_blob.svg"
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
  } else {
    return (
      <>
        <PrivateNavbar />
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <div style={{ textAlign: "left" }}>
                <h1 className="title-medium">MY JOB POSTINGS</h1>
              </div>

              <img
                src="/assets/images/job_posting_blob.svg"
                alt="landing page"
                className={classes.imagePlaceholder}
                style={{
                  marginTop: "var(--margin-item-spacing-lg)",
                }}
              />

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <h1 className="content" style={{ color: "var(--darkash)" }}>
                  You don't have any postings listed.
                  <span
                    className="text-button-lg"
                    onClick={() => {
                      history.push("/create-job");
                    }}
                  >
                    Create a new posting.
                  </span>
                </h1>
              </div>
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
  }
};
export default OrganisationHomepage;
