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
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(100),
      height: theme.spacing(50),
    },
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
    marginTop: "var(--content-margin-top)",
    marginLeft: 50,
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
  imageContainer: {},
}));

const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div className={classes.root}>
            <Paper elevation={5} className={classes.card}>
              <h1 className="sub-heading">YOU NEED TO SIGN IN FIRST</h1>
              <div style={{ marginTop: "30px" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                >
                  SIGN IN
                </Button>
              </div>
              <div>
                <h1 className="text-button">FORGOT PASSWORD?</h1>
              </div>
              <Divider light style={{ marginTop: "20px" }} />
              <Button
                variant="contained"
                fullWidth={true}
                className={classes.buttonRed}
                style={{ marginTop: "10px" }}
              >
                REGISTER
              </Button>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.imageContainer}>
            <img
              src="/assets/images/login_blob.svg"
              alt="landing page"
              className={classes.image}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SignInPage;
