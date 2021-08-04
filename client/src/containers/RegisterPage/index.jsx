import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/register_page";
import { POST } from "../../api/api.js";
import errorHandling from "../../utils/error_handling.js";
import Alert from "../../components/AlertCustom";

const RegisterPage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [form, setForm] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);

  const onInput = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    setLoadingBar(true);
    try {
      const { data } = await POST("auth/user/register", {
        email: form.email,
        password: form.password,
      });
      console.log(data);
      if (data.responseStatus.statusCode === 200) {
        console.log(
          "We have sent a verification email to your account. Please verify yourself first before continuing."
        );
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
      }
    } catch (e) {
      setLoadingBar(false);
      console.log(e.response.data.statusDescription);
      if (e.response) {
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
              <h1 className="title-medium">REGISTER. IT'S FREE!</h1>

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter your company email"
                  type="email"
                  onInputChange={onInput}
                  name="email"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Enter your password"
                  type="password"
                  onInputChange={onInput}
                  name="password"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Confirm your password"
                  type="password"
                  onInputChange={onInput}
                  name="confirmPassword"
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                  onClick={onSubmit}
                >
                  REGISTER
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
            {mobileViewBreakpoint ? (
              <img
                src="/assets/images/register_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>

      <Footer />
    </>
  );
};
export default RegisterPage;
