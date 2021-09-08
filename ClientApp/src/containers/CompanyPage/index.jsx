import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AvailPositionCard from "../../components/AvailPositionCard";
import Label from "../../components/Label";
import Footer from "../../components/Footer";
import useStyles from "../../styles/company_page";
import { GET, POST } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import ErrorPage from "../../components/ErrorPage";
import MarkdownViewer from "../../components/MarkdownViewer";
import { Hidden } from "@material-ui/core";
import { Helmet } from "react-helmet";

const CompanyPage = (props) => {
  const classes = useStyles();
  const { companyId } = useParams();
  console.log("company id", companyId);
  const [companyInfo, setCompanyInfo] = React.useState(null);
  const [jobPostings, setJobPostings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const res = await GET(`api/landingpage/company/${companyId}`);
          setCompanyInfo(res.data);
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
          const res = await GET(`api/landingpage/company/${companyId}/jobs`);
          setJobPostings(res.data);
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
        // setFilteredLocations(["Dhaka"]);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, [companyId]);

  if (error) {
    return (
      <>
        <ErrorPage
          title="404"
          description="The page you requested, could not be found."
          to="/"
        />
      </>
    );
  } else if (loading) {
    return <LoadingAnimation />;
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{companyInfo.name}</title>
        </Helmet>
        <PublicNavbar />
        <div className="content-grid-padding">
          {/* Landing page */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <h1 className="title">{companyInfo.name}</h1>
              <MarkdownViewer content={companyInfo.description} />
              <div
                style={{
                  marginTop: "35px",
                }}
              >
                <Label
                  text={companyInfo.officeAddress}
                  icon={"location"}
                  color={"black"}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Hidden smDown>
                <img
                  src="/assets/images/circular_blob.svg"
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
                    AVAILABLE POSITIONS
                  </h1>
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: "30px",
                }}
              ></div>

              {jobPostings.map((job) => {
                return (
                  <div key={job.id}>
                    <AvailPositionCard
                      id={job.id}
                      companyId={companyId}
                      expandable={job.isAvailable === true ? true : false}
                      title={job.title}
                      address={job.address}
                      more={job}
                      disabledButton={job.isAvailable === true ? false : true}
                    />
                  </div>
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

export default CompanyPage;
