import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/signin_page";
import { Link, useHistory } from "react-router-dom";
import { POST } from "../../api/api.js";

const SignInPage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [form, setForm] = React.useState(null);
  const history = useHistory();

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
    try {
      const { data } = await POST("auth/user/login", {
        email: form.email,
        password: form.password,
      });
      console.log(data);
      if (data.statusCode === 200) {
        console.log("Logged in successfully.");
        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.uid);

        history.push({
          pathname: "/",
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">YOU NEED TO SIGN IN FIRST</h1>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onInputChange={onInput}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onInputChange={onInput}
                />
              </div>

              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                  onClick={onSubmit}
                >
                  SIGN IN
                </Button>
              </div>
              <div>
                <h1
                  className="text-button"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Link to="/forgot-password">FORGOT PASSWORD?</Link>
                </h1>
              </div>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
                <h1
                  style={{
                    margin: "0 20px",
                    fontFamily: "Sen",
                    fontWeight: "normal",
                    fontSize: "var(--font-size-content-small)",
                    color: "var(--darkash)",
                  }}
                >
                  OR
                </h1>
                <div className="divider-custom-line"></div>
              </div>

              <Button
                variant="contained"
                fullWidth={true}
                className={classes.buttonRed}
                style={{ marginTop: "var(--margin-item-spacing)" }}
              >
                <Link to="/register">REGISTER</Link>
              </Button>
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
                src="/assets/images/login_blob.svg"
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
export default SignInPage;
