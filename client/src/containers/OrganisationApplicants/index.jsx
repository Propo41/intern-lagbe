import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ApplicantCard from "../../components/ApplicantCard";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import PrivateNavbar from "../../components/PrivateNavbar/PrivateNavbar";
import useStyles from "../../styles/organisation_applicants";
import { GET_AUTH } from "../../api/api.js";
import LoadingAnimation from "../../components/LoadingAnimation";
import { Alert } from "@material-ui/lab";
import { Select, MenuItem } from "@material-ui/core";

const OrganisationApplicants = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [jobList, setJobList] = React.useState(null);
  const [applicantList, setApplicantList] = React.useState(null);
  const [filteredApplicants, setFilteredApplicants] =
    React.useState("All Applicants");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleChange = (event) => {
    setFilteredApplicants(event.target.value);
  };

  useEffect(() => {
    // fetch all applicants
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company/applicants`);
          setApplicantList(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    // fetch all jobs posted
    const promise2 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET_AUTH(`api/company`);
          setJobList(data);
          console.log(data);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      };
      exe();
    });

    Promise.all([promise1, promise2])
      .then((values) => {
        console.log("all promises resolved");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      });
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return (
      <div>
        <Alert color="error"></Alert>
      </div>
    );
  }

  return (
    <>
      <PrivateNavbar />
      <div className="content-grid-padding">
        <div className={classes.root}>
          <Paper elevation={5} className="semi-rounded-card">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={8} style={{ textAlign: "left" }}>
                <h1 className="title-medium">APPLICANTS</h1>
                <Select
                  labelId="select-title"
                  id="customized-select"
                  value={filteredApplicants}
                  onChange={handleChange}
                  className={classes.selectInput}
                >
                  <MenuItem value="All Applicants">
                    <em>All Applicants</em>
                  </MenuItem>
                  {jobList.map((job) => {
                    return (
                      <MenuItem key={job.id} value={job.id}>
                        {job.title}
                      </MenuItem>
                    );
                  })}
                </Select>

                {
                  /* select those applicants which are in filteredApplicants */
                  filteredApplicants.length > 0 &&
                    filteredApplicants !== "All Applicants" &&
                    applicantList &&
                    applicantList.map((applicant, index) => {
                      if (filteredApplicants.includes(applicant.jobId)) {
                        return (
                          <div
                            key={applicant.id}
                            style={{
                              marginTop:
                                index === 0
                                  ? "var(--margin-item-spacing-lg)"
                                  : "var(--margin-item-spacing)",
                            }}
                          >
                            {jobList.map((job) =>
                              job.id === applicant.jobId ? (
                                <ApplicantCard
                                  key={applicant.id}
                                  applicant={applicant}
                                  title={job.title}
                                />
                              ) : (
                                ""
                              )
                            )}
                          </div>
                        );
                      }
                    })
                }

                {
                  /* select All the available  Applicants */
                  filteredApplicants.length > 0 &&
                    filteredApplicants === "All Applicants" &&
                    applicantList &&
                    applicantList.map((applicant, index) => {
                      return (
                        <div
                          key={applicant.id}
                          style={{
                            marginTop:
                              index === 0
                                ? "var(--margin-item-spacing-lg)"
                                : "var(--margin-item-spacing)",
                          }}
                        >
                          {jobList.map((job) =>
                            job.id === applicant.jobId ? (
                              <ApplicantCard
                                key={applicant.id}
                                applicant={applicant}
                                title={job.title}
                              />
                            ) : (
                              ""
                            )
                          )}
                        </div>
                      );
                    })
                }

                {
                  /*  if the selected job has no applicants, show the no applicants message */
                  filteredApplicants.length > 0 &&
                    filteredApplicants !== "All Applicants" &&
                    applicantList &&
                    applicantList.filter((applicant) => {
                      return filteredApplicants.includes(applicant.jobId);
                    }).length === 0 && (
                      <div
                        style={{
                          marginTop: "var(--margin-item-spacing-lg)",
                          paddingBottom: "50%",
                        }}
                      >
                        <h1
                          className="content"
                          style={{ color: "var(--darkash)" }}
                        >
                          Seems like you don't have any applicants yet.
                        </h1>
                      </div>
                    )
                }
                {
                  /*  if the company has no applicants yet, show the no applicants message */
                  filteredApplicants.length > 0 &&
                    filteredApplicants === "All Applicants" &&
                    applicantList.length === 0 && (
                      <div
                        style={{
                          marginTop: "var(--margin-item-spacing-lg)",
                          paddingBottom: "50%",
                        }}
                      >
                        <h1
                          className="content"
                          style={{ color: "var(--darkash)" }}
                        >
                          Seems like you don't have any applicants yet.
                        </h1>
                      </div>
                    )
                }
              </Grid>

              <Grid item xs={12} lg={4} style={{ textAlign: "right" }}>
                {mobileViewBreakpoint && (
                  <img
                    src="/assets/images/applicants_blob.svg"
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
export default OrganisationApplicants;
