import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FacebookIcon from "@material-ui/icons/Facebook";
import useStyles from "../../styles/footer";
import { useMediaQuery } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 601px)");
  const copyrightBreakpoint = useMediaQuery("(max-width: 599px)");

  return (
    <footer
      className={
        mobileViewBreakpoint ? classes.footer : classes.footerMobileView
      }
    >
      <Grid
        container
        spacing={1}
        style={{ justifyContent: "center", padding: "0.5rem" }}
      >
        {/* Footer copyright */}
        {copyrightBreakpoint ? (
          ""
        ) : (
          <>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={2}
              className={classes.copyrightContainer}
            >
              <h1 className={classes.copyrightFont}>© All rights reserved</h1>
            </Grid>
          </>
        )}

        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          lg={4}
          className={classes.linksContainer}
        >
          <h1 className={classes.linksFont}>Terms</h1>
          <h1 className={classes.linksFont}>Policy</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          lg={6}
          className={classes.socialContainer}
        >
          <Avatar className={classes.socialButton}>
            <FacebookIcon />
          </Avatar>
        </Grid>
        {copyrightBreakpoint ? (
          <>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={2}
              className={classes.copyrightContainer}
            >
              <h1 className={classes.copyrightFont}>© All rights reserved</h1>
            </Grid>
          </>
        ) : (
          ""
        )}
      </Grid>
    </footer>
  );
};

export default Footer;
