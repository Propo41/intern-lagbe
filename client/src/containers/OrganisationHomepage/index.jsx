import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { Divider } from "@material-ui/core";
import PrivateJobCard from "../../components/PrivateJobCard";

const jobsPosted = [
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
  },
  {
    title: "PRODUCTION ENGINEER IN AHSANULLAH UNIVERSITY",
    location: "DHAKA, DHANMONDI",
    status: "false",
  },
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "false",
  },
  {
    title: "FRONT END ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
  },
  {
    title: "SOFTWARE ENGINEER",
    location: "DHAKA, DHANMONDI",
    status: "true",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "var(--content-margin-top)",
    flexWrap: "wrap",
    alignItems: "center",
  },
  card: {
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    textAlign: "center",
    paddingLeft: 50,
    paddingRight: 50,
    boxShadow: "var(--card-shadow)",
  },

  image: {
    width: "80%",
    height: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(-85%)",
  },

  imagePlaceholder: {
    width: "50%",
    height: "50%",
  },

  buttonPurple: {
    backgroundColor: "var(--purple)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
  buttonRed: {
    backgroundColor: "var(--red)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
}));

const OrganisationHomepage = () => {
  const classes = useStyles();

  if (jobsPosted.length > 0) {
    return (
      <div className="content-grid-padding">
        <PublicNavbar />

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
                          title={job.title}
                          location={job.location}
                          status={job.status}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                        <PrivateJobCard
                          title={job.title}
                          location={job.location}
                          status={job.status}
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
                    POST MORE JOBS
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} lg={4} style={{ textAlign: "right" }}>
                <img
                  src="/assets/images/job_posting_blob.svg"
                  alt="landing page"
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  } else {
    return (
      <div className="content-grid-padding">
        <PublicNavbar />

        <div className={classes.root}>
          <Paper elevation={5} className="semi-rounded-card">
            <div style={{ textAlign: "left" }}>
              <h1 className="title-medium">MY JOB POSTINGS</h1>
            </div>

            <img
              src="/assets/images/job_posting_blob.svg"
              alt="landing page"
              className={classes.imagePlaceholder}
              style={{ marginTop: "var(--margin-item-spacing-lg)" }}
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
    );
  }
};
export default OrganisationHomepage;
