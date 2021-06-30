import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ApplicantCard from "../../components/ApplicantCard";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_applicants";

const applicants = [
  {
    name: "Matcovic",
    mail: "tashfiqnahiyan@gmail.com",
    contact: "+9910 122 5645",
  },
  {
    name: "Tashfiq Nahiyan Khan",
    mail: "tashfiqnahiyan@gmail.com",
    contact: "+9910 122 5645",
  },
  {
    name: "Zunayed Rahim Ahmed",
    mail: "tashfiqnahiyan@gmail.com",
    contact: "+9910 122 5645",
  },
  {
    name: "Mustofa Ahmed",
    mail: "tashfiqnahiyan@gmail.com",
    contact: "+9910 122 5645",
  },
];

const OrganisationApplicants = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  if (applicants.length > 0) {
    return (
      <>
        <PrivateNavbar />
        <div className="content-grid-padding">
          <div className={classes.root}>
            <Paper elevation={5} className="semi-rounded-card">
              <Grid container spacing={5}>
                <Grid item xs={12} lg={8} style={{ textAlign: "left" }}>
                  <h1 className="title-medium">APPLICANTS</h1>

                  {applicants.map((applicant, index) => {
                    if (index === 0) {
                      return (
                        <div
                          style={{ marginTop: "var(--margin-item-spacing-lg)" }}
                        >
                          <ApplicantCard
                            name={applicant.name}
                            mail={applicant.mail}
                            contact={applicant.contact}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          style={{ marginTop: "var(--margin-item-spacing)" }}
                        >
                          <ApplicantCard
                            name={applicant.name}
                            mail={applicant.mail}
                            contact={applicant.contact}
                          />
                        </div>
                      );
                    }
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
        <div className="content-grid-padding">
          <PrivateNavbar />
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
                  You don't have any postings listed.
                  <span className="text-button-lg"> Create a new posting.</span>
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
