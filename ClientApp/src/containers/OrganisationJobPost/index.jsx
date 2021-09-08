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
import MarkdownEditor from "../../components/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

const OrganisationJobPost = (props) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [job, setJob] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { jobId } = useParams();
  const jobEditUrl = `/job/${jobId}/edit`;
  const [description, setDescription] = React.useState(null);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/job/${jobId}`);
          setJob(data);
          setDescription(data.requirements);
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
        setLoading(false);
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>{job.title}</title>
        </Helmet>
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
                      icon="mail"
                      placeholder="Enter email"
                      type="text"
                      value={job.contactEmail}
                      readOnly={true}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="category"
                      placeholder="Enter category"
                      type="text"
                      value={job.category}
                      readOnly={true}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="money"
                      placeholder="Enter remuneration"
                      type="text"
                      value={job.remuneration}
                      readOnly={true}
                    />
                  </div>

                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="phone"
                      placeholder="Enter contact number"
                      type="text"
                      value={job.contactPhone}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="map"
                      placeholder="Enter district"
                      type="text"
                      value={job.district}
                      readOnly={true}
                    />
                  </div>
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <TextInputLayout
                      icon="location"
                      placeholder="Enter address"
                      type="text"
                      value={job.address}
                      readOnly={true}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "var(--margin-item-spacing)",
                      background: "var(--ash)",
                    }}
                    className="mark-down-viewer"
                  >
                    <ReactMarkdown children={description} />
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
export default OrganisationJobPost;
