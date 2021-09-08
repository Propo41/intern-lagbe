import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_create_job";
import { GET, GET_AUTH, POST_AUTH } from "../../api/api.js";
import MDEditor from "@uiw/react-md-editor";
import errorHandling from "../../utils/error_handling.js";
import Alert from "../../components/AlertCustom";
import { LinearProgress } from "@material-ui/core";
import MarkdownEditor from "../../components/MarkdownEditor";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";
import Snackbar from "../../components/SnackbarCustom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { Helmet } from "react-helmet";

const OrganisationCreateJob = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [form, setFormInput] = React.useState(null);
  const [description, setDescription] = React.useState(
    "Enter your job requirements in details"
  );
  const [alert, setAlert] = React.useState(null);
  const [loadingBar, setLoadingBar] = React.useState(false);
  const [districtList, setDistrictList] = React.useState(null);
  const [categoryList, setCategoryList] = React.useState(null);
  const [remunerationList, setRemunerationList] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const [companyInfo, setCompanyInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

/*   // check profile status
  // only allow creating jobs iff profile is completed
  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/job-categories");
          console.log(data);
          resolve(data.jobCategories);
        } catch (e) {
          reject(e);
        }
      };
      exe();
    });

    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/profile-config`);
          const temp = data.companyInfo;
          temp.email = data.email;
          resolve(temp);
          if (!temp.isProfileComplete) {
            window.location.href = `/`;
          }
        } catch (e) {
          console.log(e);
          window.location.href = `/`;
          reject(e);
        }
      };
      exe();
    });

    const promise3 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/districts");
          console.log(data);
          resolve(data.districts);
        } catch (e) {
          reject(e);
        }
      };
      exe();
    });

    const promise4 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET("api/landingpage/remuneration");
          console.log(data);

          resolve(data.remuneration);
        } catch (e) {
          if (e) {
            setAlert(errorHandling(e));
          }
          reject(e);
        }
      };
      exe();
    });

    Promise.all([promise1, promise2, promise3, promise4])
      .then((values) => {
        console.log("all promises resolved");
        console.log(values);

        setCategoryList(values[0]);
        setCompanyInfo(values[1]);
        setDistrictList(values[2]);
        setRemunerationList(values[3]);

        setFormInput({
          contactEmail: values[1].email,
          contactPhone: values[1].contact,
          district: values[1].district,
          address: values[1].officeAddress,
        });

        setLoadingBar(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoadingBar(false);
      });
  }, []);
 */
  const onInputChange = (event) => {
    const { value, name } = event.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(form);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoadingBar(true);

    console.log(form);
    try {
      const { data } = await POST_AUTH(`api/company/job`, {
        ...form,
        requirements: description,
      });
      setAlert(null);
      console.log(data);

      setSnackbar({
        open: true,
        message: "Job created successfully!",
        severity: "success",
        duration: 3000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (e) {
      setLoadingBar(false);
      console.log(e);
      if (e.response) {
        setAlert(errorHandling(e));
      }
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div className="content-grid-padding">
        <div className={classes.root}>
          <Paper elevation={5} className="semi-rounded-card">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
                <h1 className="title-medium">ADD NEW JOB LISTING</h1>

                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <TextInputLayout
                    icon="bookmark"
                    placeholder="Enter job title"
                    type="text"
                    onInputChange={onInputChange}
                    name="title"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="mail"
                    placeholder="Enter email"
                    type="email"
                    onInputChange={onInputChange}
                    name="contactEmail"
                    value={companyInfo && companyInfo.email}
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <SelectTextInputLayout
                    icon="company"
                    placeholder="Select job category"
                    list={categoryList}
                    onInputChange={onInputChange}
                    name="category"
                    setSelectedValue={setFormInput}
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="phone"
                    placeholder="Enter contact number"
                    type="text"
                    value={companyInfo && companyInfo.contact}
                    onInputChange={onInputChange}
                    name="contactPhone"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <SelectTextInputLayout
                    icon="map"
                    placeholder="Select district"
                    onInputChange={onInputChange}
                    list={districtList}
                    name="district"
                    setSelectedValue={setFormInput}
                    value={companyInfo && companyInfo.district}
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <TextInputLayout
                    icon="location"
                    placeholder="Enter address"
                    type="text"
                    onInputChange={onInputChange}
                    value={companyInfo && companyInfo.officeAddress}
                    name="address"
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <SelectTextInputLayout
                    icon="map"
                    placeholder="Select remuneration"
                    value={null}
                    onInputChange={onInputChange}
                    list={remunerationList}
                    name="remuneration"
                    setSelectedValue={setFormInput}
                  />
                </div>

                <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                  <MarkdownEditor
                    description={description}
                    setDescription={setDescription}
                    placeholder="Enter your job description"
                    disabled={false}
                  />
                </div>
                <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    className={classes.buttonPurple}
                    onClick={submitForm}
                  >
                    CREATE NEW LISTING
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
            </Grid>
          </Paper>
        </div>
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
export default OrganisationCreateJob;
