import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ApplicantCard from "../../components/ApplicantCard";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_applicants";
import { GET_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import { Alert } from "@material-ui/lab";

const OrganisationApplicants = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [applicantList, setApplicantList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    // fetch all applicants
    const promise = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/applicants`);
          setApplicantList(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    Promise.all([promise])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return (
      <div>
        <Alert color="error"></Alert>
      </div>
    );
  }

  if (applicantList.length > 0) {
    return (
      <>
        <PrivateNavbar />
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <Grid container spacing={5}>
                <Grid item xs={12} lg={8} style={{ textAlign: "left" }}>
                  <h1 className="title-medium">APPLICANTS</h1>

                  {applicantList.map((applicant, index) => {
                    return (
                      <div
                        key={applicant.id}
                        style={{
                          marginTop:
                            index === 0
                              ? "var(--margin-item-spacing-lg)"
                              : "var(--margin-item-spacing)",
                        }}
                      >
                        <ApplicantCard applicant={applicant} />
                      </div>
                    );
                  })}
                </Grid>

                <Grid item xs={12} lg={4} style={{ textAlign: "right" }}>
                  {mobileViewBreakpoint && (
                    <img
                      src="/assets/images/applicants_blob.svg"
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
  } else {
    return (
      <>
        <PrivateNavbar />
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <div style={{ textAlign: "left" }}>
                <h1 className="title-medium">APPLICANTS</h1>
              </div>

              <img
                src="/assets/images/applicants_blob.svg"
                alt="landing page"
                className={classes.imagePlaceholder}
                style={{ marginTop: "var(--margin-item-spacing-lg)" }}
              />
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <h1 className="content" style={{ color: "var(--darkash)" }}>
                  Seems like you don't have any applicants yet.
                </h1>
              </div>
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
export default OrganisationApplicants;
