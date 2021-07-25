import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PrivateNavBar from "../../components/PrivateNavbar/PrivateNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/organisation_profile_page";
import { GET_AUTH, POST_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";

const OrganisationProfilePage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [form, setFormInput] = React.useState(null);

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(
          `api/company/profile/${localStorage.getItem("uid")}`
        );
        setProfileInfo(data);
        setFormInput(data);
        console.log(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    exe();
  }, []);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    /*    try {
      const { data } = await POST_AUTH(`api/company/profile`, form);
      console.log(data);
    } catch (e) {
      console.log(e);
      setError(true);
    } */
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return <div>Error</div>;
  }
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
                    value={profileInfo.name}
                    onInputChange={onInputChange}
                    name="name"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="phone"
                    placeholder="Enter contact number"
                    type="text"
                    value={profileInfo.contact}
                    onInputChange={onInputChange}
                    name="contact"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter district"
                    type="text"
                    value={profileInfo.district}
                    onInputChange={onInputChange}
                    name="district"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter office address"
                    type="text"
                    value={profileInfo.officeAddress}
                    onInputChange={onInputChange}
                    name="officeAddress"
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="description"
                    placeholder="Enter company description"
                    type="text"
                    value={profileInfo.companyDescription}
                    onInputChange={onInputChange}
                    name="companyDescription"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    className={classes.buttonPurple}
                    onClick={onFormSubmit}
                    disabled={form === profileInfo}
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
