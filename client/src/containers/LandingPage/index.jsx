import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FilterBySort from "../../components/FilterBySort";
import FilterByLocation from "../../components/FilterByLocation";
import AvailPositionCard from "../../components/AvailPositionCard";
import TextInputLayout from "../../components/TextInputLayout";
import Footer from "../../components/Footer";
import useStyles from "../../styles/landing_page";
import { useEffect } from "react";
import { GET } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
//https://material-ui.com/components/chips/  use chips after selecting locations

const LandingPage = () => {
  const classes = useStyles();
  const [companies, setCompanies] = React.useState(null);
  const [landingPage, setLandingPage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [filteredLocations, setFilteredLocations] = React.useState([]);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const res = await GET("api/landingpage/companies");
          setCompanies(res.data);
          console.log(res.data);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const res = await GET("api/landingpage");
          setLandingPage(res.data);
          console.log(res.data);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
        setError(false);
        setFilteredLocations(["Dhaka"]);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, []);

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
        {/* Place Toolbar Here */}
        <PublicNavbar />
        <div className="content-grid-padding">
          {/* Landing page */}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <h1 className="landing-page-title">{landingPage.title}</h1>
              <h1 className="landing-page-subtitle">{landingPage.subtitle}</h1>
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
              xs={12}
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
              <div
                style={{
                  marginTop: "30px",
                }}
              />

              {
                /* select those companies which are in filteredLocation */
                filteredLocations.length > 0 &&
                  companies &&
                  companies.map((company) => {
                    if (filteredLocations.includes(company.district)) {
                      return (
                        <AvailPositionCard
                          key={company.id}
                          expandable={false}
                          company={company.name}
                          address={company.officeAddress}
                          disabledButton={
                            company.availableJobCount === 0 ? true : false
                          }
                          avatar={company.profilePictureUrl}
                        />
                      );
                    } else {
                      return null;
                    }
                  })
              }

              {filteredLocations.length === 0 &&
                companies &&
                companies.map((company) => {
                  return (
                    <AvailPositionCard
                      key={company.id}
                      expandable={false}
                      company={company.name}
                      address={company.officeAddress}
                      disabledButton={
                        company.availableJobCount === 0 ? true : false
                      }
                      avatar={company.profilePictureUrl}
                    />
                  );
                })}
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper elevation={2} className={classes.getStartedCard}>
                <h1 className="section-heading">GET STARTED</h1>
                <h1 className="content">
                  Lorem ipsum dolor sit amet, consectetur
                </h1>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonSmallPurple}
                  style={{ marginTop: "var(--margin-item-spacing-lg)" }}
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

              <Paper elevation={2} className={classes.subscriptionCard}>
                <h1 className="section-heading">SUBSCRIBE TO NEWSLETTER</h1>
                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <TextInputLayout
                    icon="mail"
                    placeholder="Enter your email"
                    type="mail"
                  />
                </div>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonSmallPurple}
                  style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                >
                  SUBSCRIBE
                </Button>
              </Paper>
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
  }
};

/* https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sticky-footer  -> sticky footer to bottom */

export default LandingPage;
