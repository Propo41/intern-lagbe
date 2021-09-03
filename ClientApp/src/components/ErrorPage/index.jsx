import React from "react";
import { Paper, Grid, Button, Hidden } from "@material-ui/core";
import useStyles from "../../styles/error_page";
import { useNavigate } from "react-router-dom";

const ErrorPage = (props) => {
  const classes = useStyles();
  const history = useNavigate();

  return (
    <div className="content-grid-padding">
      <div className={classes.root}>
        <Paper elevation={5} className="semi-rounded-card">
          <Grid container spacing={0} className={classes.root}>
            <Hidden xsDown>
              <Grid
                item
                xs={12}
                md={7}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src="/assets/images/error_blob.svg"
                  alt="landing page"
                  className={classes.image}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} md={5} style={{ textAlign: "center" }}>
              <h1 className={classes.title}>{props.title}</h1>
              <h1 className={classes.description}>{props.description}</h1>
              <Button
                variant="contained"
                fullWidth={true}
                className={classes.buttonPurple}
                onClick={() => {
                  history.push(`${props.to}`);
                }}
              >
                Redirect
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default ErrorPage;
