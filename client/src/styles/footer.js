import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(0, 5),
    backgroundColor: "var(--purple)",
    marginTop: "calc(24% - 60px)",
    bottom: 0,
  },
  footerMobileView: {
    padding: theme.spacing(0, 5),
    backgroundColor: "var(--purple)",
    marginTop: "calc(30% - 0px)",
    bottom: 0,
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

export default useStyles;
