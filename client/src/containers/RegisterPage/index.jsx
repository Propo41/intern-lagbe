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

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
          <Paper elevation={5} className="semi-rounded-card">
            <h1 className="title-medium">REGISTER. IT'S FREE!</h1>

            <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
              <TextInputLayout
                icon="mail"
                placeholder="Enter your company email"
                type="email"
              />
            </div>
            <div style={{ marginTop: "var(--margin-item-spacing)" }}>
              <TextInputLayout
                icon="lock"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div style={{ marginTop: "var(--margin-item-spacing)" }}>
              <TextInputLayout
                icon="lock"
                placeholder="Confirm your password"
                type="password"
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
          <img
            src="/assets/images/register_blob.svg"
            alt="landing page"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterPage;
