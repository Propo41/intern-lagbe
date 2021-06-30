import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import TextInputLayout from "../../components/TextInputLayout";
import EditIcon from "@material-ui/icons/Edit";
const jobPost = {
  id: "1238959134914asd14",
  title: "Software Engineer",
  requirements:
    "lorem epsum asdid jasd askjd akjsdhnajklsdn jasnd asjkd naskldn ",
  mail: "microsoft@gmail.com",
  contact: "+88915151 515",
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "var(--content-margin-top)",
    flexWrap: "wrap",
    alignItems: "center",
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
    justifyContent: "center",
    width: "80%",
    height: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
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
}));

const OrganisationJobPostEdit = () => {
  const classes = useStyles();

  return (
    <div className="content-grid-padding">
      <PublicNavbar />

      <div className={classes.root}>
        <Paper elevation={5} className="semi-rounded-card">
          <Grid container spacing={5}>
            <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
              <h1 className="title-medium">MAKE CHANGES</h1>

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <TextInputLayout
                  icon="bookmark"
                  placeholder="Enter job title"
                  type="text"
                  value={jobPost.title}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="requirements"
                  placeholder="Enter job requirements"
                  type="text"
                  value={jobPost.requirements}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="mail"
                  placeholder="Enter email (optional)"
                  type="text"
                  value={jobPost.mail}
                />
              </div>
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <TextInputLayout
                  icon="phone"
                  placeholder="Enter contact number (optional)"
                  type="text"
                  value={jobPost.contact}
                />
              </div>

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                >
                  SAVE CHANGES
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} lg={5} style={{ textAlign: "right" }}>
              <img
                src="/assets/images/job_offers_blob.svg"
                alt="landing page"
                className={classes.image}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};
export default OrganisationJobPostEdit;
