import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "var(--content-margin-top)",
    flexWrap: "wrap",
    alignItems: "center",
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
    width: "80%",
    height: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(-80%)",
  },

  imagePlaceholder: {
    width: "50%",
    height: "50%",
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
  selectInput: {
    backgroundColor: "var(--white) !important",
    color: "var(--black) !important",
    boxShadow: "var(--card-shadow)",
    borderRadius: "10px !important",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "var(--font-size-sub-content) !important",
    fontFamily: "var(--font-family-sen)",
    padding: "0.4rem 0.6rem !important",
  },
}));

export default useStyles;
