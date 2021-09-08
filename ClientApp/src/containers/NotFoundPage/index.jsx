import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/verify_yourself";
import { Helmet } from "react-helmet";

/**
 * @param: data: {statusCode: string, statusDescription: string}}
 */
const NotFoundPage = ({ data }) => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 Not Found</title>
      </Helmet>
      <PublicNavbar />
      <div className="content-grid-padding">
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} lg={7} style={{ textAlign: "center" }}>
            <Paper elevation={5} className="semi-rounded-card">
              <h1 className="title-medium">404 NOT FOUND</h1>
              <h1 className="content" style={{ color: "var(--darkash)" }}>
                Opps! The link is either broken or doesn't exist.
              </h1>

              <div style={{ marginTop: "var(--margin-item-spacing-lg)" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  className={classes.buttonPurple}
                  onClick={(e) => (window.location.href = "/")}
                >
                  HOMEPAGE
                </Button>
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
                src="/assets/images/error_blob.svg"
                alt="page not found"
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
export default NotFoundPage;
