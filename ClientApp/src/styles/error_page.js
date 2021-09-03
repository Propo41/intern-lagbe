import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    width: "70%",
    height: "70%",
    [theme.breakpoints.down("lg")]: {
      width: "90%",
      height: "90%",
    },
  },
  buttonPurple: {
    backgroundColor: "var(--purple)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
  title: {
    fontSize: "5rem",
  },
  description: {
    fontSize: "var(--font-size-title)",
    fontWeight: 200,
  },
}));

export default useStyles;
