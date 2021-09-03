import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  loadingAnimationContainer: {
    textAlign: "center",
    backgroundColor: "var(--purple)",
    height: "100vh",
  },
  loadingAnimationIcon: {
    width: "20%",
    height: "20%",
  },
}));

export default useStyles;
