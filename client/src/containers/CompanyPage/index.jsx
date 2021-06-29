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
import Label from "../../components/Label";

const companies = {
  company: "Microsoft",
  address: "Dhanmondi, Dhaka",
  jobs: [
    {
      title: "SOFTWARE ENGINEER",
      address: "Dhaka, Dhanmondi",
      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in accumsan platea. Ridiculus ",
      mail: "microsoft@aust.edu",
      contact: "+880 19611156262",
      status: "false",
    },
    {
      title: "PRODUCTION ENGINEER",
      address: "Dhaka, Dhanmondi",

      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in accumsan platea. Ridiculus ",
      contact: "microsoft@aust.edu",
      mail: "+880 19611156262",
      status: "true",
    },
    {
      title: "FRONT END ENGINEER",
      address: "Dhaka, Dhanmondi",

      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in accumsan platea. Ridiculus ",
      contact: "microsoft@aust.edu",
      mail: "+880 19611156262",
      status: "true",
    },
    {
      title: "FRONT END ENGINEER",
      address: "Dhaka, Dhanmondi",

      requirements:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in accumsan platea. Ridiculus ",
      contact: "microsoft@aust.edu",
      mail: "+880 19611156262",
      status: "true",
    },
  ],
};
const CompanyPage = () => {
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

    c: {
      borderRadius: 10,
    },
  }));

  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />
      {/* Landing page */}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <h1 className="title">Microsoft</h1>
          <h1 className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis a
            nulla id nisl. At urna non hendrerit feugiat aliquet. Proin at
            blandit ut pellentesque at in accumsan platea. Ridiculus urna non
            hendrerit feugiat aliquet. Proin at blandit ut pellentesque at in
            accumsan platea. Ridiculus
          </h1>
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <Label text={"Dhaka"} icon={"location"} color={"black"} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src="/assets/images/circular_blob.svg"
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
                AVAILABLE POSITIONS
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
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: "30px",
            }}
          ></div>

          {companies.jobs.map((job, index) => {
            return (
              <AvailPositionCard
                expandable={job.status === "true" ? true : false}
                company={job.title}
                address={job.address}
                more={job}
                disabledButton={job.status === "true" ? false : true}
              />
            );
          })}
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

export default CompanyPage;
