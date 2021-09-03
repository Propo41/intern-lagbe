import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuItemSecondary: {
    backgroundColor: "#F5FAFF",
    color: "var(--black)",
    padding: "0.8rem",
    fontSize: "var(--font-size-navbar) !important",
  },
  menuItemPrimary: {
    padding: "0.8rem",
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
  logoutContainer: {
    justifyItems: "center",
    display: "grid",
    padding: "1rem 3rem",
  },
  userInfoText: {
    margin: 0,
    color: "var(--white)",
    fontFamily: "var(--font-family-poppins)",
    fontWeight: 200,
    fontSize: "var(--font-size-dialog-content)",
  },
  menuItemIcon: {
    marginRight: "5px",
    color: "var(--darkash)",
  },
}));

export default useStyles;
