import React from "react";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FilterDropdown from "../../components/FilterDropdown";
import FilterByCategory from "../../components/FilterByCategory";
import AvailCompanyCard from "../../components/AvailCompanyCard";
import TextInputLayout from "../../components/TextInputLayout";
import Footer from "../../components/Footer";
import useStyles from "../../styles/landing_page";
import { useEffect } from "react";
import { GET, POST } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import { Avatar, Chip, Hidden, LinearProgress } from "@material-ui/core";
import Snackbar from "../../components/SnackbarCustom";
import Alert from "../../components/AlertCustom";
import errorHandling from "../../utils/error_handling";
import { Helmet } from "react-helmet";

//https://material-ui.com/components/chips/  use chips after selecting locations

const LandingPage = () => {
  const classes = useStyles();
  const [companies, setCompanies] = React.useState(null);
  const [landingPage, setLandingPage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [filteredLocations, setFilteredLocations] = React.useState([]);
  const [districtList, setDistrictList] = React.useState(null);
  const [jobCategories, setJobCategories] = React.useState(null);
  const [companyCategories, setCompanyCategories] = React.useState(null);
  const [form, setForm] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const res = await GET("api/landingpage/companies");
          setCompanies(res.data);
          console.log(res.data);
          resolve();
        } catch (e) {
          console.log(e);

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
          console.log(e);

          reject();
        }
      };
      exe();
    });

    const promise3 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/districts");
          console.log(data);
          setDistrictList(data.districts);
          resolve();
        } catch (e) {
          console.log(e);

          reject();
        }
      };
      exe();
    });

    const promise4 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/company-categories");
          console.log(data);
          setCompanyCategories(data.companyCategories);
          resolve();
        } catch (e) {
          console.log(e);

          reject();
        }
      };
      exe();
    });

    const promise5 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/job-categories");
          console.log(data);
          setJobCategories(data.jobCategories);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2, promise3, promise4, promise5])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
        setError(false);
        const list = {
          companyCategory: companyCategories,
          jobCategories: jobCategories,
        };
        console.log(list);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, []);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubscribeSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    setLoadingBar(true);

    try {
      const { data } = await POST("api/landingpage/subscribe", {
        email: form.email,
      });
      console.log(data);
      if (data.responseStatus.statusCode === 200) {
        setAlert(null);

        setSnackbar({
          open: true,
          message: "You are all set! Thank you for subscribing.",
          severity: "success",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1600);
      }
    } catch (e) {
      setLoadingBar(false);
      if (e.response) {
        setAlert(errorHandling(e));
      }
    }
  };

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
          <title>Intern Lagbe</title>
        </Helmet>
        {/* Place Toolbar Here */}
        <PublicNavbar />
        {snackbar && snackbar.open && (
          <Snackbar
            severity={snackbar.severity}
            open={snackbar.open}
            message={snackbar.message}
            setSnackbar={setSnackbar}
            duration={snackbar.duration}
          />
        )}
        <div className="content-grid-padding">
          {/* Landing page */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <h1 className="landing-page-title">{landingPage.title}</h1>
              <h1 className="landing-page-subtitle">{landingPage.subtitle}</h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <Hidden smDown>
                <img
                  src="/assets/images/landing_page_image.svg"
                  alt="landing page"
                  className={classes.landingImage}
                />
              </Hidden>
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
                <Grid item xs={12} sm={7} className={classes.filterContainer}>
                  {/*   <FilterByCategory
                    categoryList={[...jobCategories, ...companyCategories]}
                    setCategories={setFilteredLocations}
                    categories={filteredLocations}
                    label="CATEGORY"
                  /> */}
                  <FilterByCategory
                    categoryList={districtList}
                    setCategories={setFilteredLocations}
                    categories={filteredLocations}
                    label="LOCATION"
                  />
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: "15px",
                  display: filteredLocations.length > 0 ? "block" : "none",
                }}
              >
                {filteredLocations.map((location, index) => {
                  return (
                    <Chip
                      key={index}
                      label={location}
                      className={classes.chip}
                      onDelete={(e) => {
                        // remove location from filteredLocations
                        const newLocations = filteredLocations.filter(
                          (l) => l !== location
                        );
                        setFilteredLocations(newLocations);
                      }}
                    />
                  );
                })}
              </div>

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
                        <AvailCompanyCard
                          key={company.id}
                          id={company.id}
                          company={company.name}
                          address={company.officeAddress}
                          image={company.profilePictureUrl}
                          disabledButton={
                            company.availableJobCount === 0 ? true : false
                          }
                        />
                      );
                    } else {
                      return null;
                    }
                  })
              }

              {
                /*  if the locations in filteredlocations are not in companies, show the no jobs message */
                filteredLocations.length > 0 &&
                  companies &&
                  companies.filter((company) => {
                    return filteredLocations.includes(company.district);
                  }).length === 0 && (
                    <div style={{ justifyItems: "center", display: "grid" }}>
                      <img
                        src="/assets/images/error_blob.svg"
                        alt="landing page"
                        className={classes.image}
                        style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                      />
                      {/* <div
                        style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                      > */}
                      <h1
                        className="content"
                        style={{ color: "var(--darkash)" }}
                      >
                        No companies available
                      </h1>
                      {/* </div> */}
                    </div>
                  )
              }

              {filteredLocations.length === 0 &&
                companies &&
                companies.map((company) => {
                  return (
                    <AvailCompanyCard
                      key={company.id}
                      id={company.id}
                      company={company.name}
                      address={company.officeAddress}
                      disabledButton={
                        company.availableJobCount === 0 ? true : false
                      }
                      image={company.profilePictureUrl}
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
                  onClick={() => {
                    window.open("https://resume.io/", "_blank");
                  }}
                >
                  CREATE A RESUME
                </Button>

                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonSmallRed}
                  onClick={() => {
                    window.open(
                      "https://www.indeed.com/career-advice/resumes-cover-letters/10-resume-writing-tips",
                      "_blank"
                    );
                  }}
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
                    type="email"
                    name="email"
                    onInputChange={onInputChange}
                  />
                </div>
                <Button
                  variant="contained"
                  fullWidth={true}
                  onClick={onSubscribeSubmit}
                  disabled={form === null || loadingBar}
                  className={classes.buttonSmallPurple}
                  style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                >
                  SUBSCRIBE
                </Button>
                {alert && alert.status && (
                  <Alert
                    severity={alert.severity}
                    title={alert.title}
                    message={alert.message}
                  />
                )}
                {loadingBar && (
                  <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                    <LinearProgress />
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
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

/* https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sticky-footer  -> sticky footer to bottom */

export default LandingPage;
