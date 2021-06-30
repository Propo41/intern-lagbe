import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/verify_yourself";

const AboutPage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <PublicNavbar />
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">ABOUT</h1>
              <h1 className="content" style={{ color: "var(--darkash)" }}>
                A unified platform dedicated to hosting internship job posts in
                Bangladesh. Apply for your dream job directly from our website
                without any hassle of searching everywhere. Simply search for
                your desired job and apply to the job you like with your resume
                completely for free!
              </h1>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {mobileViewBreakpoint ? (
              <img
                src="/assets/images/about_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
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
export default AboutPage;
