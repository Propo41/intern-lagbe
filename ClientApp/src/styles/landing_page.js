import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  landingImage: {
    marginLeft: 50,
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginTop: 15,
    },
    width: "90%",
    height: "90%",
  },

  getStartedCard: {
    padding: 30,
    textAlign: "center",
    marginTop: "65px",
  },
  subscriptionCard: {
    padding: 30,
    textAlign: "center",
    marginTop: "30px",
  },

  buttonSmallPurple: {
    backgroundColor: "var(--purple)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
  },

  buttonSmallRed: {
    backgroundColor: "var(--red)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "var(--purple)",
  },
  chip: {
    fontFamily: "Sen",
    color: "var(--darkash)",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  filterContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: "1000",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "start",
    },
  },
  image: {
    justifyContent: "center",
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "60%",
      height: "60%",
    },
  },
}));

export default useStyles;
