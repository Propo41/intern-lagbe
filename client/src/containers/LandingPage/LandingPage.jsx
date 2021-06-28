import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import LandingPageImage from "../../assets/images/landing_page_image.svg";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FilterBySort from "../../components/FilterBySort";
import FilterByLocation from "../../components/FilterByLocation";
import AvailPositionCard from "../../components/AvailPositionCard";

const LandingPage = () => {
  const useStyles = makeStyles(() => ({
    landingImage: {
      marginLeft: 50,
      width: "90%",
      height: "90%",
    },

    getStartedCard: {
      padding: 30,
      textAlign: "center",
      marginTop: "65px",
    },

    buttonSmallPurple: {
      backgroundColor: "var(--purple)",
      color: "white",
      fontFamily: "Sen",
      marginTop: 10,
      padding: "var(--button-padding)",
    },

    buttonSmallRed: {
      backgroundColor: "var(--red)",
      color: "white",
      fontFamily: "Sen",
      marginTop: 10,
      padding: "var(--button-padding)",
    },
  }));

  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />
      {/* Landing page */}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <h1 className="landing-page-title">Apply for your dream Job</h1>
          <h1 className="landing-page-subtitle">
            A unified platform dedicated to hosting internship job posts in
            Bangladesh. Apply for your dream job directly from our website
            without any hassle of searching everywhere. Simply search for your
            desired job and apply to the job you like with your resume
            completely for free!
          </h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src="/assets/images/landing_page_image.svg"
            alt="landing page"
            className={classes.landingImage}
          />
        </Grid>
      </Grid>
      {/* Landing page body */}
      <Grid container spacing={5}>
        <Grid
          item
          sm={12}
          lg={8}
          style={{
            marginTop: "65px",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              style={{
                alignSelf: "center",
              }}
            >
              <h1
                className="section-heading"
                style={{
                  margin: "0",
                }}
              >
                FIND YOUR DREAM JOB
              </h1>
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "flex-end",
                zIndex: "1000",
              }}
            >
              <FilterBySort />
              <FilterByLocation />
            </Grid>
          </Grid>
          <AvailPositionCard />
          <AvailPositionCard />
          <AvailPositionCard />
        </Grid>

        <Grid item sm={12} lg={4}>
          <Paper elevation={2} className={classes.getStartedCard}>
            <h1 className="section-heading">GET STARTED</h1>
            <h1 className="content">Lorem ipsum dolor sit amet, consectetur</h1>
            <Button
              variant="contained"
              fullWidth={true}
              className={classes.buttonSmallPurple}
            >
              CREATE A RESUME
            </Button>

            <Button
              variant="contained"
              fullWidth={true}
              className={classes.buttonSmallRed}
            >
              APPLYING TIPS
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

/* https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sticky-footer  -> sticky footer to bottom */

export default LandingPage;
