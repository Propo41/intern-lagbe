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

const ChangePassword = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="content-grid-padding">
      <PublicNavbar />
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
          <Paper elevation={5} className="semi-rounded-card">
            <h1 className="title-medium">CHANGE PASSWORD</h1>
            <h1 className="content" style={{ color: "var(--darkash)" }}>
              Please enter your company email. We’ll send a redirect link to the
              given email address if you have an account associated with us.
              Simply follow the email to change your password.
            </h1>
            <div style={{ marginTop: "var(--margin-item-spacing)" }}>
              <TextInputLayout
                icon="mail"
                placeholder="Enter your password"
                type="email"
              />
            </div>
            <div style={{ marginTop: "var(--margin-item-spacing)" }}>
              <TextInputLayout
                icon="mail"
                placeholder="Confirm your password"
                type="email"
              />
            </div>
            <div style={{ marginTop: "var(--margin-item-spacing)" }}>
              <Button
                variant="contained"
                fullWidth={true}
                className={classes.buttonPurple}
              >
                CHANGE
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
              src="/assets/images/password_blob.svg"
              alt="landing page"
              className={classes.image}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default ChangePassword;
