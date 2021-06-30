import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FacebookIcon from "@material-ui/icons/Facebook";
const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    footer: {
      padding: theme.spacing(0, 5),
      marginTop: "auto",
      backgroundColor: "var(--purple)",
    },
    green: {
      color: "white",
      backgroundColor: "#2E89FF",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "var(--darkash)",
      },
    },
  }));
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
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
