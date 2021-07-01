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
import { Link } from "react-router-dom";

const jobsPosted = [
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
    id: "abcde1",
  },
  {
    title: "PRODUCTION ENGINEER IN AHSANULLAH UNIVERSITY",
    location: "DHAKA, DHANMONDI",
    status: "false",
    id: "abcde2",
  },
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "false",
    id: "abcde3",
  },
  {
    title: "FRONT END ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
    id: "abcde4",
  },
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
    id: "abcde5",
  },
];

const OrganisationHomepage = () => {
  const classes = useStyles();
  const [alertOpen, alertSetOpen] = React.useState(false);
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    alertSetOpen(true);
  }, []);

  if (jobsPosted.length > 0) {
    return (
      <>
        <PrivateNavbar />
        <Collapse in={alertOpen}>
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
                <Link to="/home/profile">SETUP PROFILE</Link>
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
                    if (index === 0) {
                      return (
                        <div
                          style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                        >
                          <PrivateJobCard
                            key={job.id}
                            title={job.title}
                            location={job.location}
                            status={job.status}
                            id={job.id}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          style={{ marginTop: "var(--margin-item-spacing)" }}
                        >
                          <PrivateJobCard
                            key={job.id}
                            title={job.title}
                            location={job.location}
                            status={job.status}
                            id={job.id}
                          />
                        </div>
                      );
                    }
                  })}

                  <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                    <Button
                      variant="contained"
                      fullWidth={true}
                      className={classes.buttonPurple}
                    >
                      <Link to="/home/create-job">POST MORE JOBS</Link>
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
                  <span className="text-button-lg"> Create a new posting.</span>
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
