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
import MDEditor from "@uiw/react-md-editor";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const OrganisationProfilePage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [form, setFormInput] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(
          `api/company/profile`
        );
        setProfileInfo(data);
        setFormInput(data);
        console.log(data);
        setLoading(false);
        data.companyDescription
          ? setDescription(data.companyDescription)
          : setDescription("Enter your company description");
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    exe();
  }, [image]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await POST_AUTH(`api/company/profile`, {
        ...form,
        companyDescription: description,
      });
      console.log(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
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
                  <Paper
                    elevation={0}
                    component="form"
                    style={{
                      backgroundColor: "var(--ash)",
                      borderRadius: 20,
                      width: 150,
                      height: 150,
                      display: "inline-grid",
                      alignContent: "center",
                    }}
                  >
                    <Avatar
                      style={{ width: 110, height: 110, padding: "13%" }}
                      variant="square"
                      src="/assets/images/company_img_preview.svg"
                      srcSet={preview}
                    />
                  </Paper>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={imageHandler}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      style={{
                        backgroundColor: "var(--purple)",
                        position: "absolute",
                        marginLeft: "-15px",
                        marginTop: "100px",
                      }}
                    >
                      <EditIcon style={{ color: "white" }} />
                    </IconButton>
                  </label>
                </div>
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
                  <MDEditor
                    height={200}
                    value={description}
                    onChange={setDescription}
                    preview="preview"
                    className="markdown-area-style"
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
                {mobileViewBreakpoint && (
                  <img
                    src="/assets/images/profile_blob.svg"
                    alt="landing page"
                    className={classes.image}
                  />
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
