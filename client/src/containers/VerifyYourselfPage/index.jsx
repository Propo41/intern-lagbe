import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/verify_yourself";

const VerifyYourselfPage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <PublicNavbar />
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">VERIFY YOURSELF</h1>
              <h1 className="content" style={{ color: "var(--darkash)" }}>
                A verification code has been sent to your email. Please enter
                the code down below to verify yourself.
              </h1>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Enter the verification code"
                  type="text"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                >
                  VERIFY
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            lg={5}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {mobileViewBreakpoint ? (
              <img
                src="/assets/images/security_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            ) : (
              ""
            )}
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
};
export default VerifyYourselfPage;
