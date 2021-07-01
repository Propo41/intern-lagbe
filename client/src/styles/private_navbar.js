import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: 50,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
    fontFamily: "Sen",
  },
  logoSize: {
    width: 60,
    height: 60,
    cursor: "pointer",
  },
  headerOptions: {
    display: "contents",
  },
  rightToolbar: {
    display: "flex",
    marginLeft: "auto",
  },
}));

export default useStyles;
