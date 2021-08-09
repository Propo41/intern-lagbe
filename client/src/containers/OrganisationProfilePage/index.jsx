import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PrivateNavBar from "../../components/PrivateNavbar/PrivateNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/organisation_profile_page";
import { GET, GET_AUTH, POST_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import errorHandling from "../../utils/error_handling.js";
import Alert from "../../components/AlertCustom";
import { LinearProgress } from "@material-ui/core";
import MarkdownEditor from "../../components/MarkdownEditor";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import FilterDropdown from "../../components/FilterDropdown";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";

const OrganisationProfilePage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [form, setFormInput] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(
    "/assets/images/company_img_preview.svg"
  );
  const [alert, setAlert] = React.useState(null);
  const [districtList, setDistrictList] = React.useState(null);
  const [categoryList, setCategoryList] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);

  useEffect(() => {
    setLoadingBar(true);

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }

    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/company-categories");
          console.log(data);
          setCategoryList(data.companyCategories);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/districts");
          console.log(data);
          setDistrictList(data.districts);
          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    const promise3 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH("api/company/profile");
          console.log(data);

          setProfileInfo(data);
          setFormInput(data);
          setLoading(false);
          data.description
            ? setDescription(data.description)
            : setDescription("Enter your company description");
          setPreviewUrl(data.profilePictureUrl);

          resolve();
        } catch (e) {
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2, promise3])
      .then((values) => {
        console.log("all promises resolved");
        setLoadingBar(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoadingBar(false);
        /*  if (error) {
          setAlert(errorHandling(error));
        } */
      });
  }, [image]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(image ? "image selected" : "no image selected");
    console.log("printing form");
    console.log(form);
    window.scrollTo(0, 0);

    setLoadingBar(true);

    try {
      var formData = new FormData();
      formData.append("category", form.category);
      formData.append("contact", form.contact);
      formData.append("description", description);
      formData.append("name", form.name);
      formData.append("officeAddress", form.officeAddress);
      formData.append("profilePictureUrl", profileInfo.profilePictureUrl);
      formData.append("district", form.district);
      formData.append("file", image);

      // sending the form input to server along with the image url
      const res = await POST_AUTH(`api/company/profile`, formData);
      setAlert(null);
      setLoadingBar(false);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setLoadingBar(false);
      if (error.response) {
        setAlert(errorHandling(error));
      }
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

  return (
    <>
      <PrivateNavBar />
      {loadingBar && <LinearProgress />}

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
                      src={previewUrl}
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
                  <SelectTextInputLayout
                    icon="company"
                    placeholder="Select company category"
                    value={profileInfo.category}
                    list={categoryList}
                    onInputChange={onInputChange}
                    name="category"
                    setSelectedValue={setFormInput}
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <SelectTextInputLayout
                    icon="map"
                    placeholder="Select district"
                    value={profileInfo.district}
                    onInputChange={onInputChange}
                    list={districtList}
                    name="district"
                    setSelectedValue={setFormInput}
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
                  <MarkdownEditor
                    description={description}
                    setDescription={setDescription}
                    placeholder="Enter your company description"
                    disabled={false}
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

                {alert && alert.status && (
                  <Alert
                    severity={alert.severity}
                    title={alert.title}
                    message={alert.message}
                  />
                )}
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
