import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import {useMediaQuery} from "@material-ui/core";

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

const OrganisationProfilePage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="content-grid-padding">
      <PublicNavbar />

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
  );
};
export default OrganisationProfilePage;
