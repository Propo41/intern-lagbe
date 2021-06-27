import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import LandingPageImage from "../../assets/images/landing_page_image.svg";

const LandingPage = () => {
  return (
    <div>
      <PublicNavbar />
      <Grid container className="content-grid-padding">
        <Grid item xs>
          <h1 className="landing-page-title">Apply for your dream Job</h1>
          <h1 className="landing-page-subtitle">
            A unified platform dedicated to hosting internship job posts in
            Bangladesh. Apply for your dream job directly from our website
            without any hassle of searching everywhere. Simply search for your
            desired job and apply to the job you like with your resume
            completely for free!
          </h1>
        </Grid>
        <Grid item xs>
          <img src="/assets/images/landing_page_image.svg" alt="landing page" />
        </Grid>
      </Grid>
    </div>
  );
};

/* https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sticky-footer  -> sticky footer to bottom */

export default LandingPage;
