import { makeStyles } from "@material-ui/styles";

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

  c: {
    borderRadius: 10,
  },
}));

export default useStyles;
