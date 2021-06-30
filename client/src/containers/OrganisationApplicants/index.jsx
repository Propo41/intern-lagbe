import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import ApplicantCard from "../../components/ApplicantCard";
import {useMediaQuery} from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "var(--content-margin-top)",
    flexWrap: "wrap",
    alignItems: "center",
  },
  card: {
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    textAlign: "center",
    paddingLeft: 50,
    paddingRight: 50,
    boxShadow: "var(--card-shadow)",
  },

  image: {
    width: "80%",
    height: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(-80%)",
  },

  imagePlaceholder: {
    width: "50%",
    height: "50%",
  },

  buttonPurple: {
    backgroundColor: "var(--purple)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
  buttonRed: {
    backgroundColor: "var(--red)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
}));

const OrganisationApplicants = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  if (applicants.length > 0) {
    return (
      <div className="content-grid-padding">
        <PublicNavbar />

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
                      <div style={{ marginTop: "var(--margin-item-spacing)" }}>
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
    );
  } else {
    return (
      <div className="content-grid-padding">
        <PublicNavbar />

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
    );
  }
};
export default OrganisationApplicants;
