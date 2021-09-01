import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/forgot_password";
import { POST } from "../../api/api";
import Alert from "../../components/AlertCustom";
import errorHandling from "../../utils/error_handling";

const ForgotPassword = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [loadingBar, setLoadingBar] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [emailSent, setEmailSent] = React.useState(false);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const onInputChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      setLoadingBar(true);
      var formData = new FormData();
      formData.append("email", email);

      const { data } = await POST(`auth/user/forgot-password`, formData);
      console.log(data);
      if (data.statusCode === 200) {
        setLoadingBar(false);
        setEmailSent(true);
        setAlert({
          status: true,
          severity: "info",
          message: [
            "An email has been sent to your account with a temporary link. Follow through the link to change your password.",
          ],
          title: "Password reset email sent",
        });
      }
    } catch (e) {
      console.log(e);
      setLoadingBar(false);
      if (e) {
        setAlert(errorHandling(e));
      }
    }
  };

  return (
    <>
      <PublicNavbar />
      {loadingBar && <LinearProgress />}
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">FORGOT PASSWORD?</h1>
              <h1 className="content" style={{ color: "var(--darkash)" }}>
                Please enter your company email. We’ll send a redirect link to
                the given email address if you have an account associated with
                us. Simply follow the email to change your password.
              </h1>

              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter your company email"
                  type="email"
                  onInputChange={onInputChange}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                  onClick={onSubmit}
                  disabled={emailSent}
                >
                  SEND
                </Button>
              </div>

              {alert && alert.status && (
                <Alert
                  severity={alert.severity}
                  title={alert.title}
                  message={alert.message}
                />
              )}
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            lg={5}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {mobileViewBreakpoint && (
              <img
                src="/assets/images/forgot_password_blob.svg"
                alt="landing page"
                className={classes.image}
              />
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
export default ForgotPassword;
