import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import EditIcon from "@material-ui/icons/Edit";
import { useMediaQuery } from "@material-ui/core";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import Footer from "../../components/Footer";
import useStyles from "../../styles/orginsation_job_post";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GET_AUTH, POST_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";

const OrganisationJobPost = (props) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [job, setJob] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { jobId } = useParams();
  const jobEditUrl = `/job/${jobId}/edit`;

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/job/${jobId}`);
          setJob(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, [jobId]);

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
                  <div style={{ display: "flex" }}>
                    <h1 className="title-medium">JOB POST</h1>
                    <Link to={jobEditUrl}>
                      <Button className="circular-button">
                        <EditIcon style={{ color: "var(--red)" }} />
                      </Button>
                    </Link>
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                    <TextInputLayout
                      icon="bookmark"
                      placeholder="Enter job title"
                      type="text"
                      value={job.title}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="requirements"
                      placeholder="Enter job requirements"
                      type="text"
                      value={job.requirements}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="mail"
                      placeholder="Enter email (optional)"
                      type="text"
                      value={job.contactEmail}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="phone"
                      placeholder="Enter contact number (optional)"
                      type="text"
                      value={job.contactPhone}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="district"
                      placeholder="Enter contact number (optional)"
                      type="text"
                      value={job.district}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="location"
                      placeholder="Enter contact number (optional)"
                      type="text"
                      value={job.address}
                      readOnly={true}
                    />
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
  }
};
export default OrganisationJobPost;
