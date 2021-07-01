import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FacebookIcon from "@material-ui/icons/Facebook";
import useStyles from "../../styles/footer";
import { useMediaQuery } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  const mobileViewBreakpoint = useMediaQuery("(min-width: 601px)");

  return (
    <footer
      className={
        mobileViewBreakpoint ? classes.footer : classes.footerMobileView
      }
    >
      <Container>
        <Grid
          item
          xs={10}
          style={{
            alignSelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <h1
              className="content"
              style={{
                color: "var(--white)",
              }}
            >
              © All rights reserved
            </h1>

            <h1
              className="content"
              style={{
                color: "var(--white)",
              }}
            >
              Terms
            </h1>

            <h1
              className="content"
              style={{
                color: "var(--white)",
              }}
            >
              Policy
            </h1>
          </div>
        </Grid>
        <Grid
          item
          xs
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Avatar className={classes.green}>
            <FacebookIcon />
          </Avatar>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
