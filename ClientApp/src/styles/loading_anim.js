import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  loadingAnimationContainer: {
    textAlign: "center",
    backgroundColor: "var(--purple)",
    height: "100vh",
    position: "absolute",
    width: "-webkit-fill-available",
    zIndex: 1,
  },
  loadingAnimationIcon: {
    width: "20%",
    height: "20%",
  },
}));

export default useStyles;
