import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PrivateNavBar from "../../components/PrivateNavbar/PrivateNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/organisation_profile_page";

const OrganisationProfilePage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <PrivateNavBar />
      <div className="content-grid-padding">
        <div className={classes.root}>
          <Paper elevation={5} className="semi-rounded-card">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
                <h1 className="title-medium">MY PROFILE</h1>

                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <TextInputLayout
                    icon="company"
                    placeholder="Enter company name"
                    type="text"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="description"
                    placeholder="Enter company description"
                    type="text"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="phone"
                    placeholder="Enter contact number"
                    type="text"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter home office address"
                    type="text"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    className={classes.buttonPurple}
                  >
                    SAVE CHANGES
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} lg={5} style={{ textAlign: "right" }}>
                {mobileViewBreakpoint ? (
                  <img
                    src="/assets/images/profile_blob.svg"
                    alt="landing page"
                    className={classes.image}
                  />
                ) : (
                  ""
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
};
export default OrganisationProfilePage;
