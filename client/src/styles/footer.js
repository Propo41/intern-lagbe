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
  copyrightContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      justifyContent: "center",
    },
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "grid",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      justifyContent: "center",
    },
  },
  socialContainer: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.between("xs", "sm")]: {
      justifyContent: "center",
    },
  },
  copyrightFont: {
    color: "var(--white)",
    fontSize: "var(--font-size-content)",
    fontWeight: 400,
  },
  linksFont: {
    color: "var(--white)",
    fontSize: "var(--font-size-content)",
    fontWeight: 700,
    [theme.breakpoints.between("sm", "xl")]: {
      marginRight: "4.5rem",
    },
    cursor: "pointer",
    "&:hover": {
      color: "var(--darkash)",
    },
  },
  socialButton: {
    color: "white",
    backgroundColor: "#FFB4C4",
    cursor: "pointer",
    marginLeft: "10px",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "var(--darkash)",
    },
  },
}));

export default useStyles;
