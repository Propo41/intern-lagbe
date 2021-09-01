import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PublicNavbar from "../../components/PublicNavbar/PublicNavbar";
import { useMediaQuery } from "@material-ui/core";
import Footer from "../../components/Footer";
import useStyles from "../../styles/verify_yourself";
import { GET } from "../../api/api.js";
import { useEffect } from "react";
import LoadingAnimation from "../../components/LoadingAnimation";

const AboutPage = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 1280px)");
  const [about, setAbout] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET("api/landingpage/about");
        setAbout(data.aboutUs);
        console.log(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  } else {
    return (
      <>
        <PublicNavbar />
        <div className="content-grid-padding">
          <Grid container spacing={5} className={classes.root}>
            <Grid item xs={12} lg={7} style={{ textAlign: "left" }}>
              <Paper elevation={5} className="semi-rounded-card">
                <h1 className="title-medium">ABOUT</h1>
                <h1 className="content" style={{ color: "var(--darkash)" }}>
                  {about}
                </h1>
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
                  src="/assets/images/about_blob.svg"
                  alt="landing page"
                  className={classes.image}
                />
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
  }
};
export default AboutPage;
