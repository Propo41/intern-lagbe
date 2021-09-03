import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/change_password";
import LoadingAnimation from "../../components/LoadingAnimation";
import { GET, POST } from "../../api/api";
import { useEffect } from "react";
import useQuery from "../../utils/util";
import errorHandling from "../../utils/error_handling";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/AlertCustom";

const ChangePassword = (props) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [loadingBar, setLoadingBar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [form, setFormInput] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [alert, setAlert] = React.useState(null);

  const history = useNavigate();
  let query = useQuery();

  console.log(query.get("token"));
  console.log(query.get("uid"));

  const token = query.get("token");
  const uid = query.get("uid");

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET(
          `auth/user/forgot-password?token=${token}&&uid=${uid}`
        );
        console.log(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(true);
      }
    };
    exe();
  }, [token, uid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      console.log("password missmatch");

      setAlert({
        status: true,
        message: ["Passwords don't match"],
        title: "Invalid input",
        severity: "error",
      });

      return;
    }

    try {
      setLoadingBar(true);
      setAlert(null);
      var formData = new FormData();
      formData.append("password", form.password);
      formData.append("uid", uid);
      formData.append("token", token);

      const { data } = await POST(`auth/user/forgot-password/new`, formData);
      console.log(data);

      if (data.statusCode === 200) {
        setLoadingBar(false);
        history.push("/verification-success");
      }
    } catch (e) {
      console.log(e);
      setLoadingBar(false);
      if (e) {
        setAlert(errorHandling(e));
      }
    }
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(form);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p>Token has expired or is invalid.</p>;
  }

  return (
    <>
      <PublicNavbar />
      {loadingBar && <LinearProgress />}
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">CHANGE PASSWORD</h1>
              <h1 className="content" style={{ color: "var(--darkash)" }}>
                Please enter your company email. We’ll send a redirect link to
                the given email address if you have an account associated with
                us. Simply follow the email to change your password.
              </h1>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onInputChange={onInputChange}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="lock"
                  placeholder="Confirm your password"
                  type="password"
                  name="confirmPassword"
                  onInputChange={onInputChange}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                  onClick={onSubmit}
                >
                  CHANGE
                </Button>
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                {alert && alert.status && (
                  <Alert
                    severity={alert.severity}
                    title={alert.title}
                    message={alert.message}
                  />
                )}
              </div>
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
                src="/assets/images/password_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            )}
          </Grid>
        </Grid>
      </div>
      {/* <div
        style={{
          marginTop: "var(--margin-footer-spacing)",
        }}
      >
        <Footer />
      </div> */}
    </>
  );
};
export default ChangePassword;
