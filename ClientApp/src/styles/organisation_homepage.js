import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "var(--content-margin-top)",
    flexWrap: "wrap",
    alignItems: "center",
  },
  alertStyle: {
    fontFamily: "Sen",
    fontSize: "var(--font-size-content-small)",
    color: "var(--black)",
    fontWeight: "bold",
    padding: 10,
    paddingLeft: "var(--content-margin-start)",
    paddingRight: "var(--content-margin-end)",
  },
  alertMessage: {
    margin: 10,
    paddingLeft: 10,
  },

  alertButton: {
    fontFamily: "Sen",
    fontSize: "var(--font-size-content-small)",
    color: "var(--purple)",
    fontWeight: "bold",
    margin: 10,
  },

  alertIcon: {
    margin: 10,
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
    width: "70%",
    height: "70%",
    position: "relative",
    top: "50%",
    transform: "translateY(-85%)",
  },

  imagePlaceholder: {
    width: "40%",
    height: "40%",
    [theme.breakpoints.up("md")]: {
      width: "20%",
      height: "20%",
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

  buttonRed: {
    backgroundColor: "var(--red)",
    color: "white",
    fontFamily: "Sen",
    marginTop: 10,
    padding: "var(--button-padding)",
    fontSize: "var(--font-size-button-small)",
  },
}));

export default useStyles;
