import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import EditIcon from "@material-ui/icons/Edit";
import { useMediaQuery } from "@material-ui/core";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import Footer from "../../components/Footer";
import useStyles from "../../styles/orginsation_job_post";
import { Link } from "react-router-dom";

const jobPost = {
  id: "1238959134914asd14",
  title: "Software Engineer",
  requirements:
    "lorem epsum asdid jasd askjd akjsdhnajklsdn jasnd asjkd naskldn ",
  mail: "microsoft@gmail.com",
  contact: "+88915151 515",
};

const OrganisationJobPost = (props) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  console.log(props.match.params.jobid);
  const jobId = props.match.params.jobid;
  const jobUrl = `/home/job/${jobId}/edit`;

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
                  <Link to={jobUrl}>
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
                    value={jobPost.title}
                    readOnly={true}
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="requirements"
                    placeholder="Enter job requirements"
                    type="text"
                    value={jobPost.requirements}
                    readOnly={true}
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="mail"
                    placeholder="Enter email (optional)"
                    type="text"
                    value={jobPost.mail}
                    readOnly={true}
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="phone"
                    placeholder="Enter contact number (optional)"
                    type="text"
                    value={jobPost.contact}
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
};
export default OrganisationJobPost;
