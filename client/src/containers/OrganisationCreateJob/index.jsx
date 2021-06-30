import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { Divider } from "@material-ui/core";

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
    justifyContent: "center",
    width: "80%",
    height: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
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

const OrganisationCreateJob = () => {
  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />

      <div className={classes.root}>
        <Paper elevation={5} className="semi-rounded-card">
          <Grid container spacing={5}>
            <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
              <h1 className="title-medium">ADD NEW JOB LISTING</h1>

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="bookmark"
                  placeholder="Enter job title"
                  type="text"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="requirements"
                  placeholder="Enter job requirements"
                  type="text"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter email (optional)"
                  type="text"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="phone"
                  placeholder="Enter contact number (optional)"
                  type="text"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                >
                 CREATE NEW LISTING
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} lg={5} style={{ textAlign: "right" }}>
              <img
                src="/assets/images/job_offers_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};
export default OrganisationCreateJob;
